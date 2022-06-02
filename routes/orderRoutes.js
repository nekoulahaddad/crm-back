import express from "express";
const router = express.Router();
import {
  insertOrders,
  getOrders,
  getOrdersForOneShop,
  deleteOrder,
  getOrdersByClientId,
  getOrderById,
  editOrder,
} from "../controllers/orderController.js";

router.get("/insertOrder", insertOrders);
router.get("/all", getOrders);
router.get("/allForOneShop/:shopId", getOrdersForOneShop);
router.get("/allByClient/:clientId", getOrdersByClientId);
router.get("/delete/:id", deleteOrder);
router.get("/get/:id", getOrderById);
router.put("/edit/:id", editOrder);

export default router;
