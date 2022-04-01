
import jwt from 'jsonwebtoken'

export const generarJWT = ( userCode = '') => {

    return new Promise( (resolve, reject) => {

        const payload = { userCode }


        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '1d'
        }, 
            ( err, token ) => {

                if (err) {
                    console.log(err);
                    reject('no se pudo generar el token');
                } else {
                    resolve( token );
                }

            }
        )

    } )

}