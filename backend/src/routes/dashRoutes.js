// routes/dashRoutes.js

import express from 'express';
import { createDash, getAllDash, getDashById, updateDashById } from '../controllers/dashControllers.js';

const router = express.Router();

// POST /api/dash/create - Create a new dash entry
router.post('/create', createDash);

// GET /api/dash/all - Get all dash entries
router.get('/alldash', getAllDash);

// GET /api/dash/:id - Get a specific dash entry by ID
router.get('dashid/:id', getDashById);

// PUT /api/dash/update/:id - Update a dash entry by ID
router.put('/update/:id', updateDashById);

export default router;
