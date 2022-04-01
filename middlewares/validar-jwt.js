import { authUserWithToken } from '../models/user.js';
import { response, request } from 'express';
import config from '../config.js';
import jwt from 'jsonwebtoken'

export const validarJWT = async ( req = response, res = request, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).send({
            ok: false,
            errors: [
                'No hay token en la peticion'
            ]
        })
    }


    try {

        const { userCode } = jwt.verify( token, config.secretprivatekey );

        req.usuario = (await authUserWithToken( userCode ))[0];

        if (!req.usuario) {
            return res.status(401).send({
                ok: false,
                errors: [
                    'Token no válido'
                ]
            })
        }

        req.uid = userCode;

        next();
        
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        });
        
    }

}
