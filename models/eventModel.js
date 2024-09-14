import mongoose, { Schema } from "mongoose";

const eventSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  liveStreamUrl: { type: String },
  notificationSent: { type: Boolean, default: false },
 
});

export const Event = mongoose.model("Event", eventSchema);
