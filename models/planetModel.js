import mongoose,{Schema,Types} from "mongoose";

export const planetSchema=new Schema({
    name:{
        type:String,
        required: true
    },
});