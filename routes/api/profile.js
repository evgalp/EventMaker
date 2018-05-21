const express = require("express");
const router = express.Router();
const passport = require("passport");

// Profile model
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// Validators
const validateProfileInput = require("../../validation/profile");

// Routes for Profile

// @route  GET api/profile/test
// @desc   Test Profiles route
// @access Public
router.get("/test", (req, res) => res.json({ msg: "profile route test" }));

// @route  GET api/profile/
// @desc   Get current user profile
// @access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let errors = {};

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);
// @route  GET api/profile/user/:user_id
// @desc   Get user profile by user id
// @access Public
router.get("/user/:user_id", (req, res) => {
  Profile.findOne({ user: req.params.user_id })
    .then(profile => {
      if (!profile || profile === {}) {
        errors.noprofile = "There is no profile for this user";
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({ profile: "There is no profile for this user" })
    );
});
// @route  POST api/profile/
// @desc   Create or edit user profile
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const profileData = {};
    profileData.user = req.user.id;
    profileData.name = req.user.name;
    profileData.dateOfBirth = req.body.dateOfBirth;
    if (typeof req.body.interests !== undefined) {
      profileData.interests = req.body.interests.split(",");
    }
    if (req.body.bio) {
      profileData.bio = req.body.bio;
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // Profile exists - update data
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileData },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // Profile not exists - crete data
        Profile.findOne({ user: req.user.id }).then(profile => {
          new Profile(profileData).save().then(profile => {
            res.json(profile);
          });
        });
      }
    });
  }
);

// @route  DELETE api/profile/
// @desc   Delete both current user and user profile
// @access Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

module.exports = router;
