import { Router } from 'express';
import * as c from '../controllers/songs';
import auth from '../middleware/auth';

const router = Router();

router.post('/', auth, c.createSong);
router.get('/metrics', auth, c.getMetrics);
router.get('/:songId', c.getSong);
router.get('/', c.getSongs);
router.patch('/:songId', auth, c.updateSong);
router.delete('/:songId', auth, c.deleteSong);

export default router;
