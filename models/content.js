import { DatabaseManager } from '../database/manager.js';

/**
 * @param {string} profileCode
 */

export const getAllFavoriteMovies = async (profileCode) => {

    const movies = await DatabaseManager.knex('favorites_movies').select('*').where({ profileCode }).innerJoin('movies','favorites_movies.movieCode','movies.movieCode');

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

    const genres = await DatabaseManager.knex('genres').select('*');

    return genres;

}


/**
 * @param {string} profileCode
 * @param {string} movieCode
 */

 export const addNewFavoriteMovie = async (profileCode,movieCode,transaction) => {

    await transaction('favorites_movies').insert({profileCode,movieCode}, ['*']);

}


/**
 * @param {string} movieCode
 */

 export const checkMovie = async (movieCode) => {

    const movies = await DatabaseManager.knex('movies').where({ movieCode })

    return movies;

}