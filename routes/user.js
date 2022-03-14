// Library Imports
import { Router } from 'express';
// Project Imports
import { getUsers } from '../controllers/user.js';

const router = Router();    // Create the router

router.get('/', getUsers);  // Create the url to retreive users

export default router