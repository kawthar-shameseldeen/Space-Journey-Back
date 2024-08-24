import mongoose from "mongoose";

export const databaseConnection = async()=>{
    try {
        await mongoose.connect(process.env.DATABASE_URL, {
          dbName: "Space", 
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
    
        console.log("Connected to database");
      
      } catch (error) {
        console.log(error);
    
        console.log("Failed to connect to database");
      }
}
export default databaseConnection;