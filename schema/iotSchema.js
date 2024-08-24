import mongoose, { Schema, Types } from "mongoose";

export const iotSchema = new Schema({
    deviceName: String,
    status: {
        type: String,
        enum: ["on", "off"], 
        required: true, 
      },
});