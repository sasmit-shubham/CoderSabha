require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
app.use(express.static('public')); 
app.use('/storage', express.static('storage'));
const DbConnect = require('./database')
const PORT = process.env.PORT || 5500;
const cors = require('cors');
const cookieParser = require('cookie-parser');
const server = require('http').createServer(app);
const ACTIONS = require('./action')

const io = require("socket.io")(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:['GET','POST']
    }
})



DbConnect();
const router = require('./routes');
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
// console.log("getting ready ",io);
// const socketUserMapping = {

// }
// // sockets 
// // yahaan par basically hum ek event listner lga rhe hain, connection ke upar
// io.on('connection',(socket)=>{

//     socket.on(ACTIONS.JOIN, ({roomId,user})=>{
//         socketUserMapping[socket.id] = user;
//         // new map 
//         const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || [])
//         console.log(clients);
//         clients.forEach(clientId=>{
//             console.log("we are inside the io.on")
//             io.to(clientId).emit(ACTIONS.ADD_PEER,{
//                 peerId: socket.id,
//                 createOffer: false,
//                 user
//             });
            
//             socket.emit(ACTIONS.ADD_PEER,{
//                 peerId:clientId,
//                 createOffer: true,
//                 user:socketUserMapping[clientId]     
//             });
//         })
//         socket.join(roomId)
//     })

//     // handle relay_ice

//     socket.on(ACTIONS.RELAY_ICE,
//         ({peerId,iceCandidate})=>{
//             io.to(peerId).emit(ACTIONS.ICE_CANDIDATE,{
//                 peerId:socket.id,
//                 iceCandidate
//             })
//         }
//     )
    
//     // relay sdp (session description)

//     socket.on(ACTIONS.RELAY_SDP,
//         ({peerId,sessionDescription}) =>{
//             io.to(peerId).emit(ACTIONS.SESSION_DESCRIPTION,{
//                 peerId:socket.id,
//                 sessionDescription
//             }) 
//         }
//     )

//     // leaving the room 
//     const leaveRoom = ({roomId}) =>{
//         const {rooms} = socket;
//         Array.from(rooms).forEach((roomId)=>{
//             const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || [])
//             clients.forEach((clientId) =>{
//                 io.to(clientId).emit(ACTIONS.REMOVE_PEER,{
//                     peerId:socket.id,
//                     userId: socketUserMapping[socket.id]?.id,
//                 });
//                 // socket.emit(ACTIONS.REMOVE_PEER, {
//                 //     peerId:clientId,
//                 //     userId:socketUserMapping[clientId]?.id
//                 // })
//             })
//             socket.leave(roomId);
//         })

//         delete socketUserMapping[socket.id]
//     }
//     socket.on(ACTIONS.LEAVE,leaveRoom);

// })
// Sockets
const socketUserMap = {};

io.on('connection', (socket) => {
    console.log('New connection', socket.id);
    socket.on(ACTIONS.JOIN, ({ roomId, user }) => {
        socketUserMap[socket.id] = user;
        const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
        clients.forEach((clientId) => {
            io.to(clientId).emit(ACTIONS.ADD_PEER, {
                peerId: socket.id,
                createOffer: false,
                user,
            });
            socket.emit(ACTIONS.ADD_PEER, {
                peerId: clientId,
                createOffer: true,
                user: socketUserMap[clientId],
            });
        });
        socket.join(roomId);
    });

    socket.on(ACTIONS.RELAY_ICE, ({ peerId, icecandidate }) => {
        io.to(peerId).emit(ACTIONS.ICE_CANDIDATE, {
            peerId: socket.id,
            icecandidate,
        });
    });

    socket.on(ACTIONS.RELAY_SDP, ({ peerId, sessionDescription }) => {
        io.to(peerId).emit(ACTIONS.SESSION_DESCRIPTION, {
            peerId: socket.id,
            sessionDescription,
        });
    });

    socket.on(ACTIONS.MUTE, ({ roomId, userId }) => {
        const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
        clients.forEach((clientId) => {
            io.to(clientId).emit(ACTIONS.MUTE, {
                peerId: socket.id,
                userId,
            });
        });
    });

    socket.on(ACTIONS.UNMUTE, ({ roomId, userId }) => {
        const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
        clients.forEach((clientId) => {
            io.to(clientId).emit(ACTIONS.UNMUTE, {
                peerId: socket.id,
                userId,
            });
        });
    });

    socket.on(ACTIONS.MUTE_INFO, ({ userId, roomId, isMute }) => {
        const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
        clients.forEach((clientId) => {
            if (clientId !== socket.id) {
                console.log('mute info');
                io.to(clientId).emit(ACTIONS.MUTE_INFO, {
                    userId,
                    isMute,
                });
            }
        });
    });

    const leaveRoom = () => {
        const { rooms } = socket;
        Array.from(rooms).forEach((roomId) => {
            const clients = Array.from(
                io.sockets.adapter.rooms.get(roomId) || []
            );
            clients.forEach((clientId) => {
                io.to(clientId).emit(ACTIONS.REMOVE_PEER, {
                    peerId: socket.id,
                    userId: socketUserMap[socket.id]?.id,
                });

                // socket.emit(ACTIONS.REMOVE_PEER, {
                //     peerId: clientId,
                //     userId: socketUserMap[clientId]?.id,
                // });
            });
            socket.leave(roomId);
        });
        delete socketUserMap[socket.id];
    };

    socket.on(ACTIONS.LEAVE, leaveRoom);

    socket.on('disconnecting', leaveRoom);
});

server.listen(PORT,()=>console.log(`Server is starting at ${PORT}`));
