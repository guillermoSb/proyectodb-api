import { DatabaseManager } from '../database/manager.js';
import { getAllFavoriteMovies, getAllMoviesByGenre, getAllMovies, addNewFavoriteMovie, checkMovie, createSeries, getAllSeries, getAllSeriesByGenre, markFavoriteSeries, unmarkFavoriteSeries, getAllFavoriteSeries, getSeriesById, unmarkFavoriteMovie, getMovieById, createMovieFinishedActivity, fetchFinishedMovies, createEpisodeFinishedActivity, fetchFinishedSeries, createEpisodeStartedActivity, createMovieStartedActivity, fetchStartedMovies, fetchStartedSeries } from '../models/content.js';
import { checkProfile } from '../models/user.js';

/**
 * Retreive all the users
 * @param {*} req 
 * @param {*} res 
 */
export const getFavouriteMovies = async (req, res) => {
    const { profileCode } = req.params;
    try {
        const movies = await getAllFavoriteMovies(profileCode);
        res.status(200).send({
            ok: true,
            movies
        });
    } catch (error) {
        return res.status(500).send(
            {
                ok: false,
                errors: [
                    'Error al obtener películas.'
                ]
            }
        );
    }
}

/**
 * Remove a favorite movie
 * @param {*} req 
 * @param {*} res 
 */
export const removeFavoriteMovie = async (req, res) => {
    const { profileCode } = req.params;
    const { movieCode } = req.body;
    try {
        await unmarkFavoriteMovie(movieCode, profileCode);
        return res.status(200).send({
            ok: true
        })
    } catch (error) {

        return res.status(500).send(
            {
                ok: false,
                errors: [
                    'No se pudo eliminar la pelicula de favoritos.'
                ]
            }
        );
    }
}

/**
 * Retreive all the users
 * @param {*} req 
 * @param {*} res 
 */
export const getMoviesByGenre = async (req, res) => {
    try {
        const { genre } = req.params;
        console.log(genre);
        const movies = await getAllMoviesByGenre(genre);

        if (movies.length === 0) {
            res.status(200).send({
                ok: false,
                errors: [
                    'Este género no tiene películas'
                ]
            });
        } else {

            res.status(200).send({
                ok: true,
                movies
            });

        }

    } catch (error) {
        return res.status(500).send(
            {
                ok: false,
                errors: [
                    'Error al obtener películas.'
                ]
            }
        );
    }
}


/**
 * Retreive all the users
 * @param {*} req 
 * @param {*} res 
 */
export const getMovies = async (req, res) => {
    try {
        const movies = await getAllMovies();

        const moviesByGenre = {};
        for (const movie of movies) {
            if (!moviesByGenre[movie.genre]) {
                moviesByGenre[movie.genre] = [{
                    movieCode: movie.movieCode,
                    title: movie.title,
                    genre: movie.genre,
                    categories: movie.categories,
                    publishedAt: movie.publishedAt,
                    rating: movie.rating,
                    coverUrl: movie.coverUrl,
                }];
            } else {
                moviesByGenre[movie.genre].push({
                    movieCode: movie.movieCode,
                    title: movie.title,
                    genre: movie.genre,
                    categories: movie.categories,
                    publishedAt: movie.publishedAt,
                    rating: movie.rating,
                    coverUrl: movie.coverUrl,
                });
            }
        }
        if (movies.length === 0) {
            res.status(200).send({
                ok: false,
                errors: [
                    'No hay películas en la base de datos'
                ]
            });
        } else {

            res.status(200).send({
                ok: true,
                movies: moviesByGenre
            });

        }

    } catch (error) {
        return res.status(500).send(
            {
                ok: false,
                errors: [
                    'Error al obtener películas.'
                ]
            }
        );
    }
}

/**
 * Register an user on the system
 * @param {*} req 
 * @param {*} res 
 */
export const addFavorite = async (req, res) => {
    const { profileCode } = req.params;
    const { movieCode } = req.body;

    try {

        if (checkProfile(profileCode).length < 1) {
            return res.status(500).send(
                {
                    ok: false,
                    errors: [
                        'No se ha encontrado el perfil solicitado.'
                    ]
                }
            );
        } else if (checkMovie(movieCode).length < 1) {
            return res.status(500).send(
                {
                    ok: false,
                    errors: [
                        'No se ha encontrado la película solicitado.'
                    ]
                }
            );
        }

        await DatabaseManager.knex.transaction(async transaction => {
            await addNewFavoriteMovie(profileCode, movieCode, transaction);
            return res.status(201).send(
                {
                    ok: true
                }
            );
        });

    } catch (error) {

        return res.status(500).send(
            {
                ok: false,
                errors: [
                    'Error al agregar película favorita.'
                ]
            }
        );
    }

}


/**
 * Adds a series on the system.
 * @param {*} req 
 * @param {*} res 
 */
export const postSeries = async (req, res) => {
    try {
        const series = req.body;
        await DatabaseManager.knex.transaction(async transaction => {
            const createdSeries = await createSeries(series, transaction);
            return res.status(201).send({
                ok: true,
                series: createdSeries
            })
        })

    } catch (error) {
        return res.status(500).send(
            {
                ok: false,
                errors: [
                    'Error al agregar una serie.'
                ]
            }
        );
    }
}

/**
 * Get all series 
 * @param {*} req 
 * @param {*} res 
 */
export const getSeries = async (req, res) => {
    try {
        const series = await getAllSeries();
        const seriesByGenre = {};
        for (const serie of series) {
            if (!seriesByGenre[serie.genre]) {
                seriesByGenre[serie.genre] = [{
                    seriesCode: serie.seriesCode,
                    title: serie.title,
                    categories: serie.categories,
                    publishedAt: serie.publishedAt,
                    rating: serie.rating,
                    genre: series.genre,
                    coverUrl: serie.coverUrl,
                }];
            } else {
                seriesByGenre[serie.genre].push({
                    seriesCode: serie.seriesCode,
                    title: serie.title,
                    categories: serie.categories,
                    publishedAt: serie.publishedAt,
                    rating: serie.rating,
                    genre: series.genre,
                    coverUrl: serie.coverUrl,
                });
            }
        }
        return res.status(200).send({
            ok: true,
            series: seriesByGenre
        });
    } catch (error) {
        return res.status(500).send(
            {
                ok: false,
                errors: [
                    'Error al obtener series.'
                ]
            }
        );
    }
}

/**
 * Get series by code
 * @param {*} req 
 * @param {*} res 
 */
export const getSeriesByCode = async (req, res) => {
    try {
        const { seriesCode } = req.params;

        const series = await getSeriesById(seriesCode);
        if (series) {
            return res.status(200).send({
                ok: true,
                series
            })
        } else {
            return res.status(400).send({
                ok: false,
                errors: [
                    'No existe esa serie'
                ]
            })
        }
    } catch (error) {

        return res.status(500).send(
            {
                ok: false,
                errors: [
                    'Error al obtener serie.'
                ]
            }
        );
    }
}


/**
 * Get series by code
 * @param {*} req 
 * @param {*} res 
 */
export const getMovieByCode = async (req, res) => {
    try {
        const { movieCode } = req.params;

        const movie = await getMovieById(movieCode);
        if (movie) {
            return res.status(200).send({
                ok: true,
                movie
            })
        } else {
            return res.status(400).send({
                ok: false,
                errors: [
                    'No existe esa pelicula'
                ]
            })
        }
    } catch (error) {

        return res.status(500).send(
            {
                ok: false,
                errors: [
                    'Error al obtener pelicula.'
                ]
            }
        );
    }
}

/**
 * Get series by genre
 * @param {*} req 
 * @param {*} res 
 */
export const getSeriesByGenre = async (req, res) => {
    try {
        const { genre } = req.params;
        const series = await getAllSeriesByGenre(genre);
        return res.status(200).send({
            ok: true,
            series
        });
    } catch (error) {
        return res.status(500).send(
            {
                ok: false,
                errors: [
                    'Error al obtener series.'
                ]
            }
        );
    }
}

/**
 * Add a favorite series
 * @param {*} req 
 * @param {*} res 
 */
export const addFavoriteSeries = async (req, res) => {
    const { profleCode } = req.params;
    const { seriesCode } = req.body;
    try {
        await markFavoriteSeries(seriesCode, profleCode);
        return res.status(200).send({
            ok: true
        })
    } catch (error) {

        return res.status(500).send(
            {
                ok: false,
                errors: [
                    'No se pudo agregar la serie como favorita.'
                ]
            }
        );
    }
}

/**
 * Remove a favorite series
 * @param {*} req 
 * @param {*} res 
 */
export const removeFavoriteSeries = async (req, res) => {
    const { profleCode } = req.params;
    const { seriesCode } = req.body;
    try {
        await unmarkFavoriteSeries(seriesCode, profleCode);
        return res.status(200).send({
            ok: true
        })
    } catch (error) {

        return res.status(500).send(
            {
                ok: false,
                errors: [
                    'No se pudo eliminar la serie de favoritos.'
                ]
            }
        );
    }
}


/**
 * Get all the favorite series
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const getFavoriteSeries = async (req, res) => {
    try {
        const { profileCode } = req.params;
        const series = await getAllFavoriteSeries(profileCode);
        return res.status(200).send({
            ok: true,
            series
        })
    } catch (error) {

        return res.status(500).send(
            {
                ok: false,
                errors: [
                    'No se pudo obtener todas las series favoritas.'
                ]
            }
        );
    }
}

/**
 * Mark a movie as finished
 * @param {*} req 
 * @param {*} res 
 */
export const markMovieAsFinished = async (req, res) => {
    try {
        const { profileCode } = req.params;
        const { movieCode } = req.body;
        const newActivity = await createMovieFinishedActivity(movieCode, profileCode);
        return res.status(200).send({
            ok: true
        })
    } catch (error) {
        return res.status(500).send(
            {
                ok: false,
                errors: [
                    'No se pudo marcar la pelicula como terminada.'
                ]
            }
        );
    }
}

/**
 * Get the finished movies for a profile
 * @param {*} req 
 * @param {*} res 
 */
export const getFinishedMovies = async (req, res) => {
    try {
        const { profileCode } = req.params;
        const movies = await fetchFinishedMovies(profileCode);
        return res.status(200).send({
            ok: true,
            movies
        })
    } catch (error) {
        return res.status(500).send(
            {
                ok: false,
                errors: [
                    'No se pudo obtener las peliculas terminadas.'
                ]
            }
        );
    }
}

/**
 * Mark an episode as finished
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const markEpisodeAsFinished = async (req, res) => {
    try {
        const { profileCode } = req.params;
        const { episodeCode } = req.body;
        await createEpisodeFinishedActivity(episodeCode, profileCode);
        return res.status(200).send({
            ok: true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            ok: false,
            errors: [
                'No se pudo marcar el episodio como terminado.'
            ]
        })
    }
}

/**
 * Mark a series as finished
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const getFinishedSeries = async (req, res) => {
    try {
        const { profileCode } = req.params;
        const series = await fetchFinishedSeries(profileCode);
        return res.status(200).send({
            ok: true,
            series
        })
    } catch (error) {

        return res.status(500).send({
            ok: false,
            errors: [
                'Error al obtener series terminadas.'
            ]
        })
    }
}

/**
 * Mark an episode as started
 * @param {*} req 
 * @param {*} res 
 */
export const markEpisodeAsStarted = async (req, res) => {
    try {
        const { profileCode } = req.params;
        const { episodeCode } = req.body;
        await createEpisodeStartedActivity(episodeCode, profileCode);
        return res.status(200).send({
            ok: true
        });
    } catch (error) {
        return res.status(500).send({
            ok: false,
            errors: [
                'No se pudo marcar el episodio como empezado.'
            ]
        })
    }
}

/**
 * Mark a series as in progress
 * @param {*} req 
 * @param {*} res 
 */
export const getInProgressSeries = async (req, res) => {
    try {
        const { profileCode } = req.params;
        const series = await fetchStartedSeries(profileCode);
        return res.status(200).send({
            ok: true,
            series
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            ok: false,
            errors: [
                'No se pudo obtener las series en progreso.'
            ]
        })
    }
}

/**
 * Mark a movie as started
 * @param {*} req 
 * @param {*} res 
 */
export const markMovieAsStarted = async (req, res) => {
    try {
        const { profileCode } = req.params;
        const { movieCode } = req.body;
        await createMovieStartedActivity(movieCode, profileCode);
        return res.status(200).send({
            ok: true
        });
    } catch (error) {
        return res.status(500).send({
            ok: false,
            errors: [
                'No se pudo marcar la pelicula como empezada.'
            ]
        })
    }
}

/**
 * Get all the movies in progress
 * @param {*} req 
 * @param {*} res 
 */
export const getInProgressMovies = async (req, res) => {
    try {
        const { profileCode } = req.params;
        const movies = await fetchStartedMovies(profileCode);
        return res.status(200).send({
            ok: true,
            movies
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            ok: false,
            errors: [
                'No se pudo obtener las peliculas en progreso.'
            ]
        })
    }
}