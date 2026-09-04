import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import User from '../models/User.js';

interface TokenPayload {
  id: number;
  email: string;
  iat: number;
  exp: number;
}

export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).json({
      errors: ['Login required!'],
    });
    return;
  }

  const [token] = authorization.split(' ');

  try {
    const dados = jwt.verify(token, process.env.TOKEN_SECRET || '') as TokenPayload;
    const { id, email } = dados;

    const user = await User.findOne({
      where: { id, email },
    });

    if (!user) {
      res.status(401).json({
        errors: ['Usuário inválido!'],
      });
      return;
    }

    req.userId = id;
    req.userEmail = email;
    next();
  } catch {
    res.status(401).json({
      errors: ['Token expirado ou inválido!'],
    });
  }
};