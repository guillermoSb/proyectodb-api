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
 * @param {string} userCode 
 */
export const getUser = async (userCode) => {
    const users = (await DatabaseManager.knex('users').select('*').where({ userCode }).leftJoin('plans', 'users.plan', 'plans.name'));
    if (users.length <= 0) {
        return null;
    }
    delete users[0].password


    const { userCode: code, user, email, name, lastName, active, plan, profileCount, adFrequency } = users[0];

    const userObject = {
        userCode: code,
        user,
        email,
        name,
        lastName,
        active,
        plan: {
            plan,
            profileCount,
            adFrequency
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
 * Auths an user
 * @param {string} userCode 
 * @returns user
 */
export const authUserWithToken = async (userCode) => {
    const user = await DatabaseManager.knex('users').select('*').where({ userCode });    // Get the user
    if (user.length != 1) return null; // Check for user not found
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
 * Checks if an user exists
 * @param {string} user 
 * @returns {boolean}
 */
export const checkForExistingProfile = async (where) => {
    const existingUser = await DatabaseManager.knex('profiles').select('name').where({ ...where });
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


/**
 * Get the profiles from an user
 * @param {*} profileCode 
 */
export const checkProfile = async (profileCode) => {
    const profiles = await DatabaseManager.knex('profiles').select('*').where({ profileCode });
    return profiles;
}


export const updateLockState = async (profileCode, locked) => {
    const updated = await DatabaseManager.knex('profiles').update({ signedIn: locked }).where({ profileCode });
    return updated;
}

export const toggleActivationProfile = async (profileCode) => {
    const now = await DatabaseManager.knex('profiles').select('active').where({ profileCode });
    await DatabaseManager.knex('profiles').update('active',!now[0].active).where({ profileCode });
}

export const downgradeUser = async (userCode) => {
    const types = {
        'advanced':2,
        'standard':1,
        'basic':0}
    const now = await DatabaseManager.knex('users').select('plan').where({userCode});
    const value = types[now[0].plan]
    if (value >0) {
        const name = Object.keys(types)[value-1];
        await DatabaseManager.knex('users').update('plan',name).where({userCode});
        const profiles = await DatabaseManager.knex('profiles').where({userCode, active:true});
        const profileCountByPlan = await DatabaseManager.knex('plans').select('profileCount').where({name});
        const profilesCodeToBeDeactivatedFormat = await DatabaseManager.knex('profiles').select('profileCode').where({userCode, active:true}).limit(Object.keys(profiles).length-(profileCountByPlan)[0].profileCount);
        const profilesCodeToBeDeactivated = profilesCodeToBeDeactivatedFormat.map(value => {return parseInt(value.profileCode)})
        
        if (Object.keys(profiles).length > (profileCountByPlan)[0].profileCount) {
            await DatabaseManager.knex('profiles').update('active',false).where({userCode}).whereIn('profileCode',profilesCodeToBeDeactivated);
            return true
        }
    }

    return undefined;
}