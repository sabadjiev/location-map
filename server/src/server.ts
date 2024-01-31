/**
 * Module dependencies.
 */

import { App } from './app';
let http = require('http');

const app = new App().app;
/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(3000, 'localhost');
server.on('error', onError);
server.on('listening', onListening);


/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: { syscall: string; code: any }) {
    if (error.syscall !== 'listen') {
        throw error;
    }


    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error('The port requires elevated privileges');
            process.exit(1);
        case 'EADDRINUSE':
            console.error('The port is already in use');
            process.exit(1);
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    let addr = server.address();
    let bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    console.log('Listening on ' + bind);
}
