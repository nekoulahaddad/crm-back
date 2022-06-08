import express from "express";
const router = express.Router();
import {
  insertClient,
  insertAdmin,
  insertPartner,
  getUsersByRole,
  getClientsForOneShop,
  editUser,
  getUserById,
  deleteUser,
  addUser,
  getWatchedProducts
} from "../controllers/userController.js";
import { auth } from "../middlewares/auth";

router.get("/insertClient", insertClient);
router.get("/insertAdmin", insertAdmin);
router.get("/insertPartner", insertPartner);
router.post("/addUser", addUser);
router.get("/all", getUsersByRole);
router.get("/allByShop/:shopId", getClientsForOneShop);
router.put("/edit/:id", editUser);
router.get("/get/:id", getUserById);
router.get("/delete/:id", deleteUser);
router.get('/getWatchedProducts', auth, getWatchedProducts);

export default router;
