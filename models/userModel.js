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


userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      return next();
    }
  
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (err) {
      return next(err);
    }
  });
  
  
userSchema.methods.generateAuthToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: '30d', 
    });
  };