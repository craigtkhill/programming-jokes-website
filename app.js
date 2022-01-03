const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/programming-jokes.html");
});

app.get("/joke", (req, res) => {
  const jokeUrl = "https://v2.jokeapi.dev/joke/Programming?type=twopart";

  https.get(jokeUrl, (response) => {
    console.log(response.statusCode);

    response.on("data", (data) => {
      const joke = JSON.parse(data);
      const setup = joke.setup;
      const delivery = joke.delivery;
      res.write(`<h1>${setup}</h1><h2>${delivery}</h2>`);
      res.send();
    });
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
