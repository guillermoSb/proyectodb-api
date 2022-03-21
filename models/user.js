import { DatabaseManager } from '../database/manager.js'  // Database manager

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
 */
export const createUser = async (plan, role, user, email, password, name, lastName, active) => {


    const createdUser = await DatabaseManager.knex('users').insert({
        plan,
        role,
        user,
        email,
        password,
        name,
        lastName,
        active
    })
    if (!createdUser) {
        return [null, 'Error al crear el usuario']
    }
    return [createdUser, null];

}