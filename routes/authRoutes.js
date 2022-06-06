import express from "express";
import {
  loginUser,
  logoutUser,
  testAuth,
  refreshToken,
} from "../controllers/authController.js";
import { auth, checkPartner } from "../middlewares/auth.js";
const router = express.Router();

router.post("/login", loginUser);
router.get("/logout/:id", logoutUser);
router.get("/refreshToken", refreshToken);
router.get("/testAuth", auth, testAuth);
router.get("/checkPartner", auth, checkPartner, testAuth);

export default router;
