import { Router } from 'express';
import { check,param } from 'express-validator';

import { getFavouriteMovies, getMoviesByGenre, getMovies } from '../controllers/content.js';
import { getAllGenres } from '../models/content.js';
import { validateUserExists } from '../utils/custom-validators.js';

const router = Router();

router.get('/',getMovies);
router.get('/:profileCode/favourites', 
[
    param('profileCode', 'El userCode debe ser un numero').isNumeric(),
    param('profileCode','El código de usuario es requerido').custom(validateUserExists)
],
    getFavouriteMovies);

router.get('/:genre/movies', 
    [
        param('genre','El código de usuario es requerido').isIn(getAllGenres)
    ],
        getMoviesByGenre);

export default router;