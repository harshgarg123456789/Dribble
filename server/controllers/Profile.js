const User = require("../models/User");
const Profile = require("../models/Profile");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

exports.updateProfile=async(req,res)=>{
    try{
        // get data
        const{location="",interest=""}=req.body;
        console.log("req body",req.body)
        console.log("location is",location)
        console.log("whatbringsyou is",interest)
        // get userId
        const id=req.user.id;

        // find profile
        const userDetails=await User.findById(id);
        const profileId=userDetails.additionalDetails;
        const profileDetails=await Profile.findById(profileId);

        // update profile
        if(location) profileDetails.location=location;
        if(interest) profileDetails.whatbringsyou=interest;
        console.log(profileDetails)
        await profileDetails.save();

        // return response
        return res.status(200).json({
            success:true,
            message:'Profile updated successfully',
            data:profileDetails,
        })
    }catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:'Failed to update profile',
            error:error.message,
        })
    }
}


exports.updateDisplayPicture=async(req,res)=>{
    try{
        const userId=req.user.id;
        console.log(userId)
        const userDetails=await User.findById({_id:userId}).populate("additionalDetails");
        console.log(userDetails)
        // const profileId=userDetails.additionalDetails;
        // const profileDetails=await Profile.findById(profileId);
        // const oldurl=profileDetails.image;
        const oldurl=userDetails.additionalDetails.image;
        console.log(oldurl)
        console.log("req files",req.files)
        const updatedImage=req.files.displayPicture;
        console.log(updatedImage)
        const uploadDetails=await uploadImageToCloudinary(updatedImage,process.env.FOLDER_NAME);
        console.log(uploadDetails.secure_url)
        console.log(userDetails.additionalDetails._id)
        const updatedProfile=await Profile.findByIdAndUpdate(
            {_id:userDetails.additionalDetails._id},
            {
                image:uploadDetails.secure_url,
            },
            {new:true}
        )
        res.status(200).json({
            success:true,
            data:updatedProfile
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Profile picture can not be updated"
        })
    }
}

exports.getAllUserDetails=async(req,res)=>{
    try{
        // get id
        const id=req.user.id;
        console.log(id)

        // validation
        const userDetails=await User.findById({_id:id})
        .populate("additionalDetails").exec();
        
        // return response
        return res.status(200).json({
            success:true,
            data:userDetails,
            message:'User data fetched successfully',
        })
    }catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:'Failed to fetch user data',
            error:error.message,
        })
    }
}