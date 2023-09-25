const mongoose=require("mongoose")
require("dotenv").config()

 const connectDb=async()=>{
    try {
      await  mongoose.connect(
        process.env.MONGO_URI
    //    "mongodb+srv://onkarkakade2921:Onkar%40123@cluster0.cjwmtgn.mongodb.net/"
        ).then(()=>{  console.log("connected to database")}) 
    } catch (error) {
        console.log(error)
    }
}


module.exports=connectDb
