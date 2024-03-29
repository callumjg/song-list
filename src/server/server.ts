import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import comp from 'express-static-gzip';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import apiRouter from './routes/api';
import { errorHandler, renderApp, logger } from './middleware';
import feedbackFormHandler from './routes/feedback';
import cors from 'cors';
import pool from './db';

const buildPath = path.resolve(__dirname, '../../dist/public');
const server = express();

server.use(cors());
// server.use(helmet({ contentSecurityPolicy: false }));
server.use(cookieParser());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(comp(buildPath, { enableBrotli: true, orderPreference: ['br'] }));
server.use(logger);

server.use(express.static(buildPath));
server.use('/api/v1', apiRouter);
server.post('/feedback-form', feedbackFormHandler);
server.get('/feedback-form-view', async (req, res) => {
  try {
    const data = await pool.query('select * from feedback');

    return res.send({ rows: data.rows });
  } catch (e) {
    console.log(e);
    return res.status(400);
  }
});
server.use(errorHandler);
server.get('*', renderApp());

export default server;
