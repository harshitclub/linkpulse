import { Router } from 'express';
import { handleRedirect } from '../controllers/redirect.controller.js';

const router = Router();

// GET /:code - Redirect to the original URL
router.get('/:code', handleRedirect);

export default router;
