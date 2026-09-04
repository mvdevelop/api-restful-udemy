import { Request, Response, NextFunction } from 'express';

import User from '../models/User.js';
import AppError from '../utils/AppError.js';

const UserModel = User as any;

class UserController {
  async store(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const novoUser = await UserModel.create(req.body);
      const { id, nome, email } = novoUser;

      res.status(201).json({ id, nome, email });
    } catch (err) {
      next(err);
    }
  }

  async index(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const users = await UserModel.findAll({ attributes: ['id', 'nome', 'email'] });
      res.json(users);
    } catch (err) {
      next(err);
    }
  }

  async show(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await UserModel.findByPk(req.params.id);

      if (!user) {
        throw new AppError('Usuário não encontrado!', 404);
      }

      const { id, nome, email } = user;

      res.json({ id, nome, email });
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await UserModel.findByPk(req.userId);

      if (!user) {
        throw new AppError('Usuário não encontrado!', 404);
      }

      const novosDados = await user.update(req.body);
      const { id, nome, email } = novosDados;

      res.json({ id, nome, email });
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await UserModel.findByPk(req.userId);

      if (!user) {
        throw new AppError('Usuário não encontrado!', 404);
      }

      await user.destroy();

      res.json({ message: `Usuário ${user.email} deletado!` });
    } catch (err) {
      next(err);
    }
  }
}

export default new UserController();