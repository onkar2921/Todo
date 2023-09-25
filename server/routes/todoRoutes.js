const express=require("express")
const route=express.Router()
const {createTodoController,getAllTodoController,deleteTodoController,updateTodoController}=require("../controller/todoController")

route.post("/api/createTodo",createTodoController)
route.get("/api/getAllTodo",getAllTodoController)
route.delete("/api/deleteTodo/:TodoId",deleteTodoController)
route.patch("/api/updateTodo/:TodoId",updateTodoController)


module.exports=route