const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "usersrecords"
  },
  name: {
    type: String,
    required: true
  },
  profilePic: {
    type: String
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  interests: {
    type: [String]
  },
  bio: {
    type: String
  },
  events: [
    {
      eventId: {
        type: Schema.Types.ObjectId,
        ref: "eventsrecords"
      }
    }
  ]
});

module.exports = Profile = mongoose.model("profilerecords", ProfileSchema);
