const mongoose=require("mongoose")

const TodoSchema=new mongoose.Schema({
    content:{
        type:String,
        trim :true
    },

    user:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user',
    }
},{timestamps:true})


const todo=mongoose.model("todo",TodoSchema)

module.exports=todo