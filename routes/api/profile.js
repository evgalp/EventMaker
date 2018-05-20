const express = require("express");
const router = express.Router();

// Profile model
const Profile = require("../../models/Profile");

// Routes for Profile

// @route  GET api/profile/test
// @desc   Test Profiles route
// @access Public
router.get("/test", (req, res) => res.json({ msg: "profile route test" }));

// @route  GET api/profile/
// @desc   Get current user profile
// @access Private

// @route  GET api/profile/user/:user_id
// @desc   Get user profile by user id
// @access Public

// @route  POST api/profile/
// @desc   Create or edit user profile
// @access Private

// @route  DELETE api/profile/
// @desc   Delete both current user and user profile
// @access Private

module.exports = router;
