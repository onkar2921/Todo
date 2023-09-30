const express=require("express")
const route=express.Router()
const {createTodoController,getAllTodoController,deleteTodoController,updateTodoController,getrTodoOnCategoryController}=require("../controller/todoController")
const validateUser =require("../middlewares/authMiddleware")


route.post("/api/createTodo",validateUser,createTodoController)
route.get("/api/getAllTodo",validateUser,getAllTodoController)
route.delete("/api/deleteTodo/:TodoId",validateUser,deleteTodoController)
route.patch("/api/updateTodo/:TodoId",validateUser,updateTodoController)
route.post("/api/getSpecificCategoryTodo/:user",getrTodoOnCategoryController)


module.exports=route