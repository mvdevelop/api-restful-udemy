import multer from 'multer';
import { extname, resolve } from 'path';

const aleatorio = (): number => Math.floor(Math.random() * 10000 + 10000);

export default {
  fileFilter: (
    _req: any,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback,
  ) => {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
      cb(new Error('Arquivo precisa ser .png ou .jpeg!'));
      return;
    }
    cb(null, true);
  },
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => {
      cb(null, resolve(__dirname, '..', '..', 'uploads', 'images'));
    },
    filename: (_req, file, cb) => {
      cb(null, `${Date.now()}_${aleatorio()}${extname(file.originalname)}`);
    },
  }),
};