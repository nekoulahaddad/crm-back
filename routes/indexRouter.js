import express from "express";
const router = express.Router();
import authRoutes from "../routes/authRoutes";
import userRoutes from "../routes/userRoutes.js";
import orderRoutes from "../routes/orderRoutes.js";
import regionRoutes from "../routes/regionRoutes.js";
import mainCategoryRoutes from "../routes/mainCategoryRoutes";
import categoryRoutes from "../routes/categoryRoutes";
import statusOrderRoutes from "../routes/statusOrderRoutes";
import questionAnswer from "../routes/questionAnswerRoutes";
import dasboardRoutes from "../routes/dashboardRoutes"
import reviewRoutes from "../routes/reviewRoutes"

router.use("/api/auth", authRoutes)
router.use("/api/user", userRoutes)
router.use("/api/order", orderRoutes)
router.use("/api/region", regionRoutes)
router.use('/api/mainCategory', mainCategoryRoutes)
router.use("/api/category", categoryRoutes)
router.use("/api/statusOrder/", statusOrderRoutes)
router.use("/api/questionAnswer/", questionAnswer)
router.use("/api/dashboard/", dasboardRoutes)
router.use("/api/review/", reviewRoutes)

export default router;
