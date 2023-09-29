const jwt=require("jsonwebtoken")
const user=require("../modal/user")
require("dotenv").config()
const bcrypt=require("bcrypt")

const validateUser=async(req,res,next)=>{
    try {

        
        const {authorization}=req.headers

       const {userid}=req.headers

    //    console.log("userId",userid)

        

        const exist=await user.findById(userid)
        // console.log("exist",exist)

        if(exist && authorization.startsWith("Bearer")){

                token=authorization.split(" ")[1]
// console.log("token",token)
                if(token){
                    const validateToken=await jwt.verify(token,process.env.SECREATE)

                    if(validateToken){
                        req.user={exist,token}
                    return next()
                    }
                }
         
                

                return  res.status(400).json({message:"authinticated user"})
    
        }else{
            return res.status(400).json({message:"unauth user"})
        }

                
    } catch (error) {
        console.log(error)
    }
}

module.exports=validateUser