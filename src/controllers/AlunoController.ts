import { Request, Response, NextFunction } from 'express';

import Aluno from '../models/Aluno.js';
import Foto from '../models/Foto.js';
import AppError from '../utils/AppError.js';

const AlunoModel = Aluno as any;
const FotoModel = Foto as any;

class AlunoController {
  async index(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const alunos = await AlunoModel.findAll({
        attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
        order: [['id', 'DESC'], [Foto, 'id', 'DESC']],
        include: {
          model: Foto,
          attributes: ['url', 'filename'],
        },
      });
      res.json(alunos);
    } catch (err) {
      next(err);
    }
  }

  async store(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const aluno = await AlunoModel.create(req.body);
      res.status(201).json({ message: 'Aluno criado com sucesso!', data: aluno });
    } catch (err) {
      next(err);
    }
  }

  async show(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      const aluno = await AlunoModel.findByPk(id, {
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

      res.json(aluno);
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      const aluno = await AlunoModel.findByPk(id);

      if (!aluno) {
        throw new AppError('Aluno não encontrado!', 404);
      }

      await aluno.destroy();
      res.json({ message: 'Aluno deletado com sucesso!', apagado: true });
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      const aluno = await AlunoModel.findByPk(id);

      if (!aluno) {
        throw new AppError('Aluno não encontrado!', 404);
      }

      const alunoAtualizado = await aluno.update(req.body);

      res.json(alunoAtualizado);
    } catch (err) {
      next(err);
    }
  }
}

export default new AlunoController();