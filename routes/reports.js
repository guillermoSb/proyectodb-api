import { Router } from 'express';
import { check, param, query } from 'express-validator';
import { report1, report4, report5, report3Director, report3Actors, report2, reportEvents } from '../controllers/reports.js';

import { validateFields } from '../middlewares/request-validator.js';

const router = Router();

router.get('/1', [
    query('startDate', 'La fecha inicial es requerida').notEmpty(),
    query('endDate', 'La fecha final es requerida').notEmpty(),
    validateFields
], report1)

router.get('/2', [
    // param('startDate', 'La fecha inicial es requerida').notEmpty(),
    // param('endDate', 'La fecha final es requerida').notEmpty(),
    validateFields
], report2)

router.get('/3/director', [
    // param('startDate', 'La fecha inicial es requerida').notEmpty(),
    // param('endDate', 'La fecha final es requerida').notEmpty(),
    validateFields
], report3Director)

router.get('/3/actores', [
    // param('startDate', 'La fecha inicial es requerida').notEmpty(),
    // param('endDate', 'La fecha final es requerida').notEmpty(),
    validateFields
], report3Actors)

router.get('/4', [
    // param('startDate', 'La fecha inicial es requerida').notEmpty(),
    // param('endDate', 'La fecha final es requerida').notEmpty(),
    validateFields
], report4)

router.get('/5', [
    // param('startDate', 'La fecha inicial es requerida').notEmpty(),
    // param('endDate', 'La fecha final es requerida').notEmpty(),
    validateFields
], report5)

router.get('/events', [
    // param('startDate', 'La fecha inicial es requerida').notEmpty(),
    // param('endDate', 'La fecha final es requerida').notEmpty(),
    validateFields
], reportEvents)


export default router;