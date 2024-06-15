import { addReview} from "../controllers/reviewController.js";
import { protectedRoutes } from "../middlewares/protectedRoutes.js";
import express from "express";

const router = express.Router();
router.post("/add",protectedRoutes,addReview);

export default router;
