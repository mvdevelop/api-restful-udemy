import { Router } from 'express';

import alunoController from '../controllers/AlunoController.js';
import loginRequired from '../middlewares/loginRequired.js';
import validate from '../middlewares/validate.js';
import { alunoCreateSchema, alunoUpdateSchema, idParamSchema } from '../validators/alunoValidators.js';

const router = Router();

router.get('/', alunoController.index);
router.post('/', loginRequired, validate({ body: alunoCreateSchema }), alunoController.store);
router.put(
  '/:id',
  loginRequired,
  validate({ params: idParamSchema, body: alunoUpdateSchema }),
  alunoController.update,
);
router.get('/:id', validate({ params: idParamSchema }), alunoController.show);
router.delete('/:id', loginRequired, validate({ params: idParamSchema }), alunoController.delete);

export default router;