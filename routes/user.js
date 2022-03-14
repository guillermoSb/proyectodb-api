// Library Imports
const { Router } = require('express');
// Project Imports
const { getUsers } = require('../controllers/user');

const router = Router();    // Create the router

router.get('/', getUsers);  // Create the url to retreive users

module.exports = router