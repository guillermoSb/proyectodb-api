// Library Imports
import { Router } from 'express';
// Project Imports
import { registerUser, loginUser } from '../controllers/auth.js';

const router = Router();    // Create the router

router.post('/register', registerUser);  // Retreive a list of all users
router.post('/login', loginUser)    // Create an user

export default router;