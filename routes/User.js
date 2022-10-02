import express from 'express';
import { createNewUser } from '../controllers/User.js';

const router = express.Router();

router.post("/register", createNewUser);

export default router;