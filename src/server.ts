import app from './app.js';
import logger from './config/logger.js';

const PORT = Number(process.env.APP_PORT) || 3001;

app.listen(PORT, () => {
  logger.info(`🚀 Server is running on port ${PORT}`);
  logger.info(`📚 Environment: ${process.env.NODE_ENV || 'development'}`);
  logger.info(`🔗 URL: http://localhost:${PORT}`);
  logger.info(`📖 Docs: http://localhost:${PORT}/api-docs`);
});