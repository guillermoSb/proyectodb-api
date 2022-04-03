import { Router } from 'express';
import { check, param } from 'express-validator';

import { getFavouriteMovies, getMoviesByGenre, getMovies, addFavorite } from '../controllers/content.js';
import { getAllGenres } from '../models/content.js';
import { validateUserExists } from '../utils/custom-validators.js';

const router = Router();

router.get('/', getMovies);


router.get('/:profileCode/favourites',
    [
        param('profileCode', 'El código de perfil debe ser un número').isNumeric(),
        param('profileCode', 'El código de perfil es requerido').custom(validateUserExists)
    ],
    getFavouriteMovies);


router.get('/:genre/movies',
    [
        param('genre', 'El código de usuario es requerido').isIn(getAllGenres)
    ],
    getMoviesByGenre);

router.post('/:profileCode/favourites',
    [
        check('profileCode', 'El código de perfil no es válido').isNumeric(),
        check('movieCode', 'El código de película no es válido').isNumeric()
    ],
    addFavorite);


router.get('/series');  // Get all series
router.post('/series'); // Post a series
router.get('/series/:profleCode/favorites');    // Get favorites for specific profile code
router.post('/series/:profleCode/favorites');    // Post favorites to specific profile code
router.get('/series/:genre');   // Get series per genre


// GET movies/
// GET movies/:profileCode/favorites
// POST movies/:profileCode/favorites  -  (Agregar una pelicula favorita)
// GET movies/:genre

// GET series/
// GET series/:profileCode/favorites
// POST series/:profileCode/favorites  -  (Agregar una pelicula favorita)
// GET series/:genre



export default router;