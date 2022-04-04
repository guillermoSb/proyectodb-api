import { Router } from 'express';
import { check } from 'express-validator';
import { failedLog } from '../controllers/administration.js';

const router = Router();

router.post('/failed/log',failedLog);

export default router;