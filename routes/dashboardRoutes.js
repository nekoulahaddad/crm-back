import express from "express";
const router = express.Router();
import {
  getDataForDashboard,
  getCurrentMonthStats,
  getRecentlySoldProducts
} from "../controllers/dashboardController.js";

router.get("/dataForDashboard", getDataForDashboard)
router.get("/currentMonthStats", getCurrentMonthStats)
router.get("/recentlySoldProducts", getRecentlySoldProducts)

export default router;
