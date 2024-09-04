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
    
  };
  
export default{
    createTour,
    getAllPositions,
    getPosition,
   
    updateTour
}