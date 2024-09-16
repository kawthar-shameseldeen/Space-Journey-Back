import {Tour} from "../models/tourModel.js";
import {wss} from "../server.js";
export const createTour =async(req,res)=>{
    try{
        const tour =new Tour(req.body);
        await tour.save();
        res.status(201).json(tour);

    }
    catch(error){
        res.status(500).json({ message: "Error creating tour", error });
    
    }
};
export const getAllPositions=async(req,res)=>{
    try{
        const tour =await Tour.find();
        res.status(200).json(tour);
        
    }
    catch(error){
        res.status(500).json({ message: "Error getting tour", error });
    }
};

export const getPosition =async(req,res)=>{
    try{
        const tour =await Tour.findById(req.params.id);
        res.status(200).json(tour);

    }
    catch(error){
        res.status(500).json({ message: "Error getting tour by id", error });

    }
}


export const updateTour = async (req, res) => {
    try {
    
      if (!tour) {
        return res.status(404).json({ message: "Tour not found" });
      }
  
      
      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          try {
            client.send(JSON.stringify({
              action: 'update_light',
              data: {
                brightness: tour.lightState.brightness,
                color: tour.lightState.color,
                status: tour.lightState.status,
              }
            }));
          } catch (err) {
            console.error("Error sending WebSocket message:", err);
          }
        }
      });
  
      res.status(200).json(tour);
    } catch (error) {
        console.error("Error details:", error);
      res.status(500).json({ message: "Error updating tour", error });
    }
  };
  
export default{
    createTour,
    getAllPositions,
    getPosition,
   
    updateTour
}