const express = require("express");
const router = express.Router();

// User model
const User = require("../../models/User");

// Input validators
const validateRegisterInput = require("../../validation/register");

// Routes for user

// @route  GET api/users/test
// @desc   Test users route
// @access Public
router.get("/test", (req, res) => res.json({ msg: "users route test" }));

// @route  POST api/users/register
// @desc   Register user
// @access Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "This email is already taken";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      newUser
        .save()
        .then(user => res.json(user))
        .catch(err => console.log(err));
    }
  });
});

// @route  GET api/users/login
// @desc   Log in user
// @access Public

// @route  GET api/users/current
// @desc   Get current user
// @access Private

module.exports = router;
