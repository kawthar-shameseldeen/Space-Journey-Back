import mongoose, { Schema } from "mongoose";
const tourSchema = new Schema({
    
    currentPosition: {
            coordinates: {
              x: Number,
              y: Number,
              z: Number,
            },
            step: Number,
            rotation: {
              x: Number,
              y: Number,
              z: Number,
            },
          },
        
})
export  const Tour = mongoose.model("Tour", tourSchema)