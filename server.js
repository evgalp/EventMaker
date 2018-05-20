const express = require("express");
const mongoose = require("mongoose");
const bodyPareser = require("body-parser");

// Routes import
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const events = require("./routes/api/events");

// Server init
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

// Routes use
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/events", events);

// Port use
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is up on port ${port}`));
