import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  liveStreamUrl: { type: String },
  notificationSent: { type: Boolean, default: false },
});


export default EventSchema;
