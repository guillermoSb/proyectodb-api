import { DatabaseManager } from '../database/manager.js';

/**
 * @param {string} userCode
 * 
 */

export const getFavorites = (userCode) => {

    const movies = await DatabaseManager.knex('profileMovieFavorites').select('*').where({ userCode }).innerJoin('movies','profileMovieFavorites.movieCode','movies.movieCode');

}