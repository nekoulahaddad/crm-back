import express from "express";
const router = express.Router();
import { addQuestion } from "../controllers/questionAnswerController";

router.post('/add', addQuestion)

export default router;
