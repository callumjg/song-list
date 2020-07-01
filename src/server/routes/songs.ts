import { Router } from 'express';
import * as c from '../controllers/songs';
import auth from '../middleware/auth';

const router = Router();

router.post('/', auth(['admin']), c.createSong);
router.get('/metrics', c.getMetrics);
router.get('/:songId', c.getSong);
router.get('/', c.getSongs);
router.patch('/:songId', auth(['admin']), c.updateSong);
router.delete('/:songId', auth(['admin']), c.deleteSong);

export default router;
