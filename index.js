const express = require("express");
const socket = require("socket.io");
const app = express();
const http = require('http');
const path = require("path");
const PORT = 4000;

const server = http.createServer(app)
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static(path.resolve("./public")));

app.get("/",(req,res)=>{
    res.sendFile("./public/index.html")
})

io.on('connection', (socket) => {
    console.log('a new user connected',socket.id);
    socket.on('user-message', (message)=>{
       io.emit("message", message)
    })
  });

server.listen(PORT,()=>{
    console.log(`Server stated on ${PORT}`)
})