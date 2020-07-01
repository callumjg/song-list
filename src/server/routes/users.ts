import { Router } from 'express';
import * as c from '../controllers/users';
import auth from '../middleware/auth';

const router = Router();

router.post('/', c.register);
router.post('/login', c.login);
router.get('/auth/refresh', c.authRefresh);
router.get('/me', auth(), c.getProfile);
router.get('/auth/logout', c.logout);

export default router;
