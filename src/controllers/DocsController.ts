import { Application } from 'express';
import swaggerUi from 'swagger-ui-express';

import swaggerSpec from '../config/swagger.js';

class DocsController {
  setup(app: Application): void {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  }
}

export default new DocsController();