import { DatabaseManager } from '../database/manager.js';
import { createUser, createProfile } from '../models/user.js';


/**
 * Register an user on the system
 * @param {*} req 
 * @param {*} res 
 */
export const registerUser = async (req, res) => {
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
            // Create default profile
            let createdProfile = await createProfile(createdUser.userCode, createdUser.user, transaction);
            // Return the response
            return res.status(201).send(
                {
                    ok: true,
                    user: createdUser,
                    profile: createdProfile
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
};

/**
 * Login an user on the system
 * @param {*} req 
 * @param {*} res 
 */
export const loginUser = async (req, res) => {

};