import { Router } from 'express';

import loginRequired from '../middlewares/loginRequired.js';
import fotoController from '../controllers/FotoController.js';

const router = Router();

router.post('/', loginRequired, fotoController.store);

export default router;