const express=require("express")
const app=express()
require("dotenv").config()
const cors=require("cors")

app.use(express.json())

app.use(cors())

const port=process.env.PORT || 8080
const connectDb=require("./connection/DB")
connectDb()

const userRoutes=require("./routes/userRoutes")
const todoRoutes=require("./routes/todoRoutes")

app.use(userRoutes)
app.use(todoRoutes)


app.listen(port ,()=>{
    console.log(`listening on the port ${port}`)
})