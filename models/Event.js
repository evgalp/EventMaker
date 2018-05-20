const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "usersrecords"
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
        ref: "usersrecords"
      }
    }
  ]
});

module.exports = Event = mongoose.model("eventsrecords", EventSchema);
