import express from "express";
import {
  loginAdmin,
  addAdmin,
  getAdmins,
  getAdmin,
  deleteAdmin,
  logoutAdmin,
  testAuth,
  refreshTokenAdmin,
} from "../controllers/authController.js";
import { auth } from "../middlewares/auth.js";
const router = express.Router();

router.post("/login", loginAdmin);
router.post("/addAdmin", addAdmin);
router.get("/all", getAdmins);
router.get("/get/:id", getAdmin);
router.get("/delete/:id", deleteAdmin);
router.get("/logout/:id", logoutAdmin);
router.get("/refreshToken", refreshTokenAdmin);
router.get("/testAuth", auth, testAuth);

export default router;
