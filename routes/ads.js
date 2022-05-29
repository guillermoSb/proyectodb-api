import { Router } from 'express';
import { check, param } from 'express-validator';
import {
    getAdForMovie, getAdForSeries, getAdvertisers, postAdvertiser, getAdvertiserAds,
    removeAdvertiser, putAdvertiser, createAd, removeAd, linkAdWithContent
} from '../controllers/ads.js';
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

router.post('/advertisers/:adminId', [
    check('name', 'El nombre es requerido').notEmpty(),
    validateFields
], postAdvertiser);

router.put('/advertisers/:advertiserCode/:adminId', [
    check('name', 'El nombre es requerido').notEmpty(),
    check('advertiserCode', 'El codigo es requerido').notEmpty().isNumeric(),
    validateFields
], putAdvertiser);

router.delete('/advertisers/:advertiserCode/:adminId', [
    check('advertiserCode', 'El codigo es requerido').notEmpty().isNumeric(),
    validateFields
], removeAdvertiser);

router.get('/advertisers', getAdvertisers)


router.get('/advertisers/:advertiserCode/ads', getAdvertiserAds);
router.post('/advertisers/:advertiserCode/ads/:adminId',
    [
        check('title', 'El titulo es requerido').notEmpty(),
        check('url', 'El url es requerido').notEmpty(),
        check('advertiserCode', 'El codigo del anunciante es requerido').notEmpty().isNumeric(),
        validateFields
    ],
    createAd);

router.delete('/advertisers/:advertiserCode/ads/:adCode/:adminId', [
    check('advertiserCode', 'El codigo del anunciante es requerido').notEmpty().isNumeric(),
    check('adCode', 'El codigo del anuncio es requerido').notEmpty().isNumeric(),
    validateFields
], removeAd)

router.post('/link', [
    check('type', 'El tipo de contenido es requerido').notEmpty().isIn(['movie', 'series']),
    check('contentCode', 'El codigo de contenido es requerido').notEmpty().isNumeric(),
    check('adCode', 'El codigo del anuncio es requerido').notEmpty().isNumeric(),
    validateFields
], linkAdWithContent)

export default router;