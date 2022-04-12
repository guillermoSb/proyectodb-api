import { DatabaseManager } from '../database/manager.js';

/**
 * Gets an ad for a movie
 * @param {number} movieCode
 */
export const getMovieAd = async (movieCode) => {
    const ad = await DatabaseManager.knex('ads')
        .select('*')
        .leftJoin('advertisers', 'ads.advertiserCode', 'advertisers.advertiserCode')
        .orderByRaw(DatabaseManager.knex.raw('RANDOM()'))
        .limit(1);
    return ad;
}

/**
 * Gets an ad for a movie
 * @param {number} movieCode
 */
export const getSeriesAd = async (movieCode) => {
    const ad = await DatabaseManager.knex('ads')
        .select('*')
        .leftJoin('advertisers', 'ads.advertiserCode', 'advertisers.advertiserCode')
        .orderByRaw(DatabaseManager.knex.raw('RANDOM()'))
        .limit(1);
    return ad;
}