import mongoose from "mongoose";
import { DB_Name } from "../constants.js";

const connectDB = async ()=>{
    try{
        const connectionAwait = await mongoose.connect(`${process.env.URL}/${DB_Name}`);
        console.log(`\n MongoDB connected !! DB Host : ${connectionAwait.connection.host}`)
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
}
export default connectDB



