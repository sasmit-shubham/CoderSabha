import {io} from "socket.io-client"

export const socketInit = () =>{
    const options = {
        'force new conneciton':true,
        reconnectionAttempt:"Infinity",
        timeout:10000,
        transports:['websocket'],
    }
    return io('http//localhost:5500',options)
}