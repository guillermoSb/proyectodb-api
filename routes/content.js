import { Router } from 'express';
import { check, param } from 'express-validator';

import { getFavouriteMovies, getMoviesByGenre, getMovies, addFavorite, postSeries } from '../controllers/content.js';
import { validateFields } from '../middlewares/request-validator.js';
import { getAllGenres } from '../models/content.js';
import {
    validateCategoryExists, validateGenreExists, validateUserExists, validStudioCode, validDirectorCode
} from '../utils/custom-validators.js';

const router = Router();

router.get('/movies', getMovies);


router.get('movies/:profileCode/favorites',
    [
        param('profileCode', 'El código de perfil debe ser un número').isNumeric(),
        param('profileCode', 'El código de perfil es requerido').custom(validateUserExists),
    ],
    getFavouriteMovies);


router.get('movies/:genre',
    [
        param('genre', 'El genero debe ser válido.').isIn(getAllGenres)
    ],
    getMoviesByGenre);

router.post('/:profileCode/favourites',
    [
        check('profileCode', 'El código de perfil no es válido').isNumeric(),
        check('movieCode', 'El código de película no es válido').isNumeric()
    ],
    addFavorite);


router.get('/series',);  // Get all series
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
router.get('/series/:profleCode/favorites');    // Get favorites for specific profile code
router.post('/series/:profleCode/favorites');    // Post favorites to specific profile code
router.delete('/series/:profleCode/favorites');    // Delete a specific series from the favorites
router.get('/series/:genre');   // Get series per genre


export default router;