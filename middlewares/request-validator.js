import { validationResult } from 'express-validator';


/**
 * Middleware that validates fields
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
export const validateFields = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.array({ onlyFirstError: false }).flatMap(err => err.msg) ?? []
        })
    }
    next();
}