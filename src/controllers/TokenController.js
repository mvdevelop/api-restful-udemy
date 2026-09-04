import jwt from 'jsonwebtoken';

import User from '../models/User';
import AppError from '../utils/AppError';

class TokenController {
  async store(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });

      if (!user) {
        throw new AppError('Usuário não encontrado!', 404);
      }

      const isValidPassword = await user.passwordIsValid(password);

      if (!isValidPassword) {
        throw new AppError('Senha inválida!', 401);
      }

      const { id } = user;
      const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRATION,
      });

      return res.json({
        token,
        user: { nome: user.nome, id, email },
      });
    } catch (err) {
      return next(err);
    }
  }
}

export default new TokenController();