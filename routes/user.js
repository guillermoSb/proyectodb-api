// Library Imports
import { Router } from 'express';
// Project Imports
import { postUser, getUsers } from '../controllers/user.js';

const router = Router();    // Create the router

router.get('/', getUsers);  // Retreive a list of all users
router.post('/', postUser)    // Create an user

export default router;