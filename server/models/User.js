const mongoose=require('mongoose')
const mailSender = require('../utils/mailSender');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    username:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
        trim:true,
    },
    token:{
        type:String,
    },
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Profile"
    }
})

async function sendVerificationEmail(email){
    try{
        const mailResponse=await mailSender(email,"Verification email from Dribble","You have signed up successfully to Dribble");
        console.log("Email sent successfully",mailResponse);
    }catch(error){
        console.log("error occured while sending mail",error);
        throw error;
    }
}

userSchema.post("save",async function(){
    await sendVerificationEmail(this.email);
})

module.exports=mongoose.model("User",userSchema)