import { Request, Response, NextFunction } from 'express';

import logger from '../config/logger.js';

const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
  const startTime = Date.now();
  const { method, originalUrl, ip } = req;

  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const { statusCode } = res;
    const logData = {
      method,
      url: originalUrl,
      status: statusCode,
      duration: `${duration}ms`,
      ip,
      userAgent: req.get('user-agent') || 'unknown',
    };

    if (statusCode >= 500) {
      logger.error(logData, 'Request completed with error');
    } else if (statusCode >= 400) {
      logger.warn(logData, 'Request failed');
    } else {
      logger.info(logData, 'Request completed');
    }
  });

  next();
};

export default requestLogger;