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
  addPartner,
} from "../controllers/userController.js";

router.get("/insertClient", insertClient);
router.get("/insertAdmin", insertAdmin);
router.get("/insertPartner", insertPartner);
router.post("/addPartner", addPartner);
router.post("/addClient", addClient);
router.get("/all", getUsersByRole);
router.get("/allByShop/:shopId", getClientsForOneShop);
router.put("/edit/:id", editUser);
router.get("/get/:id", getUserById);
router.get("/delete/:id", deleteUser);

export default router;
