import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors"
const app = express();

app.use(cors({
    origin : process.env.CORS_ORIGIN, // The origins which we are allowing to access the server
    credentials : true 
}))
app.use(express.json({
    limit : "16kb"
}))
app.use(express.urlencoded({limit : "16kb"}));
app.use(express.static("public"));
app.use(cookieParser());

export {app}
// Express can not process the file input. But we can perform file processing using Multter which is a 3rd party application