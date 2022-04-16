import { DatabaseManager } from '../database/manager.js';
import { hashPassword } from '../utils/password.js';

/**
 * @param {string} profileCode
 */
 export const addFailedLog = async (email, password, transaction) => {

    const newPass = await hashPassword(password);

    await transaction('failed_logs').insert({ email, password:newPass });

}

