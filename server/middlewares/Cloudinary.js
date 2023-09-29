const cloudinary = require('cloudinary').v2
require("dotenv").config()
cloudinary.config({
    cloud_name:process.env.CLOUDNAME,
    api_key:process.env.APIKEY,
    api_secret:process.env.APISECREATE
})



module.exports=cloudinary

