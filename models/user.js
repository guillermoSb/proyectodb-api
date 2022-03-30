import { DatabaseManager } from '../database/manager.js';
import { checkPassword, hashPassword } from '../utils/password.js';

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
        user, email, password: newPass, name, lastName, active, plan
    }
    const dbUser = await transaction('users').insert(userObject, ['*']);    // Create the user on the db
    delete dbUser[0].password; // Do not return the password
    return dbUser[0];  // Return the created user

}

/**
 * Get the plan of this user
 */
export const getUser = async (userCode) => {
    const users = (await DatabaseManager.knex('users').select('*').where({ userCode }).leftJoin('plans', 'users.plan', 'plans.name'));
    if (users.length <= 0) {
        return null;
    }
    delete users[0].password


    const { userCode: code, user, email, name, lastName, active, plan, profileCount } = users[0];

    const userObject = {
        userCode: code,
        user,
        email,
        name,
        lastName,
        active,
        plan: {
            plan,
            profileCount
        }
    }

    return users ? userObject : null;

}

/**
 * 
 * @param {string} userCode 
 * @param {string} name 
 * @param {import('knex').Knex} transaction 
 */
export const createProfile = async (userCode, name, transaction) => {
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


/**
 * Auths an user
 * @param {string} email 
 * @param {string} password 
 * @returns user
 */
export const authUser = async (email, password) => {
    const user = await DatabaseManager.knex('users').select('*').where({ email });    // Get the user
    if (user.length != 1) return null; // Check for user not found
    const passwordValid = await checkPassword(password, user[0].password);
    if (!passwordValid) return null;    // Check for password valid
    delete user[0].password;
    return user;
}

/**
 * Checks if an email exists
 * @param {string} email 
 * @returns {boolean}
 */
export const checkForExistingEmail = async (email) => {
    const existingEmail = await DatabaseManager.knex('users').select('email').where({ email });
    return existingEmail.length > 0;    // Return a boolean indicating if an email was found

}

/**
 * Checks if an user exists
 * @param {string} user 
 * @returns {boolean}
 */
export const checkForExistingUser = async (where) => {
    const existingUser = await DatabaseManager.knex('users').select('email').where({ ...where });
    return existingUser.length > 0;    // Return a boolean indicating if an email was found

}


/**
 * Get the profiles from an user
 * @param {*} userCode 
 */
export const getUserProfiles = async (userCode) => {
    const profiles = await DatabaseManager.knex('profiles').select('*').where({ userCode });
    return profiles;
}