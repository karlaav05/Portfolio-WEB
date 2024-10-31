const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
const apiKey = "14990a52bec222334ea341f5fc843b61"; // Replace with your OpenWeatherMap API key

app.use(bodyParser.urlencoded({ extended: true }));

// Serve the form page
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// Handle form submission
app.post("/", (req, res) => {
    const city = req.body.cityName;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    https.get(url, (response) => {
        let data = "";

        // Handle response data
        response.on("data", (chunk) => {
            data += chunk;
        });

        // Complete response handling
        response.on("end", () => {
            if (response.statusCode === 200) {
                try {
                    const weatherData = JSON.parse(data);
                    const temp = weatherData.main.temp;
                    const description = weatherData.weather[0].description;
                    const icon = weatherData.weather[0].icon;
                    const imageUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

                    res.write("<h1>Weather Report</h1>");
                    res.write(`<h2>Temperature in ${city}: ${temp}°C</h2>`);
                    res.write(`<p>Description: ${description}</p>`);
                    res.write(`<img src="${imageUrl}" alt="${description}">`);
                    res.write('<br><a href="/">Back to Home</a>');
                    res.send();
                } catch (error) {
                    res.write("<h1>Error processing data.</h1>");
                    res.write('<br><a href="/">Back to Home</a>');
                    res.send();
                }
            } else {
                res.write("<h1>City not found or other error. Please try again.</h1>");
                res.write('<br><a href="/">Back to Home</a>');
                res.send();
            }
        });
    }).on("error", (e) => {
        res.write("<h1>Error connecting to weather service. Please try again.</h1>");
        res.write('<br><a href="/">Back to Home</a>');
        res.send();
    });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000.");
});
