import { DatabaseManager } from '../database/manager.js';
import { getAllFavoriteMovies, getAllMoviesByGenre, getAllMovies, addNewFavoriteMovie, checkMovie, createSeries } from '../models/content.js';
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
    const { genre } = req.params;
    try {
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
        console.log(error);
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