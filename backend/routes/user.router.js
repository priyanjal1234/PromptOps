import express from "express";
import { getLoggedinUser, loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login",loginUser)

router.get("/logout",logoutUser)

router.get("/profile",authMiddleware,getLoggedinUser)

export default router;
