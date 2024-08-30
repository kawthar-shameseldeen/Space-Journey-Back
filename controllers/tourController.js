import {Tour} from "../models/tourModel.js";

export const createTour =async(req,res)=>{
    try{
        const tour =new Tour(req.body);
        await tour.save();
        res.status(201).json(tour);

    }
    catch(error){
        res.status(500).json({ message: "Error creating tour", error });
    
    }
}
export const getAllPositions=async(req,res)=>{
    

}