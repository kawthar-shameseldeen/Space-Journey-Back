import mongoose, { Schema } from "mongoose";
const tourSchema = new Schema({
    
    currentPosition: {
           
          },
        
})
export  const Tour = mongoose.model("Tour", tourSchema)