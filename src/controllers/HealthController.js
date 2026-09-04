import sequelize from '../database/index.js';

class HealthController {
  /**
   * GET /health
   * Verifica saúde da aplicação e conectividade com o banco de dados.
   */
  async index(req, res) {
    const healthcheck = {
      uptime: process.uptime(),
      message: 'OK',
      timestamp: Date.now(),
      environment: process.env.NODE_ENV || 'development',
      checks: {
        database: 'unknown',
      },
    };

    try {
      // Testa conexão com o banco
      await sequelize.authenticate();
      healthcheck.checks.database = 'connected';
      healthcheck.status = 'healthy';

      return res.json(healthcheck);
    } catch {
      healthcheck.status = 'unhealthy';
      healthcheck.checks.database = 'disconnected';
      healthcheck.message = 'Database connection failed';

      return res.status(503).json(healthcheck);
    }
  }
}

export default new HealthController();