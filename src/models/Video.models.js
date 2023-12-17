import mongoose from "mongoose"
import bcrypt from "bcrypt"
import { Jwt } from "jsonwebtoken";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"
const video = new mongoose.Schema({
    
        videoFile : {
            type : String,
            required : true,
        },
        thumbnail : {
            type : String,
            required : true,
        },
        title : {
            type : String,
            required : true,
        },
        description : {
            type : String,
            required : true,
        },
        duration : {
            type : String, required : true
        },
        isPublished:{
            type :Boolean,
            default : true 
        },
        Owner : {
            type : mongoose.Schema.type.ObjectId,
            ref : "User"
        } 
}, {timestamps : true})


video.plugin(mongooseAggregatePaginate)
export const videomodel = mongoose.model("videomodel", video);