import {Tour} from "../models/tourModel.js";

export const createTour =async()=>{
    try{
        const tour =new Tour(req.body);
        await tour.save();

    }
    catch(error){
    
    }
}