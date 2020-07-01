import { Router } from 'express';
import * as c from '../controllers/services';
import auth from '../middleware/auth';

const router = Router();

router.post('/', auth(), c.createService);
router.get('/:serviceId', c.getService);
router.get('/', c.getServices);
router.patch('/:serviceId', auth(), c.updateService);
router.delete('/:serviceId', auth(), c.deleteService);

export default router;
