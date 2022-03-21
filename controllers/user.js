import { createUser } from '../models/user.js';


/**
 * Retreive all the users
 * @param {*} req 
 * @param {*} res 
 */
export const getUsers = (req, res) => {
    res.status(200).send({
        ok: true,
        msg: 'Hola desde GET users'
    });
}

export const postUser = async (req, res) => {
    // Get all the parametters from the request body
    let { plan,
        role,
        user,
        email,
        password,
        name,
        lastName,
        active
    } = req.body;

    try {
        // Call the database creation for user
        let [createdUser, error] = await createUser(plan, role, user, email, password, name, lastName, active)

        // Handle the error
        if (error) {
            console.log('sf')
        } else {
            return res.status(201).send(
                {
                    ok: true,
                    user: createdUser
                }
            );
        }
    } catch (error) {
        return res.status(500).send(
            {
                ok: false,
                errors: [
                    'No se pudo crear un usuario.'
                ]
            }
        )
    }



}