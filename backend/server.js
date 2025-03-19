const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());

const channelNumber = 2655099;
const url = `https://api.thingspeak.com/channels/${channelNumber}/feeds.json?results=1`;

const dhtChannelNumber = 2522853;
const dhtUrl = `https://api.thingspeak.com/channels/${dhtChannelNumber}/feeds.json?results=1`;

app.get("/api/data", async (req, res) => {
  try {
    const [sensorResponse, dhtResponse] = await Promise.all([
      axios.get(url),
      axios.get(dhtUrl),
    ]);

    const feeds = sensorResponse.data.feeds;
    const dhtFeeds = dhtResponse.data.feeds;

    if (feeds.length === 0) {
      return res.json({
        message: "No sensor data available in ThingSpeak.",
        airQuality1: null,
        soundLevel1: null,
        airQuality2: null,
        soundLevel2: null,
        co2level: null,
        colevel: null,
        nh4level: null,
        toulenelevel: null,
      });
    }
    if (dhtFeeds.length === 0) {
      return res.json({
        message: "No DHT data available in ThingSpeak.",
        humidity: null,
        temperature: null,
      });
    }

    const airQuality1 = feeds[0].field1
      ? Math.round(parseFloat(feeds[0].field1))
      : null;
    const soundLevel1 = feeds[0].field2
      ? Math.round(parseFloat(feeds[0].field2))
      : null;
    const airQuality2 = feeds[0].field3
      ? Math.round(parseFloat(feeds[0].field3))
      : null;
    const soundLevel2 = feeds[0].field4
      ? Math.round(parseFloat(feeds[0].field4))
      : null;
    let co2level = feeds[0].field5 ? parseFloat(feeds[0].field5) : null;
    let colevel = feeds[0].field6 ? parseFloat(feeds[0].field6) : null;
    let nh4level = feeds[0].field7 ? parseFloat(feeds[0].field7) : null;
    let toulenelevel = feeds[0].field8 ? parseFloat(feeds[0].field8) : null;

    const humidityRaw = dhtFeeds[0].field1
      ? parseFloat(dhtFeeds[0].field1)
      : null;
    const temperature = dhtFeeds[0].field2
      ? parseFloat(dhtFeeds[0].field2)
      : null;

    const humidity = humidityRaw !== null ? humidityRaw / 100 : null;

    const alpha = 0.01;
    const beta = 0.02;
    const T_ref = 20;

    // Factor = (1 + alpha * (T - T_ref)) * (1 - beta * H)
    const correctionFactor =
      (1 + alpha * (temperature - T_ref)) * (1 - beta * humidity);

    if (co2level !== null)
      co2level = Math.round((co2level * correctionFactor) / 10);
    if (colevel !== null)
      colevel = Math.round((colevel * correctionFactor) / 5000);
    if (nh4level !== null)
      nh4level = Math.round((nh4level * correctionFactor) / 50);
    if (toulenelevel !== null)
      toulenelevel = Math.round((toulenelevel * correctionFactor) / 50);

    res.json({
      airQuality1,
      soundLevel1,
      airQuality2,
      soundLevel2,
      co2level,
      colevel,
      nh4level,
      toulenelevel,
      temperature: Math.round(temperature),
      humidity: Math.round(humidityRaw),
    });
  } catch (error) {
    console.error("Error fetching data from ThingSpeak", error);
    res.status(500).send("Error fetching data from ThingSpeak");
  }
});

app.get("/api/dht", async (req, res) => {
  try {
    const response = await axios.get(dhtUrl);
    const feeds = response.data.feeds;

    if (feeds.length === 0) {
      return res.json({
        message: "No data available in ThingSpeak.",
        humidity: null,
        temperature: null,
      });
    }

    const humidity = feeds[0].field1
      ? Math.round(parseFloat(feeds[0].field1))
      : null;
    const temperature = feeds[0].field2
      ? Math.round(parseFloat(feeds[0].field2))
      : null;

    res.json({
      humidity,
      temperature,
    });
  } catch (error) {
    console.error("Error fetching data from ThingSpeak", error);
    res.status(500).send("Error fetching data from ThingSpeak");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
