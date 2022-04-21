import { Country } from "../models/country.js";
import { Region } from "../models/region.js";
import { City } from "../models/city.js";
import { countries } from "../data/countries.js";
import { regions } from "../data/regions.js";
import { cities } from "../data/cities.js";
import mongoose from "mongoose";
const { Types } = mongoose;

export const insertCountries = async (req, res) => {
  try {
    const newCountries = await Country.insertMany(countries);
    res.status(200).send({
      status: "ok",
      message: newCountries,
    });
  } catch (err) {
    res.status(500).send({
      status: "error",
      message: err.message,
    });
  }
};

export const insertRegions = async (req, res) => {
  try {
    const newRegions = await Region.insertMany(regions);
    res.status(200).send({
      status: "ok",
      message: newRegions,
    });
  } catch (err) {
    res.status(500).send({
      status: "error",
      message: err.message,
    });
  }
};

export const insertCities = async (req, res) => {
  try {
    const country = await Country.findOne({ name: "Россия" });

    const getAllCities = async () => {
      const citiesWithObjectId = cities.map(async (city) => {
        const region = await Region.findOne({ name: city.regionName });
        city.region_id = region._id;
        city.country_id = country._id;
        delete city.regionName;
        return city;
      });
      return await Promise.all(citiesWithObjectId);
    };
    let allCities = await getAllCities();
    const newCities = await City.insertMany(allCities);
    res.status(200).send({
      status: "ok",
      message: newCities,
    });
  } catch (err) {
    res.status(500).send({
      status: "error",
      message: err.message,
    });
  }
};

export const getCountries = async (req, res) => {
  const { searchTerm } = req.query;
  RegExp.quote = function (str) {
    return str.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
  };
  let regex = new RegExp(RegExp.quote(searchTerm), "gi");
  try {
    let countries = await Country.find({ value: regex })
      .sort({ value: 1 })
      .limit(5)
      .exec();
    res.status(200).send({
      status: "ok",
      message: countries,
    });
  } catch (err) {
    res.status(500).send({
      status: "error",
      message: err.message,
    });
  }
};

export const getCities = async (req, res) => {
  const { searchTerm } = req.query;
  RegExp.quote = function (str) {
    return str.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
  };
  let regex = new RegExp(RegExp.quote(searchTerm), "gi");
  try {
    let cities = await City.find({ value: regex })
      .sort({ value: 1 })
      .limit(5)
      .exec();
    res.status(200).send({
      status: "ok",
      message: cities,
    });
  } catch (err) {
    res.status(500).send({
      status: "error",
      message: err.message,
    });
  }
};
