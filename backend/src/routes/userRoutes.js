import {signupUser, loginUser, logoutUser, getAllUsers, getUserById 
} from "../controllers/userControllers.js";
import express from "express";
import { protectedRoutes } from "../middlewares/protectedRoutes.js";
const router = express.Router();

router.post("/signup",signupUser);
router.post("/login",loginUser);
router.get("/alluser",getAllUsers)
router.get("/users/:id",getUserById)
router.post("/logout",protectedRoutes,logoutUser);

export default router;