// Library Imports
import { Router } from 'express';
// Project Imports
import { postUser, getUsers, getProfilesByUserId, postProfileByUserId } from '../controllers/user.js';
import { check, param } from 'express-validator';
import { validateFields } from '../middlewares/request-validator.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { validateEmailUnique, validateUserUnique, validateUserExists, validateMaxProfiles } from '../utils/custom-validators.js';

const router = Router();    // Create the router

router.get('/', [validarJWT],getUsers);  // Retreive a list of all users
router.post(
    '/',
    [
        check('email', 'El correo no es valido').isEmail(),
        check('user', 'El nombre de usuario es requerido').notEmpty(),
        check('password', 'el nombre de usuario debe de tener al menos 6 caracteres.').isLength({ min: 6 }),
        check('password', 'La contraseña es requerida.').notEmpty(),
        check('password', 'La contraseña debe de tener al menos 6 caracteres.').isLength({ min: 6 }),
        check('plan', 'El plan es requerido.').notEmpty(),
        check('plan', 'Las opciones válidas para un plan son: basic, standard o advanced').isIn(['basic', 'standard', 'advanced']),
        check('email').custom(validateEmailUnique),
        check('user').custom(validateUserUnique),
        validateFields
    ],
    postUser
);    // Create an user
router.get(
    '/:userCode/profiles', [
    param('userCode', 'El userCode debe ser un numero').isNumeric(),
    param('userCode').custom(validateUserExists),
    validateFields
],
    getProfilesByUserId)    // Get user profiles

router.post(
    '/:userCode/profiles', [
    param('userCode', 'El userCode debe ser un numero').isNumeric(),
    param('userCode').custom(validateUserExists),
    param('userCode').custom(validateMaxProfiles),
    check('name', 'El nombre del perfil es necesario').notEmpty(),
    validateFields
],
    postProfileByUserId
)



export default router;