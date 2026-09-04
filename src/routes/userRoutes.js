import { Router } from 'express';

import userController from '../controllers/UserController';
import loginRequired from '../middlewares/loginRequired';
import validate from '../middlewares/validate';
import { userCreateSchema, userUpdateSchema } from '../validators/userValidators';

const router = new Router();

router.post('/', validate({ body: userCreateSchema }), userController.store);
router.put('/', loginRequired, validate({ body: userUpdateSchema }), userController.update);
router.delete('/', loginRequired, userController.delete);

export default router;