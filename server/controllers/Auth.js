const User = require("../models/User");
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken');
const Profile = require("../models/Profile");
const mailSender = require("../utils/mailSender");

require('dotenv').config()

exports.signup=async(req,res)=>{

    try{
        // fetch data from request ki body
        const {name,username,email,password}=req.body;

        // validate krlo
        if(!name||!username||!email||!password){
                return res.status(401).json({
                    success:false,
                    message:"All fields are required",
                })
        }

        // check if user already exist
        const existingUser=await User.findOne({email});

        // if user already exist,then return a response
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:'User already registered',
            })
        }

        const existingUsername=await User.findOne({username});

        if(existingUsername){
            return res.status(400).json({
                success:false,
                message:'Username already exist'
            })
        }

        // Hash password
        const hashedPassword=await bcrypt.hash(password,10);

        console.log("before profiledetail")
        // create an entry in DB
        const profileDetails=await Profile.create({
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${name}`,
            location:null,
            whatbringsyou:null,
        })

        console.log("after profiledetail",profileDetails)

        const user=await User.create({
            name,
            username,
            email,
            password:hashedPassword,
            additionalDetails:profileDetails._id,
        });

        // return response successful
        res.status(200).json({
            success:true,
            message:'User registered successfully',
            user,
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"User cannot be registered,please try again",
        })
    }
}


// login
exports.login=async(req,res)=>{

    try{
        // fetch data from request ki body
        const{email,password}=req.body;

        // validate krlo
        if(!email||!password){
                return res.status(401).json({
                    success:false,
                    message:"All fields are required",
                })
        }

        // check if user already exist
        const user=await User.findOne({email}).populate("additionalDetails");

        // if user already exist,then return a response
        if(!user){
            return res.status(400).json({
                success:false,
                message:'User is not registered,please signup',
            })
        }

        // generate JWT,after password matching
        if(await bcrypt.compare(password,user.password)){
            const payload={
                email:user.email,
                id:user._id,
            }
            const token=jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"2h",
            })
            user.token=token;
            user.password=undefined;

            // create cookie and send response
            const options={
                expires:new Date(Date.now()+3*24*60*60*1000),
                httpOnly:true,
            }
            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"Logged in successfully",
            })
        }
        else{
           return res.status(401).json({
                success:false,
                message:'Password is incorrect',
            })
        }

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Login failure,please try again",
        })
    }
}


exports.resendmail=async(req,res)=>{
    try{
        const id=req.user.id;
        const user= await User.findById(id);
        const email=user?.email
        const mailResponse=await mailSender(email,"Confirmation email from Dribble",
            `<!DOCTYPE html>
            <html>
                <head>
                    <meta charset="UTF-8">
                    <title>Verification mail</title>
                    <style>
                        body{
                            background-color:#ffffff;
                            font-family:Arial,sans-serif;
                            font-size:16px;
                            line-height:1.4;
                            color:#333333;
                            margin:0;
                            padding:0;
                        }
                        .container{
                            max-width:600px;
                            margin:0 auto;
                            padding:20px;
                            text-align:center;
                            background-color:black;
                            color:white;
                            border-radius:10px;
                        }

                        .logo{
                            max-width:200px;
                            margin-bottom:20px;
                        }
                        .message{
                            font-size:18px;
                            font-weight:bold;
                            margin-bottom:20px;
                        }
                        .body{
                            font-size:16px;
                            margin-bottom:20px;
                        }
                        .support{
                            color:#999999;
                            font-size:14px;
                            margin-top:20px;
                        }
                        .highlight{
                            font-weight:bold;
                        }
                        .click{
                            background-color:#0000ff;
                            color:white;
                            padding:10px;
                            text-align:center;
                            cursor:pointer;
                            margin-bottom:10px;
                        }
                    </style>
                </head>

                <body>
                    <div class="container">
                        <div class="message">Verification Email</div>
                        <div class="body">
                            <p>Dear User,</p>
                            <p>Thank you for registering with Dribble. To complete your registration, please 
                            click the below link:
                            </p>
                            <a href="https://dribble-sable.vercel.app/dribble">
                                <button class="click">Click and Verify</button>
                            </a>
                            <p>
                                Once your account is verified, you will have access to our platform and its features.
                            </p>
                        </div>
                        <div class="support">
                            If you have any questions or need further assistance,please feel free to reach at
                            <a href="mailto:info@dribble.com">info@dribble.com</a>. We are here to help!
                        </div>
                    </div>
                </body>
            </html>`
        );
        console.log("Email sent successfully",mailResponse);
        res.status(200).json({
            success:true,
            message:"Mail sent successfully"
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Error sending mail"
        })
    }
}


exports.changemail=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const id=req.user.id;

        const hashedPassword=await bcrypt.hash(password,10);

        const updatedDetails=await User.findByIdAndUpdate(
            {_id:id},
            {email:email,password:hashedPassword},
            {new:true}
        ).populate('additionalDetails').exec()

        res.status(200).json({
            success:true,
            updatedDetails,
        })


    }catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Failed to change email"
        })
    }
}