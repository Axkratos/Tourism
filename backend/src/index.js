// Import required modules
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import database from './db/database.js'; // Import your database initialization function
import userRoutes from './routes/userRoutes.js'; // Import your user routes
import tripRoutes from './routes/tripRoutes.js'; // Import other routes as needed
import kycRoutes from './routes/kycRoutes.js'; // Import other routes as needed
import touristRoutes from './routes/touristRoutes.js'; // Import other routes as needed

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Connect to database
database(); // Make sure this function initializes your database connection

// Middleware to parse incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
// CORS configuration
const corsOptions = {
  origin: 'http://localhost:5173', // Update with your frontend URL
  credentials: true, // Allow credentials (cookies, authorization headers)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow specified methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specified headers
};

app.use(cors(corsOptions));

// Handling preflight requests
app.options('*', cors(corsOptions));


// Routes
app.use('/api/user', userRoutes);
app.use('/api/trip', tripRoutes);
app.use('/api/kyc', kycRoutes);
app.use('/api/tourist', touristRoutes);

// Define the port to listen on
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Export the app if needed for testing or other modules
export { app };
