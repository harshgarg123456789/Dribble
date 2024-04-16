const jwt=require('jsonwebtoken');
require('dotenv').config();

// auth
exports.auth=async(req,res,next)=>{
    try{
        // extract token
        const token=req.cookies.token||req.body.token||req.header("Authorization").replace("Bearer ","");

        // if token missing,then return response
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token is missing",
            })
        }

        // verify the token
        try{
            const decode=await jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);
            req.user=decode;
        }catch(err){
            // verification issue
            return res.status(401).json({
                success:false,
                message:"Token is invalid",
            })
        }
        next();
    }catch(error){
        // verification issue
        return res.status(401).json({
            success:false,
            message:"Something went wrong while validating the token",
        })
    }
}