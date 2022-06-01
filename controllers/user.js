import { DatabaseManager } from '../database/manager.js';
import { createProfile, createUser, deleteUser, downgradeUser, getAllUsers, getUser, getUserProfiles, toggleActivationProfile, updateLockState, updateUser } from '../models/user.js';
import { changeAdmin } from '../models/administration.js';

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

    const { adminId } = req.params;

    try {
        // Run everything using a transaction
        await DatabaseManager.knex.transaction(async transaction => {
            // Call the database creation for user
            await changeAdmin(adminId);
            let createdUser = await createUser(plan, role, user, email, password, name, lastName, active, transaction)
            await changeAdmin('');
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
        await changeAdmin('');
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
        console.log(error);
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

/**
 * Unlocks a profile session
 * @param {*} req 
 * @param {*} res 
 */
export const toggleActivateProfile = async (req, res) => {
    const { profileCode, adminId } = req.params;

    try {
        await changeAdmin(adminId);
        await toggleActivationProfile(profileCode)
        await changeAdmin('');
        return res.status(200).send({
            ok: true
        });

    } catch (error) {
        return res.status(500).send(
            {
                ok: false,
                errors: [
                    'Error al modificar el perfil.'
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
export const downgrade = async (req, res) => {
    const { userCode } = req.params;

    try {

        const user = await downgradeUser(userCode);

        if (user) {
            return res.status(200).send({
                ok: true
            });
        } else {
            console.log('error!!')
            return res.status(500).send(
                {
                    ok: false,
                    errors: [
                        'Este usuario ya tiene el plan mas basico.'
                    ]
                }
            );
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send(
            {
                ok: false,
                errors: [
                    'Error al modificar el usuario.'
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

export const deleteUserByCode = async (req, res) => {
    const { userCode, adminId } = req.params;

    try {
        await changeAdmin(adminId);
        await deleteUser(userCode);
        await changeAdmin('');
        return res.status(200).send({
            ok: true
        });

    } catch (error) {
        return res.status(500).send(
            {
                ok: false,
                errors: [
                    'Error al eliminar usuario.'
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

export const updateUserByCode = async (req, res) => {
    let { plan,
        role,
        user,
        email,
        name,
        lastName,
        active,
    } = req.body;

    const { userCode, adminId } = req.params;


    try {
        // Run everything using a transaction

        // Call the database creation for user
        await changeAdmin(adminId);
        let updatedUser = await updateUser(plan, role, user, email, name, lastName, active, userCode)
        await changeAdmin('');
        // Return the response
        return res.status(201).send(
            {
                ok: true,
                user: updatedUser
            }
        );

    } catch (error) {
        console.log(error);
        return res.status(500).send(
            {
                ok: false,
                errors: [
                    'Error al modificar usuario.'
                ]
            }
        );
    }
}