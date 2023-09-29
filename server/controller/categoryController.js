const category=require("../modal/category")



const createCategoryController=async(req,res)=>{
    try {

        const {name}=req.body
        const user=req.user

        console.log("user",user.exist?._id)


        const data=await category.create({name,user:user?.exist?._id})

        if(data){
            return res.status(200).json({message:"new category created ",data})
        }
        return res.status(500).json({message:"failed in creation of new category"})
        
    } catch (error) {
        console.log(error)
    }
}


const getUserAllCategory=async(req,res)=>{
    try {

        const user=req.user
        // console.log("user",user.exist?._id)

        const data=await category.find({user:user.exist?._id})

        if(data){
            return res.status(200).json({message:"get all category of user",data})
        }
        return res.status(200).json({message:"no category exists"})
        
    } catch (error) {
        console.log(error)
    }
}


const deleteCategoryController=async(req,res)=>{
    try {

            const {categoryId}=req.params
        const user=req.user
        const data=await category.findByIdAndDelete(categoryId,{user:user.exist?._id})

        if(data){
            return res.status(200).json({message:"category deleted sucessfully"})
        }
        return res.status(500).json({message:"failed in deletion of category"})

        

        
        
    } catch (error) {
        console.log(error)
    }
}



const updateCategoryController=async(req,res)=>{
    try {

            const {categoryId}=req.params
            const {name}=req.body
        const user=req.user
        const data = await category.findOneAndUpdate(
            { _id: categoryId, user: user.exist?._id }, 
            {name},
            { new: true } 
          );
        if(data){
            return res.status(200).json({message:"category updated sucessfully",data})
        }
        return res.status(500).json({message:"failed in updation of category"})

        

        
        
    } catch (error) {
        console.log(error)
    }
}



module.exports={createCategoryController,getUserAllCategory,deleteCategoryController,updateCategoryController}