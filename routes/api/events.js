const express = require("express");
const router = express.Router();
const passport = require("passport");

// Event model
const Event = require("../../models/Event");
const User = require("../../models/User");

// Vaidators
const validateEventInput = require("../../validation/event");

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
router.get("/event/:event_id", (req, res) => {
  Event.findOne({ _id: req.params.event_id })
    .then(event => {
      if (!event) {
        res.json({ error: "no such event" });
      } else {
        res.json(event);
      }
    })
    .catch(err => console.log(err));
});

// @route  POST api/events/new
// @desc   Create event
// @access Private
router.post(
  "/new",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEventInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newEvent = new Event({
      title: req.body.title,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      description: req.body.description,
      creator: req.user.name,
      going: [
        {
          userId: req.user.id,
          userName: req.user.name
        }
      ]
    });

    newEvent.save().then(event => res.json(event));
  }
);

// @route  POST api/events/subscribe/:event_id
// @desc   Subscribe to event
// @access Private
router.post(
  "/subscribe/:event_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Event.findByIdAndUpdate(req.params.event_id)
      .then(event => {
        if (
          event.going.filter(
            goingUser => goingUser.userId.toString() === req.user.id
          ).length > 0
        ) {
          return res.status(400).json({ alreadyliked: "You already going" });
        }

        event.going.push({
          userId: req.user.id,
          userName: req.user.name
        });
        event.save();
        return res.json(event);
      })
      .catch(err => console.log(err));
  }
);

// @route  DELETE api/events/event/:event_id
// @desc   Delete event by event id
// @access Private

module.exports = router;
