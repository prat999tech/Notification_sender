import express from "express"
import cors from "cors";
const app=express()
app.use(cors({
    origin:process.env.CORS_ORIGIN, //cors humara middleware ke liye use hota ha or origin hume bta rha ha ki request kaha se aa rha 
    credential:true
}))
app.use(express.json({limit:"10kb"}))//here to add middleware we use ".use" function and here we are adding middleware to limit the size of the data that can be sent in the request
app.use(express.urlencoded({extended:false,limit:"10kb"}))
import notificationRouter from "./routes/notification.routes.js"
app.use("/api/v1/notification",notificationRouter)

export default app;
