const mongoose=require('mongoose')
require('dotenv').config()

exports.dbConnection=()=>{
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(console.log("DB connection successful"))
    .catch((error)=>{
        console.log(error)
        console.log("DB connection issues")
        process.exit(1)
    })
}

exports.connect=()=>{
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(console.log("DB connection successful"))
    .catch((error)=>{
        console.log("DB connection issues");
        console.error(error);
        process.exit(1);
    })
}