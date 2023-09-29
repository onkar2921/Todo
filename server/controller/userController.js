const user=require("../modal/user")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
require("dotenv").config()




const getUserDetail=async(req,res)=>{
    try {
      
        const User=req.user
     
        const data=await user.findById(User.exist?._id)
        if(data){
            return res.status(200).json({message:"getting user",data})
        }
        return res.status(500).json({message:"failed in getting user"})
    } catch (error) {
        console.log(error)
    }
}

const createUserController=async(req,res)=>{
    try {

        const {name,email,password}=req.body

        const hashPwd=await  bcrypt.hashSync(password,12)



        const data=await user.create({name,email,password:hashPwd})

        if(data){

            console.log("user created sucessfully")
           return res.status(200).json({
            message: "user created",
            data: data, 
          });
        }
        return  res.status(500).json({"message":"failed int user creation"})

        
    } catch (error) {
        console.log(error)
    }
}



const loginController=async(req,res)=>{
    try {

        const {email,password}=req.body

        const exist=await user.find({email})
        console.log("exist",exist[0])

        if(exist){

            const checkPwd=await bcrypt.compareSync(password,exist[0]?.password)

            if (checkPwd){
                const token=await jwt.sign({id:exist._id,user:exist},process.env.SECREATE)


                return  res.status(200).json({message:"authinticated user",exist,token})
            }
            return  res.status(400).json({message:"unauthinticated user"})
        }else{
            return res.status(400).json({message:"unauth user"})
        }

        
    } catch (error) {
        console.log(error)
    }
}



const getAllUserController=async(req,res)=>{
    try {

        // const {name}=req.body
        console.log("user",req.user)

        const data=await user.find({})

        if(data){

            console.log("user created sucessfully")
           return res.status(200).json({
            message: "user created",
            data: data, 
          });
        }
        return  res.status(500).json({"message":"failed int user creation"})

        
    } catch (error) {
        console.log(error)
    }
}


const addAvatarController=async(req,res)=>{
    try {

        const User=req.user
        // User.exist?._id
        const avatar= req?.files
        console.log("avatrt from front",avatar)
        if(avatar){
         const data=await cloudinary.uploader.upload(avatar,{
             upload_preset:"todolist"
         })
         

         console.log("cloudianary data---",data)
         if(data){
             const userAvatarUpdate=await user.findByIdAndUpdate(User.exist?._id,{avatar},{new:true})
             
             if(userAvatarUpdate){
                 return res.status(200).json({message:"user avatar added",userAvatarUpdate})
                }
                return res.status(500).json({message:"failed in updation of use avatar"})
            }
        }
        
    } catch (error) {
        console.log(error)
    }
}

module.exports={createUserController,loginController,getAllUserController,getUserDetail,addAvatarController}