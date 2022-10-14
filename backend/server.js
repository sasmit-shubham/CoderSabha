require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const DbConnect = require('./database')
const PORT = process.env.PORT || 5500;
const cors = require('cors');
const cookieParser = require('cookie-parser');
const server = require('http').createServer(app);

const io = require("socket.io")(server,{
    cors:{
        origin:"http//localhost:3000",
        methods:['GET','POST']
    }
})



DbConnect();
const router = require('./routes');
const { ACTIONS } = require('../frontend/src/store/action');
app.use(express.json({limit:'8mb'}));
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(cookieParser());
const corsoption = {
    credentials:true,
    origin: ['http://localhost:3000']
}
app.use(cors(corsoption));
app.use(router);
app.get('/',(req,res) =>{
    res.send("hello from the express js");
});

// listen 
console.log("getting ready ",io);
const socketUserMapping = {

}
io.on('connection',(socket)=>{
    console.log("new connection");
    socket.on(ACTIONS.JOIN, ({roomId,user})=>{
        socketUserMapping[socket.id] = user;
        // new map 
        const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || [])
        console.log(clients);
        clients.forEach(clientId=>{
            io.to(clientId).emit(ACTIONS.ADD_PEER,{});
        })
        socket.emit(ACTIONS.ADD_PEER,{});
        socket.join()
    })
    
})
server.listen(PORT,()=>console.log(`Server is starting at ${PORT}`));
