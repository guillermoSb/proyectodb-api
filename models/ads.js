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
        .leftJoin('ads', 'ad_series_relationships.adCode', 'ads.adCode')
        .leftJoin('advertisers', 'ads.advertiserCode', 'advertisers.advertiserCode')
        .orderByRaw(DatabaseManager.knex.raw('RANDOM()'))
        .limit(1);
    return ad;
}

export const getAllAdvertisers = async () => {
    const advertisers = await DatabaseManager.knex('advertisers').select('*');
    return advertisers;
}


export const createAdvertiser = async (data) => {
    await DatabaseManager.knex('advertisers').insert(data).select('*');
}

export const deleteAdvertiser = async (advertiserCode) => {
    await DatabaseManager.knex('ads').delete().where({ advertiserCode });
    await DatabaseManager.knex('advertisers').delete().where({ advertiserCode });
}
export const deleteAd = async (adCode) => {
    await DatabaseManager.knex('ads').delete().where({ adCode });
}

export const modifyAdvertiser = async (advertiserCode, data) => {
    await DatabaseManager.knex('advertisers').update(data).where({ advertiserCode });
}
export const insertAd = async (advertiserCode, data) => {
    data.advertiserCode = advertiserCode;
    await DatabaseManager.knex('ads').insert(data);
}

export const getAllAds = async (advertiserCode) => {
    const ads = await DatabaseManager.knex('ads').select('*').where({ advertiserCode });
    return ads;
}

export const linkMovieWithAd = async (movieCode, adCode) => {
    const exists = await DatabaseManager.knex('ad_movie_relationships').select('*').where({ adCode, movieCode });
    if (exists.length > 0) {
        return;
    }
    await DatabaseManager.knex('ad_movie_relationships').insert({ adCode, movieCode })
}
export const linkSeriesWithAd = async (seriesCode, adCode) => {
    const exists = await DatabaseManager.knex('ad_series_relationships').select('*').where({ adCode, seriesCode });
    if (exists.length > 0) {
        return;
    }
    await DatabaseManager.knex('ad_series_relationships').insert({ adCode, seriesCode })
}