// const express=require("express")
// const app=express()
// require("dotenv").config()
// const cors=require("cors")

// const cloudinary = require('cloudinary').v2



// const http = require("http");
// const socketIo = require("socket.io");
// // const reminderController=require("./controller/todoController")



// app.use(express.json())

// app.use(cors())

// const port=process.env.PORT || 8080
// const connectDb=require("./connection/DB")
// connectDb()


// cloudinary.config({
//     cloud_name:process.env.CLOUDNAME,
//     api_key:process.env.APIKEY,
//     api_secret:process.env.APISECREATE
// })






// const userRoutes=require("./routes/userRoutes")
// const todoRoutes=require("./routes/todoRoutes")
// const categoryRoutes=require("./routes/categoryRoutes")
// app.get("/",(req,res)=>{
//     return res.send("hello")
// })
// app.use(userRoutes)
// app.use(todoRoutes)
// app.use(categoryRoutes)





// // Create an HTTP server from the Express app
// const server = http.createServer(app);

// // Initialize socket.io and attach it to the HTTP server
// const io = socketIo(server);

// // Define WebSocket logic here
// io.on("connection", (socket) => {
//   console.log("A user connected to WebSocket");

//      // Schedule a cron job to send a reminder
//      cron.schedule('0 1 * * *', () => {
//         console.log('Sending a reminder to the frontend...');
//         // Emit a reminder event to the connected clients
//         socket.emit('reminder', { message: 'It\'s time for your reminder!' });
//       }, {
//         scheduled: true,
//         timezone: 'America/Sao_Paulo',
//       });
  

//   socket.on("disconnect", () => {
//     console.log("A user disconnected from WebSocket");
//   });
// });


// app.listen(port ,()=>{
//     console.log(`listening on the port ${port}`)
// })




const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const cloudinary = require('cloudinary').v2;
// const http = require("http");
// const socketIo = require("socket.io");
// const cron = require('node-cron'); 

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8080;
const connectDb = require("./connection/DB");
connectDb();

cloudinary.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.APIKEY,
    api_secret: process.env.APISECREATE
});

const userRoutes = require("./routes/userRoutes");
const todoRoutes = require("./routes/todoRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

app.get("/", (req, res) => {
    return res.send("hello");
});

app.use(userRoutes);
app.use(todoRoutes);
app.use(categoryRoutes);

// const server = http.createServer(app);

// const io = socketIo(server);


// io.on("connection", (socket) => {
//     console.log("A user connected to WebSocket");

//     // Schedule a cron job to send a reminder
//     cron.schedule('0 1 * * *', () => {
//         console.log('Sending a reminder to the frontend...');
//         // Emit a reminder event to the connected clients
//         socket.emit('reminder', { message: 'It\'s time for your reminder!' });
//     }, {
//         scheduled: true,
//         timezone: 'America/Sao_Paulo',
//     });

//     socket.on("disconnect", () => {
//         console.log("A user disconnected from WebSocket");
//     });
// });

app.listen(port, () => {
    console.log(`Listening on the port ${port}`);
});
