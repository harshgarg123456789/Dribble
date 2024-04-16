const express=require('express')
const { dbConnection } = require('./config/database')
const app=express()

const userRoutes=require("./routes/User");
const profileRoutes=require("./routes/Profile");

const cookieParser=require("cookie-parser");
const cors=require("cors");
const {cloudinaryConnect}=require("./config/cloudinary");
const fileUpload=require("express-fileupload");

require('dotenv').config()

app.use(express.json())
app.use(cookieParser());
app.use(
    cors({
        origin:"http://localhost:3000",
        credentials:true,
    })
)
app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp",
    })
)

// cloudinary connection
cloudinaryConnect();

// routes
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile",profileRoutes);


const PORT=process.env.PORT
app.listen(PORT,()=>{
    console.log(`App is running successfully at ${PORT}`)
})

dbConnection()

app.get('/',(req,res)=>{
    res.send('Default route')
})