import { Router } from 'express';
import songsRouter from './songs';
import servicesRouter from './services';

const router = new Router();

router.use('/songs', songsRouter);
router.use('/services', servicesRouter);

export default router;
