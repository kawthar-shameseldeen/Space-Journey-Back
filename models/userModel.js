import mongoose, { Schema } from "mongoose";
import { iotSchema } from "../schema/iotSchema.js";
import bcrypt from "bcrypt";
import Tour from "../models/tourModel.js";
import eventSchema from "../schema/eventSchema.js";
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },

  email: {
    type: String,
    unique: true,
    required: true, 
  },
  Location: {
    type: String,
    required: false,
  },

  password: {
    type: String,
    required: true,
    minlength: 8,
  },

  role: {
    type: String,
    required: true,
    enum: ["admin", "user"],
    default: "user",
  },

  iotDevices: {
    type: [iotSchema],
    default: [],
    select: false,
  },
  events: [eventSchema],

  notifications: [
    {
      message: String,
      date: { type: Date, default: Date.now },
      read: { type: Boolean, default: false },
    },
  ],

 
  timeStamp: {
    type: Date,
    default: Date.now,
  },
});

export  const User = mongoose.model("User", userSchema)