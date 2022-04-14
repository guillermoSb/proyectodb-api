import { Router } from 'express';
import { check, param } from 'express-validator';

import {
    getFavouriteMovies, getMoviesByGenre, getMovies, addFavorite, postSeries, getSeries,
    getSeriesByGenre,
    getFavoriteSeries,
    addFavoriteSeries,
    removeFavoriteSeries,
    getSeriesByCode,
    getContentBySearch,
    getMoviesByCode,
    removeFavoriteMovie,
    getMovieByCode,
    markMovieAsFinished,
    getFinishedMovies,
    markEpisodeAsFinished,
    getFinishedSeries
} from '../controllers/content.js';
import { validateFields } from '../middlewares/request-validator.js';
//import { getAllGenres } from '../models/content.js';
import {
    validateCategoryExists, validateGenreExists, validateUserExists, validStudioCode, validDirectorCode, validateProfileExists
} from '../utils/custom-validators.js';

const router = Router();

router.get('/movies', getMovies);

router.get('/movies/:genre',
    [
        param('genre', 'El genero debe ser válido.').custom(validateGenreExists),
        validateFields
    ],
    getMoviesByGenre);

router.get('/movies/:profileCode/favorites',
    [
        param('profileCode', 'El código de perfil debe ser un número').isNumeric(),
        check('profileCode').custom(validateProfileExists),
        validateFields
    ],
    getFavouriteMovies);



router.post('/movies/:profileCode/favorites',
    [
        check('profileCode', 'El código de perfil no es válido').isNumeric(),
        check('movieCode', 'El código de película no es válido').isNumeric(),
        validateFields
    ],
    addFavorite
);

router.delete('/movies/:profileCode/favorites', [
    param('profileCode', 'El codigo del perfil no es valido').custom(validateProfileExists),
    check('movieCode', 'El codigo de la serie es requerido').notEmpty()
], removeFavoriteMovie)


router.get('/series', getSeries);  // Get all series
router.post('/series', [
    check('genre').custom(validateGenreExists),
    check('categories').custom(validateCategoryExists),
    check('studioCode').custom(validStudioCode),
    check('directorCode').custom(validDirectorCode),
    check('title', 'El titulo es requerido.').notEmpty(),
    check('episodeCount', 'El número de episodios es requerido').isInt({ min: 1 }),
    check('publishedAt', 'La fecha es requerida').notEmpty(),
    check('rating').notEmpty().isFloat({ min: 0, max: 5 }),
    check('seasonCount').isInt({ min: 1 }),
    validateFields
], postSeries); // Post a series
router.get('/series/:genre', [
    param('genre').custom(validateGenreExists),
    validateFields
], getSeriesByGenre);   // Get series per genre

router.get('/series/single/:seriesCode', [
    check('seriesCode', 'El código de la serie es requerido.').notEmpty().isNumeric(),
    validateFields
], getSeriesByCode);


router.get('/movies/single/:movieCode', [
    check('movieCode', 'El código de la pelicula es requerido.').notEmpty().isNumeric(),
    validateFields
], getMovieByCode);

router.get(
    '/series/:profileCode/favorites',
    [
        check('profileCode', 'el codigo es requerido').custom(validateProfileExists),
        validateFields
    ],
    getFavoriteSeries
);    // Get favorites for specific profile code
router.post('/series/:profleCode/favorites',
    [
        param('profileCode').custom(validateProfileExists),
        check('seriesCode', 'El codigo de la serie es requerido').notEmpty()
    ],
    addFavoriteSeries);    // Post favorites to specific profile code

router.delete('/series/:profileCode/favorites',
    [param('profileCode', 'El codigo del perfil no es valido').custom(validateProfileExists),
    check('seriesCode', 'El codigo de la serie es requerido').notEmpty()],
    removeFavoriteSeries);    // Delete a specific series from the favorites

router.get('/:value/search',
    [
        check('value', 'El valor es requerido').notEmpty(),
        validateFields
    ],getContentBySearch);
router.post('/movies/:profileCode/finished', [
    check('profileCode').custom(validateProfileExists),
    check('movieCode', 'El codigo de la pelicula no debe estar vacío.').notEmpty(),
    validateFields
], markMovieAsFinished);

router.get('/movies/:profileCode/finished', [
    check('profileCode').custom(validateProfileExists),
    validateFields
], getFinishedMovies);

router.post('/series/:profileCode/finished', [
    check('profileCode').custom(validateProfileExists),
    check('episodeCode', 'El codigo del episodio no debe estar vacio.').notEmpty(),
    validateFields
], markEpisodeAsFinished);

router.get('/series/:profileCode/finished', [
    check('profileCode').custom(validateProfileExists),
    validateFields
], getFinishedSeries);



export default router;