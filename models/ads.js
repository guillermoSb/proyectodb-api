import { DatabaseManager } from '../database/manager.js';

/**
 * Gets an ad for a movie
 * @param {number} movieCode
 */
export const getMovieAd = async (movieCode) => {
    const ad = await DatabaseManager.knex('ad_movie_relationships')
        .select('*')
        .where({ movieCode })
        .leftJoin('ads', 'ad_movie_relationships.adCode', 'ads.adCode')
        .leftJoin('advertisers', 'ads.advertiserCode', 'advertisers.advertiserCode')
        .orderByRaw(DatabaseManager.knex.raw('RANDOM()'))
        .limit(1);

    return ad;
}

/**
 * Gets an ad for a series
 * @param {number} seriesCode
 */
export const getSeriesAd = async (seriesCode) => {
    const ad = await DatabaseManager.knex('ad_series_relationships')
        .select('*')
        .where({ seriesCode })
        .leftJoin('ads', 'ad_movie_relationships.adCode', 'ads.adCode')
        .leftJoin('advertisers', 'ads.advertiserCode', 'advertisers.advertiserCode')
        .orderByRaw(DatabaseManager.knex.raw('RANDOM()'))
        .limit(1);
    return ad;
}
