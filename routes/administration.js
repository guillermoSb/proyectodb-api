import { Router } from 'express';
import { check } from 'express-validator';
import { changeadmin, failedLog } from '../controllers/administration.js';
import { validateFields } from '../middlewares/request-validator.js';

const router = Router();

router.post('/failed/log',
[
    check('email', 'El correo no es valido').notEmpty(),
    check('password', 'La contraseña es requerida.').notEmpty(),
    validateFields
]
,failedLog);

router.post('/modify/current/admin',
[
    check('adminId', 'El correo no es valido').notEmpty(),
    validateFields
]
,changeadmin);

export default router;