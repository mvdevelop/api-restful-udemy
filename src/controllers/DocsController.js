import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../config/swagger';

class DocsController {
  setup(app) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  }
}

export default new DocsController();