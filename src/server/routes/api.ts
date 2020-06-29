import { Router } from 'express';
import songsRouter from './songs';
import usersRouter from './users';
import servicesRouter from './services';

const router = new Router();

router.use('/users', usersRouter);
router.use('/songs', songsRouter);
router.use('/services', servicesRouter);
router.get('*', (req, res) => res.status(404).send());

export default router;
