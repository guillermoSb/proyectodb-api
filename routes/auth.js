// Library Imports
import { Router } from 'express';
import { check } from 'express-validator';
// Project Imports
import { registerUser, loginUser } from '../controllers/auth.js';
import { validateFields } from '../middlewares/request-validator.js';
import { validateEmailUnique, validateUserUnique } from '../utils/custom-validators.js';

const router = Router();    // Create the router

router.post('/register', [
    check('email', 'El correo no es valido.').isEmail(),
    check('user', 'El nombre de usuario es requerido.').notEmpty(),
    check('role', 'El role es requerido.').isIn(['user', 'admin']),
    check('password', 'La contraseña es requerida.').notEmpty(),
    check('password', 'La contraseña debe de tener al menos 6 caracteres.').isLength({ min: 6 }),
    check('plan', 'El plan es requerido.').notEmpty(),
    check('plan', 'Las opciones válidas para un plan son: basic, standard o advanced').isIn(['basic', 'standard', 'advanced']),
    check('email').custom(validateEmailUnique),
    check('user').custom(validateUserUnique),
    validateFields
], registerUser);  // Retreive a list of all users
router.post('/login', [
    check('email', 'El correo no es valido').isEmail(),
    check('password', 'La contraseña es requerida.').notEmpty(),
    validateFields
], loginUser)    // Create an user

export default router;