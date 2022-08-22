import React from 'react'
import styles from './Rooms.module.css'
import {RiSearchLine,RiUserAddFill} from "react-icons/ri"
import RoomCard from '../../component/RoomCard/RoomCard'
function Rooms() {
  const rooms = [
    {
      id:1,
      topic:"what is websocket?",
      speakers:[
        {
          id:1,
          name:'John Doe',
          avatar:'/images/lion.png'
        },
        {
          id:2,
          name:"krishna Yadav",
          avatar:'/images/lion.png'
        }
      ],
      totalPeople:40
    },
    {
      id:2,
      topic:"Learn more about Socket.io?",
      speakers:[
        {
          id:1,
          name:'John Doe',
          avatar:'/images/lion.png'
        },
        {
          id:2,
          name:"krishna Yadav",
          avatar:'/images/lion.png'
        }
      ],
      totalPeople:34
    },
    {
      id:3,
      topic:"Virtuelly video platform?",
      speakers:[
        {
          id:1, 
          name:'John Doe',
          avatar:'/images/lion.png'
        },
        {
          id:2,
          name:"krishna Yadav",
          avatar:'/images/lion.png'
        }
      ],
      totalPeople:9
    },
    {
      id:4,
      topic:"Mera Bharat Mahan",
      speakers:[
        {
          id:1, 
          name:'Manish Kumar',
          avatar:'/images/lion.png'
        },
        {
          id:2,
          name:"Deshbhakt Sarvesh",
          avatar:'/images/lion.png'
        }
      ],
      totalPeople:9
    },
  ]
  return (
    <>
      <div className="container">
        <div className={styles.roomsHeader}>
          <div className={styles.left}>
            <span className ={styles.heading}>All voice rooms</span>
            <div className={styles.searchBox}>
            <RiSearchLine  size="1.5em"/>
            <input type="text" className={styles.searchInput}/>
            </div>
          </div>
          <div className={styles.right}>
            <button className={styles.startRoomButton}>
            <RiUserAddFill  size="1.5em"/>
            <span>Start a Room</span>
            </button>
          </div>
        </div>
        <div className={styles.roomList}>
          {
            rooms.map((room=>(
              <RoomCard key = {room.id} room={room}/>
            )))
          }
        </div>
      </div>
    </>
  )
}

export default Rooms