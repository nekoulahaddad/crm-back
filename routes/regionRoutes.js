import express from "express";
import { insertCountries, insertCity, getCountries, getCities } from "../controllers/regionController.js";
const router = express.Router();

router.get("/insertCountries", insertCountries);
router.get("/insertCity", insertCity);
router.get("/getCountries", getCountries);
router.get("/getCities", getCities);

export default router;
