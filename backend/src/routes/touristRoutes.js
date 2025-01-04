import express from 'express';
import cors from 'cors';
import { signupTourist, loginTourist, logoutTourist } from '../controllers/touristControllers.js';

const router = express.Router();

router.use(cors());
// POST /api/tourists/signup
router.post('/signup', signupTourist);

// POST /api/tourists/login
router.post('/login', loginTourist);

// POST /api/tourists/logout
router.post('/logout', logoutTourist);

export default router;
