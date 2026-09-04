import { Router } from 'express';

import tokenController from '../controllers/TokenController';
import validate from '../middlewares/validate';
import { tokenCreateSchema } from '../validators/tokenValidators';

const router = new Router();

router.post('/', validate({ body: tokenCreateSchema }), tokenController.store);

export default router;