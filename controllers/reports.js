import { createReport1, createReport4, createReport5, createReport3Director, createReport3Actors, createReport2, createReportEvents, createReport6, createReport7, createReport9 } from '../models/reports.js';

/**
 * Report 1
 * @param {*} req 
 * @param {*} res 
 */
export const report1 = async (req, res) => {
    const { startDate, endDate } = req.query;
    try {
        if ((new Date(startDate)) > (new Date(endDate))) {
            return res.status(400).send({
                ok: false,
                errors: [
                    'La fecha es menor'
                ]
            })
        }

        const report = await createReport1(startDate, endDate);
        return res.status(200).send({
            ok: true,
            report
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            ok: false,
            errors: [
                'No se pudo obtener el reporte'
            ]
        })
    }
}

/**
 * Report 1
 * @param {*} req 
 * @param {*} res 
 */
export const report2 = async (req, res) => {
    const { startDate, endDate } = req.query;
    try {
        if ((new Date(startDate)) > (new Date(endDate))) {
            return res.status(400).send({
                ok: false,
                errors: [
                    'La fecha es menor'
                ]
            })
        }

        const report = await createReport2(startDate, endDate);
        return res.status(200).send({
            ok: true,
            report
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            ok: false,
            errors: [
                'No se pudo obtener el reporte'
            ]
        })
    }
}



/**
 * Report 4
 * @param {*} req 
 * @param {*} res 
 */
export const report3Director = async (req, res) => {
    try {
        const report = await createReport3Director();
        return res.status(200).send({
            ok: true,
            report
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            ok: false,
            errors: [
                'No se pudo obtener el reporte'
            ]
        })
    }
}

/**
* Report 4
* @param {*} req 
* @param {*} res 
*/
export const report3Actors = async (req, res) => {
    try {
        const report = await createReport3Actors();
        return res.status(200).send({
            ok: true,
            report
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            ok: false,
            errors: [
                'No se pudo obtener el reporte'
            ]
        })
    }
}

/**
 * Report 4
 * @param {*} req 
 * @param {*} res 
 */
export const report4 = async (req, res) => {

    try {
        const report = await createReport4();
        return res.status(200).send({
            ok: true,
            report
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            ok: false,
            errors: [
                'No se pudo obtener el reporte'
            ]
        })
    }
}
/**
 * Report 5
 * @param {*} req 
 * @param {*} res 
 */
export const report5 = async (req, res) => {
    const { date } = req.query;
    try {
        const report = await createReport5(date);
        return res.status(200).send({
            ok: true,
            report
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            ok: false,
            errors: [
                'No se pudo obtener el reporte'
            ]
        })
    }
}

/**
 * Report 5
 * @param {*} req 
 * @param {*} res 
 */
export const reportEvents = async (req, res) => {
    try {
        const report = await createReportEvents();
        return res.status(200).send({
            ok: true,
            report
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            ok: false,
            errors: [
                'No se pudo obtener el reporte'
            ]
        })
    }

}

/**
 * Reporte de top 5 peliculas mas vistas entre 9am y 1pm
 * @param {*} req 
 * @param {*} res 
 */
export const report6 = async (req, res) => {
    try {
        const { month } = req.query;
        const report = await createReport6(month);
        // salio bien
        return res.status(200).send({
            report,
            ok: true,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            ok: false,
            errors: [
                'No se pudo obtener el reporte'
            ]
        })
    }
}

/**
 * Report 9
 * @param {*} req 
 * @param {*} res 
 */
export const report9 = async (req, res) => {
    const { startDate, endDate } = req.query;
    try {
        if ((new Date(startDate)) > (new Date(endDate))) {
            return res.status(400).send({
                ok: false,
                errors: [
                    'La fecha es menor'
                ]
            })
        }

        const report = await createReport9(startDate, endDate);
        return res.status(200).send({
            ok: true,
            report
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            ok: false,
            errors: [
                'No se pudo obtener el reporte'
            ]
        })
    }
}
/**
 * Reporte de Top 10 de los términos que los usuarios buscan
 * @param {*} req 
 * @param {*} res 
 */
export const report7 = async (req, res) => {
    try {
        const report = await createReport7();
        // salio bien
        return res.status(200).send({
            report,
            ok: true,
        })
    } catch (error) {
        console.log(error);

        return res.status(500).send({
            ok: false,
            errors: [
                'No se pudo obtener el reporte'
            ]
        })
    }
}