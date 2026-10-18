import { Router } from 'express';
import { getHealth } from '../controllers/healthController.js';
import { createContact } from '../controllers/contactController.js';
import { downloadResume } from '../controllers/resumeController.js';
import { contactLimiter } from '../middleware/rateLimiters.js';

const router = Router();

router.get('/health', getHealth);
router.post('/contact', contactLimiter, createContact);
router.get('/resume/:format', downloadResume);

export default router;
