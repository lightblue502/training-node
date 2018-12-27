const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const movieApis = require("./movieApi");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.send("Hello, World");
});

app.use("/api/movies", movieApis);

app.listen(3000, () => console.log("listening  http://localhost:3000"));
