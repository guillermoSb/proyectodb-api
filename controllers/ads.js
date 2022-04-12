import { getMovieAd, getSeriesAd } from '../models/ads.js';

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
        const { movieCode } = req.params;
        const ad = await getSeriesAd(movieCode);
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