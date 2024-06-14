import express from 'express';
import { createKYC } from '../controllers/kycControllers.js';
import uploadImages from '../middlewares/multerMiddlewares.js';

const router = express.Router();

router.post('/create', uploadImages,createKYC);


export default router ;
