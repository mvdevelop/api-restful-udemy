import { Router } from 'express';

import userController from '../controllers/UserController.js';
import loginRequired from '../middlewares/loginRequired.js';
import validate from '../middlewares/validate.js';
import { userCreateSchema, userUpdateSchema } from '../validators/userValidators.js';

const router = Router();

router.post('/', validate({ body: userCreateSchema }), userController.store);
router.put('/', loginRequired, validate({ body: userUpdateSchema }), userController.update);
router.delete('/', loginRequired, userController.delete);

export default router;