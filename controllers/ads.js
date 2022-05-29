import {
    getMovieAd, getSeriesAd, getAllAdvertisers, getAllAds,
    createAdvertiser, deleteAdvertiser, modifyAdvertiser, insertAd, deleteAd, linkMovieWithAd, linkSeriesWithAd
} from '../models/ads.js';
import { changeAdmin } from '../models/administration.js';

/**
 * Gets an ad for a movie
 * @param {*} req 
 * @param {*} res 
 */
export const getAdForMovie = async (req, res) => {
    try {
        const { movieCode } = req.params;
        const ad = await getMovieAd(movieCode);
        return res.status(200).send({
            ok: true,
            ad: ad.length > 0 ? ad[0] : null
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            ok: false,
            errors: [
                'No se pudo obtener el anuncio.'
            ]
        })
    }
}

/**
 * Gets an ad for a series
 * @param {*} req 
 * @param {*} res 
 */
export const getAdForSeries = async (req, res) => {
    try {
        const { seriesCode } = req.params;
        const ad = await getSeriesAd(seriesCode);
        return res.status(200).send({
            ok: true,
            ad: ad.length > 0 ? ad[0] : null
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            ok: false,
            errors: [
                'No se pudo obtener el anuncio.'
            ]
        })
    }
}

/**
 * Get all advertisers
 * @param {*} req 
 * @param {*} res 
 */
export const getAdvertisers = async (req, res) => {
    try {
        const advertisers = await getAllAdvertisers();
        return res.status(200).send({
            ok: true,
            advertisers
        });
    } catch (error) {
        return res.status(500).send({
            ok: false,
            errors: [
                'No se pudo obtener los anunciantes.'
            ]
        })
    }
}
/**
 * Get all advertisers ads
 * @param {*} req 
 * @param {*} res 
 */
export const getAdvertiserAds = async (req, res) => {
    try {
        const { advertiserCode } = req.params;
        const ads = await getAllAds(advertiserCode);
        return res.status(200).send({
            ok: true,
            ads
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            ok: false,
            errors: [
                'No se pudo obtener los anuncios.'
            ]
        })
    }
}

/**
 * Create an advertiser
 * @param {*} req 
 * @param {*} res 
 */
export const postAdvertiser = async (req, res) => {
    try {
        const data = req.body;
        const {adminId} = req.params;
        await changeAdmin(adminId);
        await createAdvertiser(data);
        await changeAdmin('');
        return res.status(200).send({
            ok: true
        })
    } catch (error) {
        return res.status(500).send({
            ok: false,
            errors: [
                'No se pudo crear a un anunciante.'
            ]
        })
    }
}
/**
 * Create an advertiser
 * @param {*} req 
 * @param {*} res 
 */
export const putAdvertiser = async (req, res) => {
    try {
        const data = req.body;
        const { advertiserCode, adminId } = req.params;
        await changeAdmin(adminId);
        await modifyAdvertiser(advertiserCode, data);
        await changeAdmin('');
        return res.status(200).send({
            ok: true
        })
    } catch (error) {
        return res.status(500).send({
            ok: false,
            errors: [
                'No se pudo crear a un anunciante.'
            ]
        })
    }
}


/**
 * Removes an advertiser
 * @param {*} req 
 * @param {*} res 
 */
export const removeAdvertiser = async (req, res) => {
    try {
        const { advertiserCode, adminId } = req.params;
        await changeAdmin(adminId);
        await deleteAdvertiser(advertiserCode);
        await changeAdmin('');
        return res.status(200).send({ ok: true })
    } catch (error) {
        return res.status(500).send({
            ok: false,
            errors: [
                'No se pudo eliminar al anunciante.'
            ]
        })
    }
}
/**
 * Removes an advertiser
 * @param {*} req 
 * @param {*} res 
 */
export const removeAd = async (req, res) => {
    try {
        const { adCode,adminId } = req.params;
        await changeAdmin(adminId);
        await deleteAd(adCode);
        await changeAdmin('');
        return res.status(200).send({ ok: true })
    } catch (error) {
        return res.status(500).send({
            ok: false,
            errors: [
                'No se pudo eliminar al anunciante.'
            ]
        })
    }
}


/**
 * Create an ad
 * @param {*} req 
 * @param {*} res 
 */
export const createAd = async (req, res) => {
    try {
        const data = req.body;
        const { advertiserCode, adminId } = req.params;
        await changeAdmin(adminId);
        await insertAd(advertiserCode, data);
        await changeAdmin('');
        return res.status(200).send({ ok: true });
    } catch (error) {

        return res.status(500).send({
            ok: false,
            errors: [
                'No se pudo crear un anuncio.'
            ]
        })
    }
}

/**
 * Link an ad with a content
 * @param {*} req 
 * @param {*} res 
 */
export const linkAdWithContent = async (req, res) => {
    try {
        const { contentCode, adCode, type } = req.body;
        if (type === 'movie') {
            await linkMovieWithAd(contentCode, adCode);
        } else {
            await linkSeriesWithAd(contentCode, adCode);

        }
        return res.status(200).send({ ok: true });
    } catch (error) {
        return res.status(500).send({
            ok: false,
            errors: [
                'No se pudo configurar el anuncio.'
            ]
        })
    }
} 