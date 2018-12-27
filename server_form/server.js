var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/add", function(req, res) {
  const result = parseInt(req.query.a, 0) + parseInt(req.query.b, 0);
  res.send("Result= " + result);
});
app.post("/add", function(req, res) {
  console.log(req.body, req.query);
  const result = parseInt(req.body.a, 0) + parseInt(req.body.b, 0);
  res.send("Result= " + result);
});
app.get("/ping", function(req, res) {
  res.send({
    status: "ok",
    date: new Date()
  });
});
app.listen(8000);
