const mongoose=require("mongoose")

const CategorySchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user',
    }
},{timestamps:true})


const category=mongoose.model('category',CategorySchema)
module.exports=category