import {Tour} from "../models/tourModel.js";

export const createTour =async()=>{
    try{
        const tour =new Tour(req.body);
        await tour.save();
        res.status(201).json(tour);

    }
    catch(error){
    
    }
}