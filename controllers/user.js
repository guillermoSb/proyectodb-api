import { DatabaseManager } from '../database/manager.js';
import { createProfile, createUser, getAllUsers, getUser, getUserProfiles, updateLockState } from '../models/user.js';


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


/**
 * Gets profiles by user
 * @param {*} req 
 * @param {*} res 
 */
export const getProfilesByUserId = async (req, res) => {
    const { userCode } = req.params;  // user code to search profiles
    try {
        const profiles = await getUserProfiles(userCode);    // Get the profiles
        res.status(200).send({
            ok: true,
            profiles
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send(
            {
                ok: false,
                errors: [
                    'Error al obtener perfiles del usuario.'
                ]
            }
        );
    }
}


/**
 * Post an user profile
 * @param {*} req 
 * @param {*} res 
 */
export const postProfileByUserId = async (req, res) => {
    const { userCode } = req.params;  // userCode
    const { name } = req.body;    // Profile name
    try {
        await DatabaseManager.knex.transaction(async transaction => {
            // Call the database creation for user
            const createdProfile = await createProfile(userCode, name, transaction)
            // Return the response
            return res.status(201).send(
                {
                    ok: true,
                    profile: createdProfile
                }
            );
        });

    } catch (error) {
        return res.status(500).send(
            {
                ok: false,
                errors: [
                    'Error al crear perfil para el usuario.'
                ]
            }
        );
    }
}

/**
 * Gets an user by id
 * @param {*} req 
 * @param {*} res 
 */
export const getUserById = async (req, res) => {
    const { userCode } = req.params;
    try {
        const user = await getUser(userCode);
        return res.status(200).send(
            {
                ok: true,
                user
            }
        );
    } catch (error) {
        return res.status(500).send(
            {
                ok: false,
                errors: [
                    'Error al obtener el usuario.'
                ]
            }
        );
    }
}

/**
 * Locks a profile session
 * @param {*} req 
 * @param {*} res 
 */
export const lockProfile = async (req, res) => {
    const { profileCode } = req.params;
    try {
        await updateLockState(profileCode, true);
        return res.status(200).send({
            ok: true
        });
    } catch (error) {
        return res.status(500).send(
            {
                ok: false,
                errors: [
                    'Error al bloquear el perfil.'
                ]
            }
        );
    }
}

/**
 * Unlocks a profile session
 * @param {*} req 
 * @param {*} res 
 */
export const unlockProfile = async (req, res) => {
    const { profileCode } = req.params;
    try {
        await updateLockState(profileCode, false);
        return res.status(200).send({
            ok: true
        });
    } catch (error) {
        return res.status(500).send(
            {
                ok: false,
                errors: [
                    'Error al desbloquear el perfil.'
                ]
            }
        );
    }
}