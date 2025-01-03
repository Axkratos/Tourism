import express from 'express';
import { createTrip, getTrips,getTripsByGuideEmail } from '../controllers/tripControllers.js';

const router = express.Router();

router.post('/create', createTrip);
router.get('/get', getTrips);
router.get('/get/:email', getTripsByGuideEmail);


export default router ;
