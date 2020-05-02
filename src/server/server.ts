import express from 'express';
import path from 'path';
import comp from 'express-static-gzip';
import apiRouter from './routes/api';
import { errorHandler, renderApp } from './middleware';

const buildPath = path.resolve(__dirname, '../../dist/public');
const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(comp(buildPath, { enableBrotli: true, orderPreference: ['br'] }));
server.use(express.static(buildPath));
server.use('/api/v1', apiRouter);
server.use(errorHandler);
server.get('*', renderApp);

export default server;
