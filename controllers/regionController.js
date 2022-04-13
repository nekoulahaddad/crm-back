import { Region } from "../models/location/region.js";
import { Country } from "../models/location/country.js";
import { City } from "../models/location/city.js";
import { countries } from "../data/countries.js";
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

export const insertCity = async (req, res) => {
  try {
    const newCity = new City({
      value: "Санкт-Петербург",
      title: "Санкт-Петербург",
      country_id: Types.ObjectId("6245a6f4f28951f4dbeaac7f"),
    });
    const city = await newCity.save();
    res.status(200).send({
      status: "ok",
      message: city,
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
    let countries = await Country.find({ value: regex }).sort({ value: 1 }).limit(5).exec();
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
    let cities = await City.find({ value: regex }).sort({ value: 1 }).limit(5).exec();
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
