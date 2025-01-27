// mongodb stores data in the form of BSON data

import mongoose, { Schema } from "mongoose";
const linkUpload=new mongoose.Schema({
    link:{
        type:String,
        required:true,
    },
    typeOfMaterial:{
        type:String,
        enum:["questionpaper","notes","referencebooks"],
        default:"quesPaper",
        required:true,
    },
    Class:{
        type:String,
        enum:["9th", "10th", "11th Science","11th Commerce", "12th Science","12th Commerce"],
        required:true,
    },
    subject:{
        type:String,
        required:true
    },
    chapter:{
        type:String,
        required:true
    }

},{timestamps:true})


export const Links=mongoose.model("Link",linkUpload)