import { DatabaseManager } from '../database/manager.js';
import { getAllFavoriteMovies, getAllMoviesByGenre } from '../models/content.js';

/**
 * Retreive all the users
 * @param {*} req 
 * @param {*} res 
 */
export const getFavouriteMovies = async (req, res) => {
    const { profileCode } = req.params; 
    try {
        const movies = await getAllFavoriteMovies( profileCode );

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
        const movies = await getAllMoviesByGenre( genre );

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
export const prueba = (req,res) => {
    res.status(200).send({
        ok: true,
        msg: 'prueba'
    });
}