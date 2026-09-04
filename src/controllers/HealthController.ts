import { Request, Response } from 'express';

import sequelize from '../database/index.js';

interface HealthResponse {
  uptime: number;
  message: string;
  timestamp: number;
  environment: string;
  status: string;
  checks: {
    database: string;
  };
}

class HealthController {
  async index(_req: Request, res: Response): Promise<void> {
    const healthcheck: HealthResponse = {
      uptime: process.uptime(),
      message: 'OK',
      timestamp: Date.now(),
      environment: process.env.NODE_ENV || 'development',
      status: 'healthy',
      checks: {
        database: 'unknown',
      },
    };

    try {
      await sequelize.authenticate();
      healthcheck.checks.database = 'connected';
      res.json(healthcheck);
    } catch {
      healthcheck.status = 'unhealthy';
      healthcheck.checks.database = 'disconnected';
      healthcheck.message = 'Database connection failed';
      res.status(503).json(healthcheck);
    }
  }
}

export default new HealthController();