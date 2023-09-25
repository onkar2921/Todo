const express=require("express")
const route=express.Router()
const {createUserController}=require("../controller/userController")

route.post("/api/createUser",createUserController)


module.exports=route