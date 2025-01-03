import express from "express";
import cors from "cors";
import {
  getProfileData,
  updateProfileData,
  createProfileData,
  getProfileDataW
} from "../controllers/profileController.js";
import uploadImages from '../middlewares/multerMiddlewares.js';

const router = express.Router();



// Define routes
router.get("/profile/:email", getProfileData);
router.get("/profile", getProfileDataW);
router.post("/profile", createProfileData);
router.post("/changedata/:email", updateProfileData);

export default router;
