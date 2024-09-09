import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  liveStreamUrl: { type: String },
  notificationSent: { type: Boolean, default: false },
});

const Event = mongoose.model("Event", eventSchema);

export default Event;
