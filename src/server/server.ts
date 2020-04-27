import express from 'express';
import path from 'path';
import comp from 'express-static-gzip';
import apiRouter from './routes/api';
import renderApp from './middleware/renderApp';

const buildPath = path.resolve(__dirname, '../../dist/public');
const server = express();

console.log(buildPath);

// Middleware
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(comp(buildPath, { enableBrotli: true, orderPreference: ['br'] }));
server.use(express.static(buildPath));

// Routes
server.use('/api/v1', apiRouter);
server.get('*', renderApp);

export default server;
