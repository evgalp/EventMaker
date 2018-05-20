const express = require("express");
const router = express.Router();

// Event model
const Event = require("../../models/Event");

// Routes for events

// @route  GET api/events/test
// @desc   Test events route
// @access Public
router.get("/test", (req, res) => res.json({ msg: "events route test" }));

// @route  GET api/events/all
// @desc   Get all events
// @access Public

// @route  GET api/events/event/:event_id
// @desc   Get event by event id
// @access Public

// @route  POST api/events/new
// @desc   Create or update event
// @access Private

// @route  DELETE api/events/event/:event_id
// @desc   Delete event by event id
// @access Private

module.exports = router;
