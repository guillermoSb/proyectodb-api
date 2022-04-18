
import jwt from 'jsonwebtoken'

export const generarJWT = (userCode = '', role = '') => {

    return new Promise((resolve, reject) => {

        const payload = { userCode, role }


        jwt.sign(payload, process.env.SECRETORPRIVATEKEY,
            (err, token) => {

                if (err) {
                    console.log(err);
                    reject('no se pudo generar el token');
                } else {
                    resolve(token);
                }

            }
        )

    })

}