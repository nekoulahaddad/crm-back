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
  addClient,
} from "../controllers/userController.js";

router.get("/insertClient", insertClient);
router.get("/insertAdmin", insertAdmin);
router.get("/insertPartner", insertPartner);
router.get("/addClient", addClient);
router.get("/all", getUsersByRole);
router.get("/allByShop/:shopId", getClientsForOneShop);
router.put("/edit/:id", editUser);
router.get("/get/:id", getUserById);
router.get("/delete/:id", deleteUser);

export default router;
