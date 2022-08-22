import React from 'react'
import styles from "./RoomCard.module.css"
import {RiChatVoiceFill,RiUserFill} from "react-icons/ri"
const RoomCard = ({room}) => {
  return (
    <div className={styles.card}>
        <h3 className={styles.topic}>{room.topic}</h3>
        <div className={styles.speakers}>
            <div className={styles.avatars}>
            {
                room.speakers.map((speaker)=>(
                    <img src={speaker.avatar} alt="" />
                ))
            }
            </div>
            <div className={styles.names}>
            {
                room.speakers.map((speaker) => (
                    <div className={styles.nameWrapper}>
                        <span>{speaker.name}</span>
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