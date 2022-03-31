
import jwt from 'jsonwebtoken'

export const generarJWT = ( uid = '') => {

    return new Promise( (resolve, reject) => {

        const payload = { uid }


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