import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import User from '../models/User.js';
import AppError from '../utils/AppError.js';

class TokenController {
  async store(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });

      if (!user) {
        throw new AppError('Usuário não encontrado!', 404);
      }

      const isValidPassword = await (user as any).passwordIsValid(password);

      if (!isValidPassword) {
        throw new AppError('Senha inválida!', 401);
      }

      const { id } = user;
      const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET || '', {
        expiresIn: process.env.TOKEN_EXPIRATION || '7d',
      } as jwt.SignOptions);

      res.json({
        token,
        user: { nome: user.nome, id, email },
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new TokenController();