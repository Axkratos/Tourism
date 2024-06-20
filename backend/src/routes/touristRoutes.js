import express from 'express';
import cors from 'cors';
import { signupTourist, loginTourist, logoutTourist } from '../controllers/touristControllers.js';

const router = express.Router();

// CORS configuration
const corsOptions = {
  origin: '*', // Allow all origins
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type, Authorization',
};

// Apply CORS middleware to each route
router.use(cors(corsOptions));

// POST /api/tourists/signup
router.post('/signup', cors(corsOptions), signupTourist);

// POST /api/tourists/login
router.post('/login', cors(corsOptions), loginTourist);

// POST /api/tourists/logout
router.post('/logout', cors(corsOptions), logoutTourist);

export default router;
