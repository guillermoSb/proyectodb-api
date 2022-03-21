// Library Imports
import { Router } from 'express';
// Project Imports
import { postUser, getUsers } from '../controllers/user.js';
import { check } from 'express-validator';
import { validateFields } from '../middlewares/request-validator.js';
import { validateEmailUnique, validateUserUnique } from '../utils/custom-validators.js';

const router = Router();    // Create the router

router.get('/', getUsers);  // Retreive a list of all users
router.post(
    '/',
    [
        check('email', 'El correo no es valido').isEmail(),
        check('user', 'El nombre de usuario es requerido').notEmpty(),
        check('password', 'el nombre de usuario debe de tener al menos 6 caracteres.').isLength({ min: 6 }),
        check('password', 'La contraseña es requerida.').notEmpty(),
        check('password', 'La contraseña debe de tener al menos 6 caracteres.').isLength({ min: 6 }),
        check('email').custom(validateEmailUnique),
        check('user').custom(validateUserUnique),
        validateFields
    ],
    postUser
)    // Create an user

export default router;