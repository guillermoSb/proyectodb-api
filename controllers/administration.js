import { DatabaseManager } from '../database/manager.js';
import { addFailedLog, changeAdmin } from '../models/administration.js';


/**
 * Register an user on the system
 * @param {*} req 
 * @param {*} res 
 */
export const failedLog = async (req, res) => {

    const { email, password } = req.body;

    try {
        await DatabaseManager.knex.transaction(async transaction => {
            await addFailedLog(email, password, transaction);
            return res.status(200).send({
                ok: true
            })
        })
    } catch (error) {
        return res.status(500).send(
            {
                ok: false,
                errors: [
                    'No se pudo agregar ingreso fallido'
                ]
            }
        );
    }

}

export const changeadmin = async (req, res) => {

    const { adminId } = req.body;

    try {
        await changeAdmin(adminId.toString());
        return res.status(200).send({
            ok: true
        })
    } catch (error) {
        return res.status(500).send(
            {
                ok: false,
                errors: [
                    'No se pudo modificar el usuario administrador.'
                ]
            }
        );
    }

}