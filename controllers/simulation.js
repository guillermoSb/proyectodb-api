

/**
 * Content simulation for movies
 * @param {*} req 
 * @param {*} res 
 */
export const contentSimulation = async (req, res) => {
    console.log('simulation')
    return res.status(200).send({ ok: true });
}