const express=require("express")
const app=express()
require("dotenv").config()
const cors=require("cors")

const cloudinary = require('cloudinary').v2


app.use(express.json())

app.use(cors())

const port=process.env.PORT || 8080
const connectDb=require("./connection/DB")
connectDb()


cloudinary.config({
    cloud_name:process.env.CLOUDNAME,
    api_key:process.env.APIKEY,
    api_secret:process.env.APISECREATE
})






const userRoutes=require("./routes/userRoutes")
const todoRoutes=require("./routes/todoRoutes")
const categoryRoutes=require("./routes/categoryRoutes")

app.use(userRoutes)
app.use(todoRoutes)
app.use(categoryRoutes)


app.listen(port ,()=>{
    console.log(`listening on the port ${port}`)
})