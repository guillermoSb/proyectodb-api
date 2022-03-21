// Library Imports
import { Router } from 'express';
// Project Imports
import { registerUser } from '../controllers/auth.js';

const router = Router();    // Create the router

router.get('/register', registerUser);  // Retreive a list of all users
router.post('/login', loginUser)    // Create an user

export default router;