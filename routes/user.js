// Library Imports
import { Router } from 'express';
// Project Imports
import { postUser, getUsers, getProfilesByUserId, postProfileByUserId, getUserById, lockProfile, unlockProfile, toggleActivateProfile, downgrade, deleteUserByCode, updateUserByCode } from '../controllers/user.js';
import { check, param } from 'express-validator';
import { validateFields } from '../middlewares/request-validator.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { validateEmailUnique, validateUserUnique, validateUserExists, validateMaxProfiles } from '../utils/custom-validators.js';

const router = Router();    // Create the router

router.get('/'/*, [validarJWT]*/, getUsers);  // Retreive a list of all users
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
        check('role', 'El rol del usuario es necesario.').notEmpty().isIn(['user', 'advertiser', 'admin']),
        check('email').custom(validateEmailUnique),
        check('user').custom(validateUserUnique),
        validateFields
    ],
    postUser
);    // Create an user

router.get('/:userCode', [
    param('userCode', 'El userCode debe ser un numero').isNumeric(),
    param('userCode').custom(validateUserExists),
    validateFields,
    // validarJWT
], getUserById)
router.get(
    '/:userCode/profiles', [validarJWT], [
    param('userCode', 'El userCode debe ser un numero').isNumeric(),
    param('userCode').custom(validateUserExists),
    validateFields
],
    getProfilesByUserId)    // Get user profiles

router.post(
    '/:userCode/profiles', [validarJWT], [
    param('userCode', 'El userCode debe ser un numero').isNumeric(),
    param('userCode').custom(validateUserExists),
    param('userCode').custom(validateMaxProfiles),
    check('name', 'El nombre del perfil es necesario').notEmpty(),
    validateFields
],
    postProfileByUserId
);

router.get(
    '/lock/:profileCode', [
    validarJWT,
    check('profileCode', 'El profileCode es requerido').isNumeric(),
    validateFields
],
    lockProfile
);


router.get(
    '/unlock/:profileCode', [
    validarJWT,
    check('profileCode', 'El profileCode es requerido').isNumeric(),
    validateFields
],
    unlockProfile
);

router.post(
    '/toggle/activation/:profileCode', [
    validarJWT,
    check('profileCode', 'El profileCode es requerido').isNumeric(),
    validateFields
],
    toggleActivateProfile
);


router.post(
    '/downgrade/:userCode', [
    check('userCode', 'El userCode es requerido').isNumeric(),
    validateFields
],
    downgrade
);


router.delete(
    '/:userCode',
    [
        param('userCode', 'El userCode debe ser un numero').isNumeric(),
        param('userCode').custom(validateUserExists),
    ],
    deleteUserByCode
);

router.get(
    '/:userCode/',
    [
        param('userCode', 'El userCode debe ser un numero').isNumeric(),
        param('userCode').custom(validateUserExists),
    ],
    deleteUserByCode
);

router.post(
    '/:userCode',
    [
        check('email', 'El correo no es valido').isEmail(),
        check('user', 'El nombre de usuario es requerido').notEmpty(),
        check('plan', 'El plan es requerido.').notEmpty(),
        check('plan', 'Las opciones válidas para un plan son: basic, standard o advanced').isIn(['basic', 'standard', 'advanced']),
        check('email').notEmpty(),
        check('role').notEmpty(),
        check('user').notEmpty(),
        param('userCode', 'El userCode debe ser un numero').isNumeric(),
        param('userCode').custom(validateUserExists),
        validateFields
    ],
    updateUserByCode

)

export default router;