import express from 'express';
import { get_users } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/get_users', get_users);

export default router;