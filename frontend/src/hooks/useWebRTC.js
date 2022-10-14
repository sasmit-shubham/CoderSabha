import { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import { useStateWithCallBack } from "./useStateWithCallBack";
import {socketInit} from '../socket'
import { ACTIONS } from "../store/action";

export const useWebRTC = (roomId,user) =>{
    const [clients,setClients] = useStateWithCallBack([]);
    const audioElements = useRef({});
    const connections = useRef({});
    const localMediaStream = useRef();
    const socket = useRef(null);
    useEffect(() =>{
        socket.current = socketInit();
    },[])
    const provideRef = (instance, userId) =>{
        audioElements.current[userId] = instance;
    }
    
    const addNewClients = useCallback(
        (newClient,cb) =>{
            const lookingFor = clients.find((client)=>client.id===newClient.id)
            if(lookingFor===undefined){
                setClients((existingClient)=>[...existingClient,newClient],
                 cb)
            } 
        },
        [clients,setClients]
    )
    // capture Audio

    useEffect(() =>{
        const startCapture = async () => {
            localMediaStream.current= await navigator.mediaDevices.getUserMedia({
                audio:true
            })
        };
        startCapture().then(()=>{
            addNewClients(user, () =>{
                const localElement = audioElements.current[user.id];
                if(localElement){
                    localElement.volume = 0;
                    localElement.srcObject = localMediaStream.current;
                }
                socket.current.emit(ACTIONS.JOIN,{roomId,user});
            })
        })
    })
    return {clients,provideRef};
}