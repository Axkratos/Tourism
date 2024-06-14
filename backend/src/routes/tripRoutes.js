import express from 'express';
import { createTrip, getTrips } from '../controllers/tripControllers.js';

const router = express.Router();

router.post('/create', createTrip);
router.get('/get', getTrips);


export default router ;
