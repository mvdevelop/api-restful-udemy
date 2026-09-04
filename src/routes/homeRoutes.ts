import { Router, Request, Response } from 'express';

import healthController from '../controllers/HealthController.js';

const router = Router();

router.get('/health', (req: Request, res: Response, next) => {
  healthController.index(req, res).catch(next);
});
router.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'API RESTful - Node.js',
    version: '1.0.0',
    documentation: '/api-docs',
  });
});

export default router;