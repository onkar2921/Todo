const mongoose=require("mongoose")


const UserSchema=new mongoose.Schema({

    name:{
        type:String,
        required:true
    },

},{timestamps:true})


const user=new mongoose.model("user",UserSchema)

module.exports=user