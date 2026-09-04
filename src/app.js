import 'dotenv/config';
import { resolve } from 'path';

import './database';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import homeRoutes from './routes/homeRoutes';
import userRoutes from './routes/userRoutes';
import tokenRoutes from './routes/tokenRoutes';
import alunoRoutes from './routes/alunoRoutes';
import fotoRoutes from './routes/fotoRoutes';
import docsController from './controllers/DocsController';

import requestLogger from './middlewares/requestLogger';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler';

const whiteList = [
  'http://react02.192.168.1.6',
  'http://localhost:3000',
  'http://localhost:3001',
  'http://192.168.1.6:3001',
];

const corsOptions = {
  origin(origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
    this.errorHandlers();
  }

  middlewares() {
    this.app.use(cors(corsOptions));
    this.app.use(helmet());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(requestLogger);
    this.app.use('/images/', express.static(resolve(__dirname, '..', 'uploads', 'images')));
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/users/', userRoutes);
    this.app.use('/tokens/', tokenRoutes);
    this.app.use('/alunos/', alunoRoutes);
    this.app.use('/fotos/', fotoRoutes);
  }

  errorHandlers() {
    // Handler para rotas não encontradas (404)
    this.app.use(notFoundHandler);
    // Handler global de erros (deve ser o último)
    this.app.use(errorHandler);
  }
}

export default new App().app;