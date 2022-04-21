import express from "express";
import {
  insertCountries,
  insertCities,
  getCountries,
  getCities,
  insertRegions,
} from "../controllers/regionController.js";
const router = express.Router();

router.get("/insertCountries", insertCountries);
router.get("/insertRegions", insertRegions);
router.get("/insertCities", insertCities);
router.get("/getCountries", getCountries);
router.get("/getCities", getCities);

export default router;
