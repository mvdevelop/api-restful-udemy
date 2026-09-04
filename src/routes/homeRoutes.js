import { Router } from 'express';

import healthController from '../controllers/HealthController';

const router = new Router();

router.get('/health', healthController.index);
router.get('/', (req, res) => {
  res.json({
    message: 'API RESTful - Node.js',
    version: '1.0.0',
    documentation: '/api-docs',
  });
});

export default router;