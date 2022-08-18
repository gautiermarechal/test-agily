const express = require("express");
const app = express();
const port = 4000;
const fetch = require("node-fetch");
const NodeCache = require("node-cache");
const myCache = new NodeCache();
require("dotenv").config();
const cors = require("cors");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

app.use(cors());

const verifyCacheCityName = (req, res, next) => {
  try {
    const { cityName } = req.params;
    if (myCache.has(cityName)) {
      return res.status(200).json(myCache.get(cityName));
    }
    return next();
  } catch (err) {
    throw new Error(err);
  }
};

app.get("/cities/:name", verifyCacheCityName, (req, res) => {
  try {
    const cityName = req.params.name;
    const limit = req.query.limit;
    fetch(
      `${process.env.OPEN_WEATHER_API_URL}/geo/1.0/direct?q=${cityName}&appid=${process.env.OPEN_WEATHER_API_KEY}&limit=${limit}`
    )
      .then((response) => response.json())
      .then((json) => {
        myCache.set(cityName, json, 10000);
        res.json({ status: 200, data: json });
      })
      .catch((error) => {
        throw new Error(error);
      });
  } catch (error) {
    res.json({ status: 500, error });
  }
});

const verifyCacheWeather = (req, res, next) => {
  try {
    const { lat, lon } = req.params;
    if (myCache.has(lat + lon)) {
      return res.status(200).json(myCache.get(cityName));
    }
    return next();
  } catch (err) {
    throw new Error(err);
  }
};

app.get("/weather", verifyCacheWeather, (req, res) => {
  try {
    const lat = req.query.lat;
    const lon = req.query.lon;
    fetch(
      `${process.env.OPEN_WEATHER_API_URL}/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${process.env.OPEN_WEATHER_API_KEY}&units=metric`
    )
      .then((response) => response.json())
      .then((json) => {
        myCache.set(lat + lon, json);
        res.json({ status: 200, data: json });
      })
      .catch((error) => {
        throw new Error(error);
      });
  } catch (error) {
    res.json({ status: 500, error });
  }
});
