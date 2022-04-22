import express from "express";
const router = express.Router();
import { addStatus } from '../controllers/statusOrderController'

router.post('/add', addStatus)

export default router;
