import React from 'react'
import styles from "./RoomCard.module.css"
import {RiChatVoiceFill,RiUserFill} from "react-icons/ri"
import {useNavigate} from 'react-router-dom'
const RoomCard = ({room}) => {
  const navigate = useNavigate();  
//   console.log(room.id,"room-id");
  return (
    <div onClick={()=>navigate(`room/${room.id}`)} className={styles.card}>
        <h3 className={styles.topic}>{room.topic}</h3>
        <div className={styles.speakers}>
            <div className={`${styles.avatars} 
            ${room.speakers.length === 1 ? styles.singleSpeaker:''}`}>
            {
                room.speakers.map((speaker)=>(
                    <img key = {speaker.id}src={speaker.avatar} alt="" />
                ))
            }
            </div>
            <div className={styles.names}>
            {
                room.speakers.map((speaker) => (
                    <div key={speaker.id} className={styles.nameWrapper}>
                        <span >{speaker.name}</span>
                        <RiChatVoiceFill/>
                    </div>
                ))
            }
               
               <div className={styles.nameWrapper}>
                
               </div>
            </div>
        </div>

        <div className={styles.peopleCount}>
            <span>
                {
                    room.totalPeople
                }
            </span>
            <RiUserFill/>
        </div>
    </div>
  )
}

export default RoomCard