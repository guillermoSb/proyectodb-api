import express from 'express';

import userRoutes from '../routes/user.js';

export class Server {

    // Paths for the api endpoints
    paths = {
        users: '/api/users'
    }

    constructor() {
        this.app = express();   // Create the express application
        this.middlewares(); // Init the common middlewares
        this.routes();  // Init the routes
    }

    /**
     * Init common middlewares
     */
    middlewares() {
        this.app.use(express.json())    // JSON parser
    }

    /**
     * Init the api listening on the given port.
     */
    listen() {

        // TODO: Change the port where the app is listening using .env
        this.app.listen(8080, () => {
            console.log(`Servidor escuchando en el puerto: ${8080}`);
        });
    }

    /**
     * Init the routes for the server
     */
    routes() {
        this.app.use(this.paths.users, userRoutes); // userRoutes
    }
}