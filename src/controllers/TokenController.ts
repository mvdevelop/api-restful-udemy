import { Request, Response, NextFunction } from 'express';
import jwt, { SignOptions } from 'jsonwebtoken';

import User from '../models/User.js';
import AppError from '../utils/AppError.js';

const UserModel = User as any;

class TokenController {
  async store(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;

      const user = await UserModel.findOne({ where: { email } });

      if (!user) {
        throw new AppError('Usuário não encontrado!', 404);
      }

      const isValidPassword = await user.passwordIsValid(password);

      if (!isValidPassword) {
        throw new AppError('Senha inválida!', 401);
      }

      const { id } = user;
      const secret = process.env.TOKEN_SECRET || 'default-secret';
      const options: SignOptions = {
        expiresIn: (process.env.TOKEN_EXPIRATION as any) || '7d',
      };

      const token = jwt.sign({ id, email }, secret, options);

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