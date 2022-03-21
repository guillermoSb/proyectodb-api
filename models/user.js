import { DatabaseManager } from '../database/manager.js';
import { hashPassword } from '../utils/password.js';

/**
 * Create a new user on the database
 * @param {string} plan
 * @param {string} role 
 * @param {string} user 
 * @param {string} email 
 * @param {string} password 
 * @param {string} name 
 * @param {string} lastName 
 * @param {string} active 
 * @param {import("knex").Knex} transaction
 */
export const createUser = async (plan, role, user, email, password, name, lastName, active, transaction) => {
    const newPass = await hashPassword(password);
    const userObject = {
        user, email, password: newPass, name, lastName, active
    }
    const dbUser = await transaction('users').insert(userObject, ['*']);    // Create the user on the db
    delete dbUser[0].password; // Do not return the password
    return dbUser[0];  // Return the created user

}

/**
 * 
 * @param {string} userCode 
 * @param {string} name 
 * @param {import('knex').Knex} transaction 
 */
export const createProfile = async (userCode, name, transaction) => {
    console.log('creating profile', userCode, name);
    const profileObject = {
        userCode,
        name
    }
    const dbProfile = await transaction('profiles').insert(profileObject, ['*'])    // Create profile on the db

    return dbProfile[0];
}

/**
 * Get all the users
 * @returns {any[]}
 */
export const getAllUsers = async () => {
    const users = (await DatabaseManager.knex('users').select('*')).map(dbUser => {
        return {
            ...dbUser,
            password: undefined
        }
    })
    return users;
}