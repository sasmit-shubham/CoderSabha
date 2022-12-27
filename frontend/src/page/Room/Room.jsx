import React from 'react'
import { useWebRTC } from '../../hooks/useWebRTC'
import {useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'
import styles from "./Room.module.css"
import {BiArrowBack} from "react-icons/bi"
import { useNavigate } from 'react-router-dom'
import {RiLogoutBoxLine} from "react-icons/ri"
import {BsFillMicMuteFill} from "react-icons/bs"
import { useEffect } from 'react'
import { useState } from 'react'
import { getRoom } from '../../Http/Index'

const Room = () => {
  const {id:roomId} = useParams();
  const [room,setRoom] = useState(null);
  const user = useSelector(state => state.auth.user);
  const {clients,provideRef} = useWebRTC(roomId,user);
  const navigate = useNavigate();
  const handleManualLeave = () =>{
    navigate("/rooms")
  }

  useEffect(()=>{
    const fetchRoom = async() =>{
      const {data} = await getRoom(roomId);
      console.log(data);
      setRoom((prev)=>data)
    }
    fetchRoom();
  },[roomId])
  // console.log(roomId,"roomID");
  return (
    <div>
      <div className="container">
        <button onClick={handleManualLeave}className = {styles.goBack}>
          <BiArrowBack color="wheat" size="1.5rem"/>    
          <span>All Voice Rooms</span>       
        </button>
      </div>
      <div className={styles.clientsWrap}>
       <div className={styles.header}>
        <h2 className={styles.topic}>{room?.topic}</h2>
        <div className={styles.action}>
          <button className={styles.actionBtn}>heyy</button>
          <button onClick={handleManualLeave} className={styles.actionBtn}><RiLogoutBoxLine size="1.2rem"/>Leave quietly</button>
        </div>
       </div>
       <div className={styles.clientsList}>
          {
            clients.map((client)=>{
              return(
                <div className={styles.client} key={client.id}>
                  <div className = {styles.userHead}>
                  <audio 
                  ref = {(instance)=>{provideRef(instance,client.id)}}
                  
                  autoPlay></audio>
                  <img className={styles.userAvatar} src={client.avatar} alt="avatar" />
                  <button className={styles.micBtn}>
                    <BsFillMicMuteFill/>
                  </button>
                </div>
                <h4>{client.name}</h4>
                </div>
              )
            })
          }
       </div>
      
      </div>
      
    </div>
  )
}

export default Room