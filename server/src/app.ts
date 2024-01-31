// Import required modules and types from express
import express from 'express';
import { Application, Request, Response, NextFunction } from 'express';
const path = require('path');

// Import the MapLayersRoutes class from the map-layers.routes file
import { MapLayersRoutes } from './map-layers/map-layers.routes';

// Define the public route for serving static files
const public_route = '/dist/client';

// Create express instance
class App {
    public app: Application;

    constructor() {
        this.app = express();
        this.config();
    }

    // Function to log incoming requests
    private logRequests(req: Request): void {
        console.log('\nRequest type: ', req.method, '\nRequest route:', req.originalUrl, '\nRequest params:', req.params);
    }

    // Configuration function to set up various middleware and routes
    private config(): void {
        this.app.disable('x-powered-by');

        // Middleware for handling CORS headers and logging requests
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            res.header('Access-Control-Allow-Origin', req.headers.origin);
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            res.header('X-Content-Type-Options', 'nosniff');
            res.header('X-Download-Options', 'noopen');
            res.header('X-Permitted-Cross-Domain-Policies', 'none');
            res.header('X-DNS-Prefetch-Control', 'off');
            this.logRequests(req);
            next();
        });

        // Middleware for parsing JSON requests with a size limit
        this.app.use(express.json({ limit: '10mb' }));

        // Middleware for parsing urlencoded requests
        this.app.use(express.urlencoded({ extended: false }));

        // Set up routes
        this.setRoutes();

        // Serve the index.html for any other route
        this.app.get('/*', (req: Request, res: Response) => {
            res.sendFile(path.join(process.cwd(), public_route, 'index.html'));
        });
    }

    // Function to set up application routes
    private setRoutes() {
        // Use the MapLayersRoutes for handling routes starting with '/api'
        this.app.use('/api', new MapLayersRoutes().routes);
    }
}

// Export the App class to make it accessible from other files
export { App };
