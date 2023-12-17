import connectDB from "./db/dbindex.js";
import { app } from "./app.js";
import dotenv from "dotenv"


dotenv.config({
    path : './env'
})

connectDB()
.then(()=>{
    app.on("error", (err)=>{
        console.log("There is an ", err);
        throw err;
    })
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`Server is running at port ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("MongoDB connection failed !!!", err);
})

