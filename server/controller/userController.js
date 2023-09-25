const user=require("../modal/user")


const createUserController=async(req,res)=>{
    try {

        const {name}=req.body

        const data=await user.create({name})

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




const getAllUserController=async(req,res)=>{
    try {

        const {name}=req.body

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


module.exports={createUserController}