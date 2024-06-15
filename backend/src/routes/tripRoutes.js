import express from 'express';
import { createTrip, getTrips, getTripById } from '../controllers/tripControllers.js';

const router = express.Router();

router.post('/create', createTrip);
router.get('/get', getTrips);
router.get('/getbyid/:id', getTripById);

export default router ;
