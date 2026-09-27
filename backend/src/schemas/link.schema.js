import { z } from 'zod';

// Simple validation rules for creating a short link
export const createLinkSchema = z.object({
  url: z.string().url('Please enter a valid URL (starting with http:// or https://)'),
  customCode: z.string().min(3, 'Custom code must be at least 3 characters').optional().or(z.literal('')),
  title: z.string().optional().or(z.literal('')),
});
