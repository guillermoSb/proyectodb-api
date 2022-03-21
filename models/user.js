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
    let userObject = {
        user, email, password: newPass, name, lastName, active
    }
    await transaction('users').insert({
        ...userObject
    })
    delete userObject.password; // Do not return the password
    return userObject;  // Return the created user

}


export const getAllUsers = async () => {
    const users = (await DatabaseManager.knex('users').select('*')).map(dbUser => {
        return {
            ...dbUser,
            password: undefined
        }
    })
    return users;
}