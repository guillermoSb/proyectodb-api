import brcypt from 'bcrypt';

/**
 * Hashes a password
 * @param {string} password 
 * @returns {string} hashed password
 */
export const hashPassword = async (password) => {
    return brcypt.hash(password, 10);
}

/**
 * Compares a password with the one saved
 * @param {string} password 
 * @param {string} savedPassword 
 * @returns {boolean} indicating if the password is the same
 */
export const checkPassword = async (password, savedPassword) => {
    return brcypt.compare(password, savedPassword);
}