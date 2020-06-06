import { Router } from 'express';
import * as c from '../controllers/services';

const router = Router();

router.post('/', c.createService);
router.get('/:serviceId', c.getService);
router.get('/', c.getServices);
router.patch('/:serviceId', c.updateService);
router.delete('/:serviceId', c.deleteService);

export default router;
