import { Router } from 'express';

import alunoController from '../controllers/AlunoController';
import loginRequired from '../middlewares/loginRequired';
import validate from '../middlewares/validate';
import { alunoCreateSchema, alunoUpdateSchema, idParamSchema } from '../validators/alunoValidators';

const router = new Router();

router.get('/', alunoController.index);
router.post('/', loginRequired, validate({ body: alunoCreateSchema }), alunoController.store);
router.put('/:id', loginRequired, validate({ params: idParamSchema, body: alunoUpdateSchema }), alunoController.update);
router.get('/:id', validate({ params: idParamSchema }), alunoController.show);
router.delete('/:id', loginRequired, validate({ params: idParamSchema }), alunoController.delete);

export default router;