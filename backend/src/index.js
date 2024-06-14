// Import required modules
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import database from './db/database.js';
import userRoutes from './routes/userRoutes.js';
import tripRoutes from './routes/tripRoutes.js';
import kycRoutes from './routes/kycRoutes.js';

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Connect to database
database();

// Middleware to parse incoming requests
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));

// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));

// Routes
app.use("/api/user", userRoutes);
app.use("/api/trip", tripRoutes);
app.use("/api/kyc", kycRoutes);

// Define the port to listen on
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Export the app if needed for testing or other modules
export { app };
