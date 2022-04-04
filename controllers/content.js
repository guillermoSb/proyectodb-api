import { DatabaseManager } from '../database/manager.js';
import { getAllFavoriteMovies, getAllMoviesByGenre, getAllMovies, addNewFavoriteMovie, checkMovie, createSeries, getAllSeries, getAllSeriesByGenre, markFavoriteSeries, unmarkFavoriteSeries, getAllFavoriteSeries, getSeriesById, searchContent } from '../models/content.js';
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

        if (movies.length === 0) {
            res.status(200).send({
                ok: false,
                errors: [
                    'Este perfil no tiene películas favoritas'
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
 * Register an user on the system
 * @param {*} req 
 * @param {*} res 
 */
export const addFavorite = async (req, res) => {
    const { profileCode, movieCode } = req.body;

    try {

        if (checkProfile(profileCode) < 1) {
            return res.status(500).send(
                {
                    ok: false,
                    errors: [
                        'No se ha encontrado el perfil solicitado.'
                    ]
                }
            );
        } else if (checkMovie(movieCode) < 1) {
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
        console.log(error);
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
        console.log(error);
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
        console.log(error);
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
 * Get all the favorite series
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
 export const getMoviesBySearch = async (req, res) => {
    try {
        const { value } = req.params;
        await searchContent(value)
        return res.status(200).send({
            ok: true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send(
            {
                ok: false,
                errors: [
                    'No se pudo hacer la búsqueda.'
                ]
            }
        );
    }
}