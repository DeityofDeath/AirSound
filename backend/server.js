const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

const channelNumber = 2655099
const url = `https://api.thingspeak.com/channels/${channelNumber}/feeds.json?results=1`;


app.get('/api/data', async (req, res) => {
    try {
        const response = await axios.get(url);
        const feeds = response.data.feeds;

        if (feeds.length === 0) {
            return res.json({
                message: "No data available in ThingSpeak.",
                airQuality1: null,
                soundLevel1: null
            });
        }

        const airQuality1 = feeds[0].field1;
        const soundLevel1 = feeds[0].field2;
        const airQuality2 = feeds[0].field3;
        const soundLevel2 = feeds[0].field4;
        const co2level = feeds[0].field5;
        const colevel = feeds[0].field6;
        const nh4level = feeds[0].field7;
        const toulenelevel = feeds[0].field8;

        res.json({
            airQuality1,
            soundLevel1,
            airQuality2,
            soundLevel2,
            co2level,
            colevel,
            nh4level,
            toulenelevel
        });
    } catch (error) {
        console.error("Error fetching data from ThingSpeak", error);
        res.status(500).send("Error fetching data from ThingSpeak");
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
