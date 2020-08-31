import { Router } from 'express';
import moment from 'moment';
import * as c from '../controllers/services';
import auth from '../middleware/auth';
import clientCache from '../middleware/clientCache';

const router = Router();
const day = 60 * 60 * 24;
const week = day * 7;

const getMaxAge = (req) => {
  if (!req?.query?.year) return day;
  const currentYear = parseInt(moment().format('Y'));
  const requestedYear = parseInt(req?.query?.year);
  return requestedYear < currentYear ? week * 26 : day;
};

router.post('/', auth(), c.createService);
router.get('/:serviceId', clientCache(week), c.getService);
router.get('/', clientCache(getMaxAge), c.getServices);
router.patch('/:serviceId', auth(), c.updateService);
router.delete('/:serviceId', auth(), c.deleteService);

export default router;
