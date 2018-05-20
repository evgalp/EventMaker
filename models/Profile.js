const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "usersCollection"
  },
  name: {
    type: String,
    required: true
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
      event: {
        type: Schema.Types.ObjectId,
        ref: "eventsCollection"
      }
    }
  ]
});

module.exports = Profile = mongoose.model("profileCollection", ProfileSchema);
