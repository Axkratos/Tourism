import express from 'express';
import cors from 'cors';
import { getProfileData, updateProfileData } from '../controllers/profileController.js';

const router = express.Router();

// CORS configuration specific to /api/profile routes
const corsOptions = {
  origin: 'http://localhost:5173', // Update with your frontend URL
  credentials: true, // Allow cookies from frontend
  methods: ['GET', 'POST'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};

// Apply CORS middleware to router
router.use(cors(corsOptions));

// Define routes
router.get('/profile', getProfileData);
router.post('/profile', updateProfileData);

export default router;
