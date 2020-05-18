import { Router } from 'express';
import * as c from '../controllers/songs';

const router = Router();

router.post('/', c.createSong);
router.get('/metrics', c.getMetrics);
router.get('/:songId', c.getSong);
router.get('/', c.getSongs);
router.patch('/:songId', c.updateSong);
router.delete('/:songId', c.deleteSong);

export default router;
