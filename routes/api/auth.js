const express = require("express");
const router = express.Router();

// User model
const User = require("../../models/User");

// Routes for user

// @route  GET api/users/test
// @desc   Test users route
// @access Public
router.get("/test", (req, res) => res.json({ msg: "users route test" }));

// @route  POST api/users/register
// @desc   Register user
// @access Public

// @route  GET api/users/login
// @desc   Log in user
// @access Public

// @route  GET api/users/current
// @desc   Get current user
// @access Private

module.exports = router;
