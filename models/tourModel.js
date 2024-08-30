import mongoose, { Schema } from "mongoose";
const tourSchema = new Schema({
    
    currentPosition: {
            coordinates: {
            
            },
         
          },
        
})
export  const Tour = mongoose.model("Tour", tourSchema)