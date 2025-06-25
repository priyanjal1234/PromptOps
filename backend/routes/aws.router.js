import express from "express";
import { getAssumedCredentials, processPrompt } from "../controllers/aws.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/get-assumed-creds", authMiddleware, getAssumedCredentials);

router.post("/prompt",authMiddleware,processPrompt)

export default router;
