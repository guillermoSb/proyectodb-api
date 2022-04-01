import { authUserWithToken } from '../models/user.js';
import { response, request } from 'express';
import jwt from 'jsonwebtoken'

export const validarJWT = async (req = response, res = request, next) => {

    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }


    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        req.usuario = (await authUserWithToken(uid))[0];

        if (!req.usuario) {
            return res.status(401).send({
                ok: false,
                errors: [
                    'Token no válido'
                ]
            })
        }

        req.uid = uid;

        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        });

    }

}
