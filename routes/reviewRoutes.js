import express from "express";
import {
  addReview,
  addReply,
  editReview,
  deleteReview,
  getReviews
} from "../controllers/reviewController.js";
const router = express.Router();

router.get("/all/:shopId", getReviews);
router.post("/add", addReview);
router.put("/reply/:orderId", addReply);
router.put("/edit/:orderId", editReview);
router.get("/delete/:id", deleteReview);


export default router;
