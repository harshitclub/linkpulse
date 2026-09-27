import { Router } from 'express';
import {
  createLink,
  getAllLinks,
  getLinkAnalytics,
  deleteLink,
} from '../controllers/link.controller.js';

const router = Router();

// POST /api/links - Create a short link
router.post('/', createLink);

// GET /api/links - Get all links
router.get('/', getAllLinks);

// GET /api/links/:id/analytics - Get analytics for a single link
router.get('/:id/analytics', getLinkAnalytics);

// DELETE /api/links/:id - Delete a link
router.delete('/:id', deleteLink);

export default router;
