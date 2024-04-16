const mongoose=require('mongoose')

const profileSchema=new mongoose.Schema({
    image:{
        type:String,
        trim:true,
    },
    location:{
        type:String,
        trim:true,
    },
    whatbringsyou:[{
        type:String,
    }],
})

module.exports=mongoose.model("Profile",profileSchema)