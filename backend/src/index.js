// Import required modules
import express from "express";
import dotenv from "dotenv";
import http from "http";
import cors from "cors";
import database from "./db/database.js"; // Import your database initialization function
import userRoutes from "./routes/userRoutes.js"; // Import your user routes
import tripRoutes from "./routes/tripRoutes.js"; // Import other routes as needed
import kycRoutes from "./routes/kycRoutes.js"; // Import other routes as needed
import touristRoutes from "./routes/touristRoutes.js"; // Import other routes as needed
import dashRoutes from "./routes/dashRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import startSocket from "./socketLogic.js"; // Import socket logic module

// Load environment variables from .env file
dotenv.config();

// Initialize Express app and HTTP server
const app = express();
const server = http.createServer(app);

// Connect to database
database(); // Make sure this function initializes your database connection

// Middleware to parse incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration (allow all origins, methods, and headers)
app.use(cors({
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type, Authorization",
}));

// Handling preflight requests (OPTIONS method)
app.options("*", cors());

// Routes
app.use("/api/user", userRoutes);
app.use("/api/trip", tripRoutes);
app.use("/api/kyc", kycRoutes);
app.use("/api/tourist", touristRoutes);
app.use("/api/dash", dashRoutes);
app.use("/api/profile", profileRoutes);

// Start Socket.IO logic
const io = startSocket(server);

// Basic error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Define the port to listen on
const PORT = process.env.PORT || 3000;

// Start the combined server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
