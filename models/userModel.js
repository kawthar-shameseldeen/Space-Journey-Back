import mongoose, { Schema } from "mongoose";
import { iotSchema } from "../schemas/iotSchema.js";
import bcrypt from "bcrypt";
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

  timeStamp: {
    type: Date,
    default: Date.now,
  },
});
