import { DatabaseManager } from '../database/manager.js';

/**
 * @param {string} profileCode
 */

export const getAllFavoriteMovies = async (profileCode) => {

    const movies = await DatabaseManager.knex('favorites_movies').select('*').where({ profileCode }).innerJoin('movies', 'favorites_movies.movieCode', 'movies.movieCode');

    return movies;
}


/**
 * @param {string} genre
 */

export const getAllMoviesByGenre = async (genre) => {

    const movies = await DatabaseManager.knex('movies').select('*').where({ genre });

    return movies;

}

export const getAllMovies = async () => {

    const movies = await DatabaseManager.knex('movies').select('*');

    return movies;

}



export const getAllGenres = async () => {

    const genres = (await DatabaseManager.knex('genres').select('*')).map((genre) => genre.name);
    return genres;

}


/**
 * @param {string} profileCode
 * @param {string} movieCode
 */

export const addNewFavoriteMovie = async (profileCode, movieCode, transaction) => {

    await transaction('favorites_movies').insert({ profileCode, movieCode }, ['*']);

}


/**
 * @param {string} movieCode
 */

export const checkMovie = async (movieCode) => {

    const movies = await DatabaseManager.knex('movies').where({ movieCode })

    return movies;

}


export const getallCategories = async () => {
    const categories = (await DatabaseManager.knex('categories').select('*')).map((category) => category.name);
    return categories;
}

/**
 * Create a series into the database
 * @param {*} series 
 * @param {import('knex').Knex} transaction 
 */
export const createSeries = async (series, transaction) => {

    let episodes = [];
    // Check if the method received an array of episodes on the series
    if (Object.keys(series).includes('episodes')) {
        episodes = series.episodes;
        delete series.episodes;
    }
    const createdSeries = await transaction('series').insert(series, '*');
    // Create the episodes
    for (const episode of episodes) {
        episode['seriesCode'] = createdSeries[0].seriesCode;
        const createdEpisode = await transaction('episodes').insert(episode, '*');
        if (!createdSeries[0].episodes) {
            createdSeries[0]['episodes'] = [createdEpisode[0]];
        } else {
            createdSeries.episodes.push(createdEpisode[0]);
        }
    }
    return createdSeries;
}

/**
 * Get a studio by its code
 * @param {number} studioCode 
 * @returns 
 */
export const getStudio = async (studioCode) => {
    const studio = (await DatabaseManager.knex('studios').select('*').where({ studioCode }));
    return studio;
}

/**
 * Get a director by its code
 * @param {number} directorCode 
 * @returns 
 */
export const getDirector = async (directorCode) => {
    const studio = (await DatabaseManager.knex('directors').select('*').where({ directorCode }));
    return studio;
}

/**
 * Gets all series
 * @returns {[]}
 */
export const getAllSeries = async () => {
    return (await DatabaseManager.knex('series').select('*'));
}


/**
 * Gets all series
 * @returns {[]}
 */
export const getAllSeriesByGenre = async (genre) => {
    return (await DatabaseManager.knex('series').select('*').where({ genre }));
}
