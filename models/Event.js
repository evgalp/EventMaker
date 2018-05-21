const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "usersrecords"
  },
  title: {
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
  creator: {
    type: String,
    required: true
  },
  going: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "usersrecords"
      },
      userName: {
        type: String,
        ref: "usersrecords"
      }
    }
  ]
});

module.exports = Event = mongoose.model("eventsrecords", EventSchema);
