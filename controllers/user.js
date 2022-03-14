

/**
 * Retreive all the users
 * @param {*} req 
 * @param {*} res 
 */
export const getUsers = (req, res) => {
    res.status(200).send({
        ok: true,
        msg: 'Hola desde GET users'
    });
}