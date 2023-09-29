const express=require("express")
const route=express.Router()
const {createUserController,loginController,getAllUserController,getUserDetail,addAvatarController}=require("../controller/userController")
const validateUser=require("../middlewares/authMiddleware")

const cloudinary=require("../middlewares/Cloudinary")
route.post("/api/createUser",createUserController)

route.post("/api/loginUser",loginController)
route.get("/api/getAllUser",validateUser,getAllUserController)
route.get("/api/getUser",validateUser,getUserDetail)


route.patch("/api/avatr",validateUser,addAvatarController)

module.exports=route