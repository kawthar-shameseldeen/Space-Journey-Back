import mongoose, { Schema } from "mongoose";
import { iotSchema } from "../schemas/iotSchema.js";
import bcrypt from "bcrypt";
const userSchema = new Schema({

    username: {
        type: String,
        unique: true,
        required: true,
      },
});