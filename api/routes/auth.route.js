import express from 'express';
import { signin, signup, singout } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/signout', singout);
export default router;