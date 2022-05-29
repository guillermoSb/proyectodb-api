import { Router } from 'express';
import { contentSimulation } from '../controllers/simulation.js';


const router = Router();

router.post('/', [], contentSimulation)

export default router;