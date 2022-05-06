import express from "express";
const router = express.Router();
import { 
  addQuestion, 
  deleteQuestion, 
  editQuestion,
  getQuestions,
  hideQuestion
} from "../controllers/questionAnswerController";

router.post('/add', addQuestion)
router.get('/all', getQuestions)
router.get("/delete/:id", deleteQuestion);
router.put("/edit/:id", editQuestion);
router.put("/hide/:id", hideQuestion);

export default router;
