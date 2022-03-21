import { DatabaseManager } from '../database/manager.js';
import { createUser, getAllUsers } from '../models/user.js';


/**
 * Retreive all the users
 * @param {*} req 
 * @param {*} res 
 */
export const getUsers = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(200).send({
            ok: true,
            users
        });
    } catch (error) {
        return res.status(500).send(
            {
                ok: false,
                errors: [
                    'Error al obtener usuarios.'
                ]
            }
        );
    }

}

/**
 * Create an user
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
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
        // Run everything using a transaction
        await DatabaseManager.knex.transaction(async transaction => {
            // Call the database creation for user
            let createdUser = await createUser(plan, role, user, email, password, name, lastName, active, transaction)

            // Return the response
            return res.status(201).send(
                {
                    ok: true,
                    user: createdUser
                }
            );
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send(
            {
                ok: false,
                errors: [
                    'Error al crear usuario.'
                ]
            }
        );
    }



}