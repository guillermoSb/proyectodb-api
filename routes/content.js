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
    deleteMovie,
    removeFavoriteMovie,
    getMovieByCode,
    markMovieAsFinished,
    deleteSeries,
    getFinishedMovies,
    markEpisodeAsFinished,
    getFinishedSeries,
    markEpisodeAsStarted,
    getInProgressSeries,
    deleteEpisode,
    markMovieAsStarted,
    getInProgressMovies,
    postEpisode,
    getFeaturedMovies,
    getFeaturedSeries,
    getAllMoviesWithoutGenre,
    createMovie,
    modifyMovie,
    getAllSeriesWithoutGenre,
    modifySeries
} from '../controllers/content.js';
import { validateFields } from '../middlewares/request-validator.js';
//import { getAllGenres } from '../models/content.js';
import {
    validateCategoryExists, validateGenreExists, validateUserExists, validStudioCode, validDirectorCode, validateProfileExists
} from '../utils/custom-validators.js';

const router = Router();

router.get('/movies', getMovies);

router.post(
    '/movies/:adminId',
    [
        check('genre').custom(validateGenreExists),
        check('categories').notEmpty().custom(validateCategoryExists),
        check('studio', 'El estudio es requerido').notEmpty(),
        check('director', 'El director es requerido').notEmpty(),
        check('duration', 'La duracion es requerida.').notEmpty().isNumeric(),
        check('title', 'El titulo es requerido.').notEmpty(),
        check('coverUrl', 'El cover es requerido.').notEmpty().isURL(),
        check('url', 'El url es requerido.').notEmpty(),
        check('publishedAt', 'La fecha es requerida').notEmpty(),
        check('rating').notEmpty().isFloat({ min: 0, max: 5 }),
        validateFields
    ],
    createMovie
);

router.put('/movies/:movieCode/:adminId',
    [
        check('genre').custom(validateGenreExists),
        check('categories').notEmpty().custom(validateCategoryExists),
        check('studio', 'El estudio es requerido').notEmpty(),
        check('director', 'El director es requerido').notEmpty(),
        check('duration', 'La duracion es requerida.').notEmpty().isNumeric(),
        check('title', 'El titulo es requerido.').notEmpty(),
        check('coverUrl', 'El cover es requerido.').notEmpty().isURL(),
        check('url', 'El url es requerido.').notEmpty(),
        check('publishedAt', 'La fecha es requerida').notEmpty(),
        check('rating').notEmpty().isFloat({ min: 0, max: 5 }),
        validateFields
    ],
    modifyMovie
)
router.put('/series/:seriesCode',
    [
        check('genre').custom(validateGenreExists),
        check('categories').custom(validateCategoryExists),
        check('studio', 'El estudio es requerido').notEmpty(),
        check('director', 'El director es requerido').notEmpty(),
        check('title', 'El titulo es requerido.').notEmpty(),
        check('episodeCount', 'El n??mero de episodios es requerido').isInt({ min: 1 }),
        check('publishedAt', 'La fecha es requerida').notEmpty(),
        check('rating').notEmpty().isFloat({ min: 0, max: 5 }),
        check('coverUrl', 'El cover es requerido.').notEmpty().isURL(),
        check('seasonCount').isInt({ min: 1 }),
        validateFields
    ],
    modifySeries
)

router.delete('/movies/:movieCode/:adminId',
    [
        check('movieCode', 'El codigo de la pelicula debe ser un n??mero').isNumeric().notEmpty(),
        validateFields
    ],
    deleteMovie
);

router.delete('/series/:seriesCode',
    [
        check('seriesCode', 'El codigo de la serie debe ser un n??mero').isNumeric().notEmpty(),
        validateFields
    ],
    deleteSeries
);

router.get('/movies/all', getAllMoviesWithoutGenre);
router.get('/series/all', getAllSeriesWithoutGenre);

router.get('/movies/:genre',
    [
        param('genre', 'El genero debe ser v??lido.').custom(validateGenreExists),
        validateFields
    ],
    getMoviesByGenre);

router.get('/movies/:profileCode/favorites',
    [
        param('profileCode', 'El c??digo de perfil debe ser un n??mero').isNumeric(),
        check('profileCode').custom(validateProfileExists),
        validateFields
    ],
    getFavouriteMovies);



router.post('/movies/:profileCode/favorites',
    [
        check('profileCode', 'El c??digo de perfil no es v??lido').isNumeric(),
        check('movieCode', 'El c??digo de pel??cula no es v??lido').isNumeric(),
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
    check('studio', 'El estudio es requerido').notEmpty(),
    check('director', 'El director es requerido').notEmpty(),
    check('title', 'El titulo es requerido.').notEmpty(),
    check('episodeCount', 'El n??mero de episodios es requerido').isInt({ min: 1 }),
    check('publishedAt', 'La fecha es requerida').notEmpty(),
    check('rating').notEmpty().isFloat({ min: 0, max: 5 }),
    check('coverUrl', 'El cover es requerido.').notEmpty().isURL(),
    check('seasonCount').isInt({ min: 1 }),
    validateFields
], postSeries); // Post a series

router.post('/series/:seriesCode/episodes', [
    check('seriesCode', 'El c??digo de la serie es requerido.').notEmpty().isNumeric(),
    check('name', 'El nombre es requerido').notEmpty(),
    check('season', 'La temporada es requerida').notEmpty(),
    check('url', 'La url es requerida.').notEmpty(),
    check('duration', 'La duracion es requerida').isNumeric().notEmpty(),
    validateFields
], postEpisode)

router.delete('/series/:seriesCode/episodes/:episodeCode', [
    check('seriesCode', 'El c??digo de la serie es requerido.').notEmpty().isNumeric(),
    check('episodeCode', 'El c??digo del episodio es requerido.').notEmpty().isNumeric(),
    validateFields
], deleteEpisode)

router.get('/series/:genre', [
    param('genre').custom(validateGenreExists),
    validateFields
], getSeriesByGenre);   // Get series per genre

router.get('/series/single/:seriesCode', [
    check('seriesCode', 'El c??digo de la serie es requerido.').notEmpty().isNumeric(),
    validateFields
], getSeriesByCode);


router.get('/movies/single/:movieCode', [
    check('movieCode', 'El c??digo de la pelicula es requerido.').notEmpty().isNumeric(),
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
    ], getContentBySearch);
router.post('/movies/:profileCode/finished', [
    check('profileCode').custom(validateProfileExists),
    check('movieCode', 'El codigo de la pelicula no debe estar vac??o.').notEmpty(),
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


router.post('/series/:profileCode/started', [
    check('profileCode').custom(validateProfileExists),
    check('episodeCode', 'El codigo del episodio no debe estar vacio.').notEmpty(),
    validateFields
], markEpisodeAsStarted);

router.get('/series/:profileCode/in-progress', [
    check('profileCode').custom(validateProfileExists),
    validateFields
], getInProgressSeries);

router.post('/movies/:profileCode/started', [
    check('profileCode').custom(validateProfileExists),

    validateFields
], markMovieAsStarted);

router.get('/movies/:profileCode/in-progress', [
    check('profileCode').custom(validateProfileExists),
    validateFields
], getInProgressMovies);

router.get('/movies/:profileCode/featured', [
    check('profileCode').custom(validateProfileExists),
    validateFields
], getFeaturedMovies);


router.get('/series/:profileCode/featured', [
    check('profileCode').custom(validateProfileExists),
    validateFields
], getFeaturedSeries);



export default router;