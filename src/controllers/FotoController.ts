import { Request, Response } from 'express';
import multer from 'multer';

import multerConfig from '../config/multerConfig.js';
import Foto from '../models/Foto.js';

const upload = multer(multerConfig).single('foto');
const FotoModel = Foto as any;

class FotoController {
  store(req: Request, res: Response): void {
    upload(req, res, async (error) => {
      if (error) {
        res.status(400).json({
          errors: [(error as any).code || 'Erro no upload do arquivo!'],
        });
        return;
      }

      try {
        if (!req.file) {
          res.status(400).json({
            errors: ['Nenhum arquivo enviado!'],
          });
          return;
        }

        const { originalname, filename } = req.file;
        const { aluno_id } = req.body;
        const foto = await FotoModel.create({
          originalname,
          filename,
          aluno_id: Number(aluno_id),
        });

        res.json(foto);
      } catch {
        res.status(400).json({
          errors: ['Aluno não existe.'],
        });
      }
    });
  }
}

export default new FotoController();