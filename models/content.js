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
    const favoriteAlready = await DatabaseManager.knex('favorites_movies').select('*').where({
        movieCode,
        profileCode
    });

    if (favoriteAlready.length === 0) {
        await transaction('favorites_movies').insert({ profileCode, movieCode }, ['*']);
    }

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
 * Unmark a movie from the favorites
 * @param {number} movieCode 
 * @param {number} profileCode 
 */
export const unmarkFavoriteMovie = async (movieCode, profileCode) => {
    const favoriteAlready = await DatabaseManager.knex('favorites_movies').select('*').where({
        profileCode,
        movieCode
    });
    if (favoriteAlready.length !== 0) {
        await DatabaseManager.knex('favorites_movies').delete().where({
            profileCode,
            movieCode
        })
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
        const episodes = await DatabaseManager.knex('episodes').select('name', 'season', 'datePublished', 'url', 'episodeCode').where({ seriesCode });
        const studio = await DatabaseManager.knex('studios').select('name').where({
            studioCode: series[0].studioCode
        });
        series[0]['episodes'] = episodes;
        series[0]['studio'] = studio[0];
        return series[0];
    } else { return null; }
}


/**
 * Get a movie by code
 * @param {number} movieCode 
 */
export const getMovieById = async (movieCode) => {
    const movie = await DatabaseManager
        .knex('movies').select('*').where({ movieCode });

    if (movie.length !== 0) {
        const studio = await DatabaseManager.knex('studios').select('name').where({
            studioCode: movie[0].studioCode
        });
        movie[0]['studio'] = studio[0];
        return movie[0];
    } else { return null; }
}

/**
 * Create a movie finished activity
 * @param {number} movieCode 
 * @param {number} profileCode 
 * @returns 
 */
export const createMovieFinishedActivity = async (movieCode, profileCode) => {
    const activity = await DatabaseManager.knex('userMovieActivities').insert({
        movieCode,
        profileCode,
        finished: true
    }, '*');
    return activity;
}

/**
 * Create a movie finished activity
 * @param {number} movieCode 
 * @param {number} profileCode 
 * @returns 
 */
export const createMovieStartedActivity = async (movieCode, profileCode) => {
    const activity = await DatabaseManager.knex('userMovieActivities').insert({
        movieCode,
        profileCode
    }, '*');
    return activity;
}

/**
 * Fetch the finished movies from the database
 */
export const fetchFinishedMovies = async (profileCode) => {
    // 1. Fetch the finished movies for that profile
    const activity = await DatabaseManager.knex('userMovieActivities').distinct().where({
        profileCode,
        finished: true
    }).leftJoin('movies', 'userMovieActivities.movieCode', 'movies.movieCode');

    // 2. Return the results
    return activity;
}

/**
 * Fetch the started movies
 * @param {*} profileCode 
 * @returns 
 */
export const fetchStartedMovies = async (profileCode) => {
    // 1. Fetch the movies that are started but not finished
    const finishedMovies = DatabaseManager.knex('userMovieActivities').distinct('userMovieActivities.movieCode').where({
        profileCode,
        finished: true
    })
    const activity = await DatabaseManager.knex('userMovieActivities')
        .distinct('userMovieActivities.movieCode', 'movies.title', 'movies.coverUrl')
        .whereNotIn('userMovieActivities.movieCode', finishedMovies)
        .andWhere({
            profileCode,
            finished: false
        })
        .leftJoin('movies', 'userMovieActivities.movieCode', 'movies.movieCode');


    // 2. Return the results
    return activity;
}




/**
 * Create a episode finished activity
 * @param {number} episodeCode 
 * @param {number} profileCode 
 * @returns 
 */
export const createEpisodeFinishedActivity = async (episodeCode, profileCode) => {
    const activity = await DatabaseManager.knex('userSeriesActivities').insert({
        episodeCode,
        profileCode,
        finished: true
    }, '*');
    return activity;
}

/**
 * Create a episode finished activity
 * @param {number} episodeCode 
 * @param {number} profileCode 
 * @returns 
 */
export const createEpisodeStartedActivity = async (episodeCode, profileCode) => {
    const activity = await DatabaseManager.knex('userSeriesActivities').insert({
        episodeCode,
        profileCode,
        finished: false
    }, '*');
    return activity;
}

/**
 * Fetch the started series
 * @param {*} profileCode 
 * @returns 
 */
export const fetchStartedSeries = async (profileCode) => {
    if (isNaN(profileCode)) {
        return [];
    }
    const results = await DatabaseManager.knex.select('*').fromRaw(`
    (
        SELECT * FROM
series
WHERE(
    SELECT COUNT(DISTINCT "episodeCode") 
	FROM "userSeriesActivities"
	WHERE finished = false AND "profileCode" = ? AND "episodeCode" IN(
        SELECT "episodeCode"
		FROM episodes
		WHERE episodes."seriesCode" = series."seriesCode"
    )
) > 0 AND(
    SELECT COUNT(DISTINCT "episodeCode") 
	FROM "userSeriesActivities"
	WHERE finished = false AND "profileCode" = ? AND "episodeCode" IN(
        SELECT "episodeCode"
		FROM episodes
		WHERE episodes."seriesCode" = series."seriesCode"
    )
) <= (SELECT COUNT(*)
		FROM episodes
		WHERE episodes."seriesCode" = series."seriesCode") AND(
    SELECT COUNT(*)
			FROM episodes
			WHERE episodes."seriesCode" = series."seriesCode"
) != (
        SELECT COUNT(DISTINCT "episodeCode") 
				FROM "userSeriesActivities"
				WHERE finished = true AND "profileCode" = ? AND "episodeCode" IN(
            SELECT "episodeCode"
					FROM episodes
					WHERE episodes."seriesCode" = series."seriesCode"
        )
		)
    ) as d
    `, [profileCode, profileCode, profileCode])
    return results;

}


/**
 * Fetch the finished series from the database
 */
export const fetchFinishedSeries = async (profileCode) => {
    // query 1 -> select all the episodes for that profileCode
    const query1 = DatabaseManager.knex('userSeriesActivities').select('episodeCode').where({
        profileCode,
        finished: true
    });
    // query 2 -> obtain the series info
    const query2 = await DatabaseManager.knex('episodes').select('seriesCode').count()
        .whereIn('episodes.episodeCode', query1)
        .groupBy('seriesCode')

    let returnArray = [];

    for (const series of query2) {
        const totalCount = await DatabaseManager.knex('episodes').count().where({
            seriesCode: series.seriesCode
        });
        if (totalCount[0].count === series.count) {

            const seriesData = await DatabaseManager.knex('series').select('*').where({
                seriesCode: series.seriesCode
            });
            returnArray = returnArray.concat(seriesData);

        }
    }

    const result = returnArray;
    return result;

}


