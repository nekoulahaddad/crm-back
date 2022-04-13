import express from "express";
const router = express.Router();
import { insertOrders, getOrders, deleteOrder, getOrdersByClientId } from "../controllers/orderController.js";

router.get("/insert", insertOrders);
router.get("/all", getOrders);
router.get("/allByClient/:id", getOrdersByClientId);
router.get("/delete/:id", deleteOrder);

export default router;
