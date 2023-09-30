const mongoose=require("mongoose")


const UserSchema=new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String
    }


},{timestamps:true})


const user=new mongoose.model("user",UserSchema)

module.exports=user