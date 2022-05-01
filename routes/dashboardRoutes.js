import express from "express";
const router = express.Router();
import {
  getDataForDashboard
} from "../controllers/dashboardController.js";

router.get("/getData", getDataForDashboard)
export default router;
