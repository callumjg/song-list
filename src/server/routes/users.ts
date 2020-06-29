import { Router } from 'express';
import * as c from '../controllers/users';

const router = Router();

router.post('/', c.register);
router.post('/login', c.login);
router.get('/auth/refresh', c.authRefresh);
export default router;
