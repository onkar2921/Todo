const todo=require("../modal/todo")


const createTodoController=async(req,res)=>{
    try {

        const {user,content}=req.body

        const data=await todo.create({user,content})

        if(data){
            return res.status(200).json({ message: "todo created",
            data: data, })
        }

        return res.status(500).json({message:"failed in creation of todo"})
        
    } catch (error) {
        console.log(error)
    }
}


const getAllTodoController=async(req,res)=>{
    try {

        const data=await todo.find({}).populate("user")

        if(data){
            return res.status(200).json({message:"get all todos",data})
        }
        
    } catch (error) {
        console.log(error)
    }
}

const deleteTodoController=async(req,res)=>{
    try {

        const {TodoId}=req.params

        const data=await todo.findByIdAndDelete(TodoId)

        if(data){

            return res.status(200).json({message:"todo deleted"})
        }
        return res.status(500).json({message:"failed in deletion of todo"})
        
    } catch (error) {
        console.log(error)
    }
}

const updateTodoController=async(req,res)=>{
    try {

        const {TodoId}=req.params
        const {content}=req.body

        const data=await todo.findByIdAndUpdate(TodoId,{content},{new:true}).populate("user")

        if(data){

            return res.status(200).json({message:"todo updated",data})
        }
        return res.status(500).json({message:"failed in updation of todo"})
        
    } catch (error) {
        console.log(error)
    }
}


module.exports={createTodoController,getAllTodoController,deleteTodoController, updateTodoController}