import { generateMoviesSimulation } from '../models/content.js';


/**
 * Content simulation for movies
 * @param {*} req 
 * @param {*} res 
 */
export const contentSimulation = async (req, res) => {
    try {
        const { date, quantity } = req.body;
        await generateMoviesSimulation(date, quantity);

        return res.status(200).send({
            ok: true, data: {
                message: `Se han creado ${quantity} vistas aleatorias`
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send(
            {
                ok: false,
                errors: [
                    'Error al generar simulación.'
                ]
            }
        );
    }
}