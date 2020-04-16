const express = require("express");

const { db } = require("./../database/db");
const taskRoute = require("./../routes/tasks");

const app = express();

const port = process.env.PORT || 6543;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", express.static(__dirname + "./../public"));

app.use("/tasks", taskRoute);

db.sync()
  .then(() => {
    app.listen(port);
    console.log("Server Started.\nListening at " + port);
  })
  .catch((err) => {
    console.error(err);
  });
