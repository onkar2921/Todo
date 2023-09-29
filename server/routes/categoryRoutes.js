const express=require("express")
const route=express.Router()


const {createCategoryController,getUserAllCategory,deleteCategoryController,updateCategoryController}=require("../controller/categoryController")

const validateUser=require("../middlewares/authMiddleware")

route.post("/api/createCategory",validateUser,createCategoryController)
route.get("/api/getUserCategories",validateUser,getUserAllCategory)
route.delete("/api/deleteCategory/:categoryId",validateUser,deleteCategoryController)
route.patch("/api/updateCategory/:categoryId",validateUser,updateCategoryController)

module.exports=route