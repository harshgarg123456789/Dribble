const express=require("express")
const { auth } = require("../middlewares/auth")
const { updateProfile, updateDisplayPicture, getAllUserDetails } = require("../controllers/Profile")
const router=express.Router()

router.put("/updateProfile",auth,updateProfile)
router.put("/updateDIsplayPicture",auth,updateDisplayPicture)
router.get("/getUserDetails",auth,getAllUserDetails)

module.exports=router