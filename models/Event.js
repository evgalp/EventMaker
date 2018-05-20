const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "usersCollection"
  },
  name: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date
  },
  description: {
    type: String,
    required: true
  },
  going: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "usersCollection"
      }
    }
  ]
});

module.exports = Event = mongoose.model("eventsCollection", EventSchema);
