import { Router } from 'express';

import tokenController from '../controllers/TokenController.js';
import validate from '../middlewares/validate.js';
import { tokenCreateSchema } from '../validators/tokenValidators.js';

const router = Router();

router.post('/', validate({ body: tokenCreateSchema }), tokenController.store);

export default router;