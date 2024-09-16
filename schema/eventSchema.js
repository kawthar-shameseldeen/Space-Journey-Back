import mongoose, { Schema, Types } from "mongoose";

const eventSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  liveStreamUrl: { type: String },
  notificationSent: { type: Boolean, default: false },
});

export default eventSchema;
