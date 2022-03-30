import { checkForExistingEmail, checkForExistingUser, getUser, getUserProfiles } from '../models/user.js'

/**
 * Validates if an email is unique
 * @param {string} email 
 */
export const validateEmailUnique = async (email = '') => {
    const emailExists = await checkForExistingEmail(email);
    if (emailExists) {
        throw new Error(`El email ${email} ya existe.`);
    }
}

/**
 * Validates if an user is unique
 * @param {string} user
 */
export const validateUserUnique = async (user = '') => {
    const userExists = await checkForExistingUser({ user });
    if (userExists) {
        throw new Error(`El usuario ${user} ya existe.`);
    }
}

/**
 * Validates if the user exists by user code
 * @param {*} userCode 
 */
export const validateUserExists = async (userCode) => {
    if (!isNaN(userCode)) {
        const userExists = await checkForExistingUser({ userCode });
        if (!userExists) {
            throw new Error(`El usuario ${userCode} no existe.`);
        }
    }
}

/**
 * Get the user code
 * @param {number} userCode 
 */
export const validateMaxProfiles = async (userCode) => {

    const user = await getUser(userCode);   // Get the user information

    if (!user) {
        throw new Error(`Este usuario no es valido para crear un perfil ${userCode}.`);
    }
    const profiles = await getUserProfiles(userCode);
    if (profiles.length >= user.plan.profileCount) {
        throw new Error('Se ha exedido el límite de perfiles para este plan.');
    }

}