import Aluno from '../models/Aluno';
import Foto from '../models/Foto';
import AppError from '../utils/AppError';

class AlunoController {
  async index(req, res, next) {
    try {
      const alunos = await Aluno.findAll({
        attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
        order: [['id', 'DESC'], [Foto, 'id', 'DESC']],
        include: {
          model: Foto,
          attributes: ['url', 'filename'],
        },
      });
      return res.json(alunos);
    } catch (err) {
      return next(err);
    }
  }

  async store(req, res, next) {
    try {
      const aluno = await Aluno.create(req.body);
      return res.status(201).json({ message: 'Aluno criado com sucesso!', data: aluno });
    } catch (err) {
      return next(err);
    }
  }

  async show(req, res, next) {
    try {
      const { id } = req.params;

      const aluno = await Aluno.findByPk(id, {
        attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
        order: [['id', 'DESC'], [Foto, 'id', 'DESC']],
        include: {
          model: Foto,
          attributes: ['filename'],
        },
      });

      if (!aluno) {
        throw new AppError('Aluno não encontrado!', 404);
      }

      return res.json(aluno);
    } catch (err) {
      return next(err);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;

      const aluno = await Aluno.findByPk(id);

      if (!aluno) {
        throw new AppError('Aluno não encontrado!', 404);
      }

      await aluno.destroy();
      return res.json({ message: 'Aluno deletado com sucesso!', apagado: true });
    } catch (err) {
      return next(err);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;

      const aluno = await Aluno.findByPk(id);

      if (!aluno) {
        throw new AppError('Aluno não encontrado!', 404);
      }

      const alunoAtualizado = await aluno.update(req.body);

      return res.json(alunoAtualizado);
    } catch (err) {
      return next(err);
    }
  }
}

export default new AlunoController();