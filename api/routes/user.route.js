import express from 'express';
import { get_users, updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/get_users', get_users);
router.post('/update/:id', verifyToken, updateUser);

export default router;