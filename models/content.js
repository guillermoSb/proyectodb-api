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


/**
 * Mark a favorite series
 * @param {number} seriesCode 
 * @param {number} profileCode 
 */
export const markFavoriteSeries = async (seriesCode, profileCode) => {
    // Check if the series is already favorite
    const favoriteAlready = await DatabaseManager.knex('favorite_series').select('*').where({
        seriesCode,
        profileCode
    });

    if (favoriteAlready.length === 0) {
        await DatabaseManager.knex('favorite_series').insert({ seriesCode, profileCode });
    }
}

/**
 * Unmark a favorite series
 * @param {number} seriesCode 
 * @param {number} profileCode 
 */
export const unmarkFavoriteSeries = async (seriesCode, profileCode) => {
    // Check if the series is already favorite
    const favoriteAlready = await DatabaseManager.knex('favorite_series').select('*').where({
        seriesCode,
        profileCode
    });

    if (favoriteAlready.length !== 0) {
        await DatabaseManager.knex('favorite_series').delete().where({
            seriesCode,
            profileCode
        });
    }
}

/**
 * Get all favorite series for a profile
 * @param {number} profileCode 
 * @returns {[]}
 */
export const getAllFavoriteSeries = async (profileCode) => {
    return (await DatabaseManager.knex('favorite_series')
        .select('*')
        .leftJoin('series', 'favorite_series.seriesCode', 'series.seriesCode')
        .where({ profileCode })

    );
}

/**
 * Get series by code
 * @param {number} seriesCode 
 */
export const getSeriesById = async (seriesCode) => {
    const series = await DatabaseManager
        .knex('series').select('*').where({ seriesCode });

    if (series.length !== 0) {
        const episodes = await DatabaseManager.knex('episodes').select('name', 'season', 'datePublished').where({ seriesCode });
        series[0]['episodes'] = episodes;
        return series;
    } else { return null; }
}


/**
 * @param {number} value
 */
const searchMovies = async (value,dataLabels) => {

    const moviesByName = await DatabaseManager
        .knex('movies').select(dataLabels).whereILike( 'title', '%'+value+'%')
        .innerJoin('studios', 'movies.studioCode','studios.studioCode')
        .innerJoin('directors', 'movies.directorCode','directors.directorCode');

    const moviesByGenre = await DatabaseManager
        .knex('movies').select(dataLabels).whereILike( 'genre', '%'+value+'%')
        .innerJoin('directors', 'movies.directorCode','directors.directorCode')
        .innerJoin('studios', 'movies.studioCode','studios.studioCode')

    const moviesByCategory = await DatabaseManager
        .knex('movies').select(dataLabels).whereILike( 'categories','%'+value+'%')
        .innerJoin('directors', 'movies.directorCode','directors.directorCode')
        .innerJoin('studios', 'movies.studioCode','studios.studioCode');

    const moviesByDirector = await DatabaseManager
        .knex('movies').select(dataLabels).innerJoin('directors', 'movies.directorCode','directors.directorCode')
        .whereILike( 'directors.name', '%'+value+'%').orWhereILike( 'lastName', '%'+value+'%')
        .innerJoin('studios', 'movies.studioCode','studios.studioCode');
    
    const moviesByStudio = await DatabaseManager
        .knex('movies').select(dataLabels).innerJoin('studios', 'movies.studioCode','studios.studioCode')
        .whereILike( 'studios.name', '%'+value+'%').innerJoin('directors', 'movies.directorCode','directors.directorCode');

    const movies = moviesByName.concat(moviesByGenre,moviesByCategory,moviesByDirector,moviesByStudio);

    const cleanData = movies.filter((value, index) => {
        const _value = JSON.stringify(value);
        return index === movies.findIndex(obj => {
          return JSON.stringify(obj) === _value;
        });
      });

      return cleanData;

}


/**
 * @param {number} value
 */
const searchSeries = async (value,dataLabels) => {

    const seiresByName = await DatabaseManager
        .knex('series').select(dataLabels).whereILike( 'title', '%'+value+'%')
        .innerJoin('studios', 'series.studioCode','studios.studioCode')
        .innerJoin('directors', 'series.directorCode','directors.directorCode');

    const seriesByGenre = await DatabaseManager
        .knex('series').select(dataLabels).whereILike( 'genre', '%'+value+'%')
        .innerJoin('directors', 'series.directorCode','directors.directorCode')
        .innerJoin('studios', 'series.studioCode','studios.studioCode')

    const seriesByCategory = await DatabaseManager
        .knex('series').select(dataLabels).whereILike( 'categories','%'+value+'%')
        .innerJoin('directors', 'series.directorCode','directors.directorCode')
        .innerJoin('studios', 'series.studioCode','studios.studioCode');

    const seriesByDirector = await DatabaseManager
        .knex('series').select(dataLabels).innerJoin('directors', 'series.directorCode','directors.directorCode')
        .whereILike( 'directors.name', '%'+value+'%').orWhereILike( 'lastName', '%'+value+'%')
        .innerJoin('studios', 'series.studioCode','studios.studioCode');
    
    const seriessByStudio = await DatabaseManager
        .knex('series').select(dataLabels).innerJoin('studios', 'series.studioCode','studios.studioCode')
        .whereILike( 'studios.name', '%'+value+'%').innerJoin('directors', 'series.directorCode','directors.directorCode');

    const series = seiresByName.concat(seriesByGenre,seriesByCategory,seriesByDirector,seriessByStudio);

    const cleanData = series.filter((value, index) => {
        const _value = JSON.stringify(value);
        return index === series.findIndex(obj => {
          return JSON.stringify(obj) === _value;
        });
      });

    return cleanData;

}

/**
 * @param {number} value
 */
 export const searchContent = async (value) => {

    const dataLabelsMovies = ['title','movieCode','genre','categories as category','studios.name as studio','duration','publishedAt','description','rating','coverUrl','directors.name as directorName','directors.lastName as directorLastName']
    const dataLabelsSeries = ['title','seriesCode','genre','categories as category','studios.name as studio','publishedAt','description','rating','coverUrl','directors.name as directorName','directors.lastName as directorLastName']

    const movies = searchMovies(value,dataLabelsMovies);

    const series = searchSeries(value,dataLabelsSeries);

    const content = (await movies).concat(await series);

    console.log(content);
}
