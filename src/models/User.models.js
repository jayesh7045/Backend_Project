import mongoose from "mongoose";
import { Jwt } from "jsonwebtoken";
import bcrypt from "bcrypt"
const User = new mongoose.Schema({
    username : {
        required: true,
        type:String, 
        unique : true,
        lowercase : true,
        trim : true,
        index : true 
    },
    email : {
        type : String,
        required:true,
        unique : true,
        lowercase : true,
        trim : true
    },
    FullName : {
        required: true,
        type:String, 
        index : true,
        trim : true
    },
    avatar : {
        type : String, // cloudinary url
        required:true,

    },
    coverImage : {
        type : String // cloudinary url
    },
    watchHistory : [{
        type : mongoose.Schema.type.ObjectId,
        ref : "Video"
    }],
    password : {
        type : String, 
        required : [true, "Password is required"],

    },
    refreshTokes : {
        type : String
    }
}, {timestamps : true});


User.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password) 
}
User.pre("Save", async function(){
    if(this.isModified("password")){
        this.password = bcrypt.hash(this.password)
    }
    next();
})

User.methods.generateAccessToken= function(){
    return jwt.sign(
        {
            _id : this._id,
            name : this.name,
            email : this.email,
            username : this.username,
            fullname : this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET, 
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

User.methods.generateRefreshToken= function(){
    return jwt.sign(
        {
            _id : this._id,
        },
        process.env.REFRESH_TOKEN_SECRET, 
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const usermodel = mongoose.model("usermodel", User);
