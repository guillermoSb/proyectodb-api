import express from 'express';
import cors from 'cors';

import userRoutes from '../routes/user.js';
import authRoutes from '../routes/auth.js';
import contentRoutes from '../routes/content.js';
import adminRoutes from '../routes/administration.js';
import adsRoutes from '../routes/ads.js'
import reportsRoutes from '../routes/reports.js'

export class Server {

    // Paths for the api endpoints
    paths = {
        users: '/api/users',
        auth: '/api/auth',
        content: '/api/content',
        admin: '/api/admin',
        ads: '/api/ads',
        reports: '/api/reports',
        inventario: '/api'
    }

    constructor() {
        this.app = express();   // Create the express application
        this.cors();    // Config cors
        this.middlewares(); // Init the common middlewares
        this.routes();  // Init the routes
    }

    /**
     * Cors
     */
    cors() {
        this.app.use(cors())
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
        this.app.use(this.paths.auth, authRoutes); // userRoutes
        this.app.use(this.paths.content, contentRoutes); //ContentRoutes
        this.app.use(this.paths.admin, adminRoutes);
        this.app.use(this.paths.ads, adsRoutes); //ContentRoutes
        this.app.use(this.paths.reports, reportsRoutes); //ContentRoutes
    }
}