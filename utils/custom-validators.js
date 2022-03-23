import { checkForExistingEmail, checkForExistingUser } from '../models/user.js'

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


export const validateUserExists = async (userCode = '') => {
    const userExists = await checkForExistingUser({ userCode });
    if (!userExists) {
        throw new Error(`El usuario ${userCode} no existe.`);
    }
}