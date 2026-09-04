import 'dotenv/config';
import { resolve } from 'path';

import './database/index.js';

import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';

import homeRoutes from './routes/homeRoutes.js';
import userRoutes from './routes/userRoutes.js';
import tokenRoutes from './routes/tokenRoutes.js';
import alunoRoutes from './routes/alunoRoutes.js';
import fotoRoutes from './routes/fotoRoutes.js';
import docsController from './controllers/DocsController.js';

import requestLogger from './middlewares/requestLogger.js';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler.js';

const whiteList = [
  'http://react02.192.168.1.6',
  'http://localhost:3000',
  'http://localhost:3001',
  'http://192.168.1.6:3001',
];

const corsOptions: cors.CorsOptions = {
  origin(origin, callback) {
    if (whiteList.indexOf(origin || '') !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
    this.errorHandlers();
  }

  private middlewares(): void {
    this.app.use(cors(corsOptions));
    this.app.use(helmet());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(requestLogger);
    this.app.use('/images/', express.static(resolve(__dirname, '..', 'uploads', 'images')));
  }

  private routes(): void {
    this.app.use('/', homeRoutes);
    this.app.use('/users/', userRoutes);
    this.app.use('/tokens/', tokenRoutes);
    this.app.use('/alunos/', alunoRoutes);
    this.app.use('/fotos/', fotoRoutes);
    docsController.setup(this.app);
  }

  private errorHandlers(): void {
    this.app.use(notFoundHandler);
    this.app.use(errorHandler);
  }
}

export default new App().app;