import { Router } from 'express';
import * as c from '../controllers/services';

const router = Router();

router.post('/', c.createService);
router.get('/:_id', c.getService);
router.get('/', c.getServices);
router.patch('/:_id', c.updateService);
router.delete('/:_id', c.deleteService);

export default router;
