import { Router } from 'express';
import { check, param, query } from 'express-validator';
import { report1, report4, report5 } from '../controllers/reports.js';

import { validateFields } from '../middlewares/request-validator.js';

const router = Router();

router.get('/1', [
    query('startDate', 'La fecha inicial es requerida').notEmpty(),
    query('endDate', 'La fecha final es requerida').notEmpty(),
    validateFields
], report1)

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


export default router;