import { Router } from 'express';
import { check,param } from 'express-validator';

import { getFavouriteMovies, getMoviesByGenre, getMovies, addFavorite } from '../controllers/content.js';
import { getAllGenres } from '../models/content.js';
import { validateUserExists } from '../utils/custom-validators.js';

const router = Router();

router.get('/',getMovies);


router.get('/:profileCode/favourites', 
    [
        param('profileCode', 'El código de perfil debe ser un número').isNumeric(),
        param('profileCode','El código de perfil es requerido').custom(validateUserExists)
    ],
    getFavouriteMovies);


router.get('/:genre/movies', 
    [
        param('genre','El código de usuario es requerido').isIn(getAllGenres)
    ],
    getMoviesByGenre);

router.post('/addFavorite',
    [
        check('profileCode','El código de perfil no es válido').isNumeric(),
        check('movieCode','El código de película no es válido').isNumeric()
    ],
    addFavorite);
export default router;