import { nanoid } from 'nanoid';
import { Link, Click } from '../models/index.js';
import { redis } from '../config/redis.js';
import { createLinkSchema } from '../schemas/link.schema.js';

// 1. Create a new short link
export const createLink = async (req, res) => {
  try {
    // Step A: Validate user input with Zod
    const validation = createLinkSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        message: validation.error.errors[0].message,
      });
    }

    const { url, customCode, title } = validation.data;

    // Step B: Determine short code (use custom code or generate random 6-character code)
    let shortCode = customCode;
    if (shortCode) {
      const existing = await Link.findOne({ where: { shortCode } });
      if (existing) {
        return res.status(400).json({ message: 'This custom code is already taken.' });
      }
    } else {
      shortCode = nanoid(6);
    }

    // Step C: Save link to PostgreSQL database
    const newLink = await Link.create({
      originalUrl: url,
      shortCode,
      title: title || '',
    });

    // Step D: Cache in Redis for 1 hour (3600 seconds) for fast redirects
    await redis.set(`url:${shortCode}`, newLink.originalUrl, 'EX', 3600);
    await redis.set(`id:${shortCode}`, newLink.id, 'EX', 3600);

    return res.status(201).json(newLink);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// 2. Get all links with total click count
export const getAllLinks = async (req, res) => {
  try {
    const links = await Link.findAll({
      include: [{ model: Click, as: 'clicks' }],
      order: [['createdAt', 'DESC']],
    });

    // Format simple response with total clicks count
    const formattedLinks = links.map((link) => ({
      id: link.id,
      originalUrl: link.originalUrl,
      shortCode: link.shortCode,
      title: link.title,
      totalClicks: link.clicks ? link.clicks.length : 0,
      createdAt: link.createdAt,
    }));

    return res.json(formattedLinks);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// 3. Get detailed analytics for a specific link
export const getLinkAnalytics = async (req, res) => {
  try {
    const link = await Link.findByPk(req.params.id, {
      include: [{ model: Click, as: 'clicks' }],
    });

    if (!link) {
      return res.status(404).json({ message: 'Link not found' });
    }

    return res.json({
      link: {
        id: link.id,
        originalUrl: link.originalUrl,
        shortCode: link.shortCode,
        title: link.title,
        createdAt: link.createdAt,
      },
      totalClicks: link.clicks.length,
      clicks: link.clicks,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// 4. Delete a link and remove it from Redis cache
export const deleteLink = async (req, res) => {
  try {
    const link = await Link.findByPk(req.params.id);

    if (!link) {
      return res.status(404).json({ message: 'Link not found' });
    }

    // Remove from Redis cache
    await redis.del(`url:${link.shortCode}`);
    await redis.del(`id:${link.shortCode}`);

    // Delete from PostgreSQL (clicks will be deleted automatically)
    await link.destroy();

    return res.json({ message: 'Link deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
