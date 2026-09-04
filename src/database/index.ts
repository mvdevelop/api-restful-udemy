import { Sequelize } from 'sequelize';

import databaseConfig from '../config/database.js';
import Aluno from '../models/Aluno.js';
import User from '../models/User.js';
import Foto from '../models/Foto.js';

const models: any[] = [Aluno, User, Foto];

const connection: any = new Sequelize(databaseConfig as any);

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));

export default connection;