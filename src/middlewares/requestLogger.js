import logger from '../config/logger';

/**
 * Middleware de logging de requisições HTTP.
 * Loga método, URL, status, tempo de resposta e IP.
 */
const requestLogger = (req, res, next) => {
  const startTime = Date.now();
  const { method, originalUrl, ip } = req;

  // Quando a resposta terminar, registra o log
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