const express=require("express")
const { login, signup, resendmail, changemail } = require("../controllers/Auth")
const { auth } = require("../middlewares/auth")

const router=express.Router()

router.post("/login",login)
router.post("/signup",signup)
router.get("/resendmail",auth,resendmail)
router.put("/changemail",auth,changemail)

module.exports=router