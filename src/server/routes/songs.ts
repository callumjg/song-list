import { Router } from 'express';
import * as c from '../controllers/songs';
import auth from '../middleware/auth';
import clientCache from '../middleware/clientCache';

const router = Router();
const week = 60 * 60 * 24 * 7;
const month = week * 4;

router.post('/', auth(['admin']), c.createSong);
router.get('/metrics', c.getMetrics);
router.get('/:songId', clientCache(week), c.getSong);
router.get('/', clientCache(month), c.getSongs);
router.patch('/:songId', auth(['admin']), c.updateSong);
router.delete('/:songId', auth(['admin']), c.deleteSong);

export default router;
