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
          lightState: {
                brightness: Number,
                color: String,
                status: { type: String, enum: ['on', 'off'], default: 'off' },
              },
              
        
        
}, { timestamps: true })
export  const Tour = mongoose.model("Tour", tourSchema)
export default  Tour;