import { Router } from 'express';
import { check, param } from 'express-validator';
import { getAdForMovie, getAdForSeries } from '../controllers/ads.js';
import { validateFields } from '../middlewares/request-validator.js';

const router = Router();

router.get('/movies/:movieCode', [
    check('movieCode', 'El codigo de la pelicula debe ser un numero').isNumeric(),
    validateFields
], getAdForMovie);

router.get('/series/:seriesCode', [
    check('seriesCode', 'El codigo de la serie debe ser un numero').isNumeric(),
    validateFields
], getAdForSeries);

export default router;