import User from '../models/User';
import AppError from '../utils/AppError';

class UserController {
  async store(req, res, next) {
    try {
      const novoUser = await User.create(req.body);
      const { id, nome, email } = novoUser;

      return res.status(201).json({ id, nome, email });
    } catch (err) {
      return next(err);
    }
  }

  async index(req, res, next) {
    try {
      const users = await User.findAll({ attributes: ['id', 'nome', 'email'] });
      return res.json(users);
    } catch (err) {
      return next(err);
    }
  }

  async show(req, res, next) {
    try {
      const user = await User.findByPk(req.params.id);

      if (!user) {
        throw new AppError('Usuário não encontrado!', 404);
      }

      const { id, nome, email } = user;

      return res.json({ id, nome, email });
    } catch (err) {
      return next(err);
    }
  }

  async update(req, res, next) {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        throw new AppError('Usuário não encontrado!', 404);
      }

      const novosDados = await user.update(req.body);
      const { id, nome, email } = novosDados;

      return res.json({ id, nome, email });
    } catch (err) {
      return next(err);
    }
  }

  async delete(req, res, next) {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        throw new AppError('Usuário não encontrado!', 404);
      }

      await user.destroy();

      return res.json({ message: `Usuário ${user.email} deletado!` });
    } catch (err) {
      return next(err);
    }
  }
}

export default new UserController();