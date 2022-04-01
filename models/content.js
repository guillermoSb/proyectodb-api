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



 export const getAllGenres = async () => {

    const genres = await DatabaseManager.knex('genres').select('*');

    return genres;

}