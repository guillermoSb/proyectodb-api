import { Router } from 'express';
import { check } from 'express-validator';
import { contentSimulation, userSimulation } from '../controllers/simulation.js';
import { validateFields } from '../middlewares/request-validator.js';


const router = Router();

router.post('/', [
    check('quantity', 'La cantidad de vistas es necesaria.').notEmpty().isInt({ min: 1 }),
    check('date', 'La fecha es necesaria').isDate(),
    validateFields
], contentSimulation)

router.post('/user', [
    check('quantity', 'La cantidad de vistas es necesaria.').notEmpty().isInt({ min: 1 }),
    check('date', 'La fecha es necesaria').isDate(),
    validateFields
], userSimulation)

export default router;