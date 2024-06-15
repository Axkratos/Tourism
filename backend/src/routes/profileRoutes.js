import express from 'express';
import { createProfile, getProfiles } from '../controllers/profileControllers.js';


const router = express.Router();

router.post('/create', createProfile);
router.get('/get', getProfiles);


export default router ;