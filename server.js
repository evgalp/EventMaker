const express = require("express");
const mongoose = require("mongoose");
const bodyPareser = require("body-parser");

const app = express();

// Body parser
app.use(bodyPareser.urlencoded({ extended: false }));
app.use(bodyPareser.json());

// Database connect
const dbUrl = require("./config/config").mongoUrl;

mongoose
  .connect(dbUrl)
  .then(() => console.log("Database connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("sss"));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is up on port ${port}`));
