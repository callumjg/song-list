import { Router } from 'express';
import * as c from '../controllers/songs';

const router = Router();

router.post('/', c.createSong);
router.get('/metrics', c.getMetrics);
router.get('/:_id', c.getSong);
router.get('/', c.getSongs);
router.patch('/:_id', c.updateSong);
router.delete('/:_id', c.deleteSong);

export default router;
