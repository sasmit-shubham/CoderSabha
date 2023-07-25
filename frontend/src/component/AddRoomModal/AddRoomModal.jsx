import React from 'react'
import styles from './AddRoomModal.module.css'
import TextInput from '../shared/TextInput/TextInput';
import {AiOutlineClose} from "react-icons/ai"
import { useState } from 'react';
import {createRoom as create} from '../../Http/Index.js';
import {useNavigate} from 'react-router-dom'

const AddRoomModal = ({onClose}) => {
  const navigate = useNavigate();
  const [roomType, setRoomType] = useState('open');
  const [topic, setTopic] = useState('');

  async function createRoom(){
    // server call 
    try {
      if(!topic) return;
      const {data} = await create({topic,roomType});
      navigate(`room/${data.id}`);
    } catch (error) {
      console.log(error.message);
    }

  }
  return (
    <div className={styles.modalMask}>
       <div className={styles.modalBody}>
        <button onClick ={onClose} className={styles.closeButton}>
          <AiOutlineClose size="1.5rem"/>
        </button>
        <div className={styles.modalHeader}>
          <h3 className={styles.heading}>Enter the topic to be discussed</h3>
          <TextInput fullwidth='true' value={topic} onChange={(e)=>setTopic(e.target.value)}/>
          <h2 className={styles.roomTypesText}>Room Types</h2>
          <div className={styles.roomTypes}>
            <div onClick={()=>setRoomType('open')}
             className={`${styles.typeBox} ${roomType==='open'?styles.active:''}`}>
              <img  src="/images/worldwide.png" alt="globe" width={50} height={50}/>
              <span>Open</span>
            </div>
            <div onClick={()=>setRoomType('social')}
             className={`${styles.typeBox} ${roomType==='social'?styles.active:''}`}>
              <img src="/images/social-network.png" alt="" width={50} height={50} />
              <span>Social</span>
            </div>
            <div onClick={()=>setRoomType('private')}
              className={`${styles.typeBox} ${roomType==='private'?styles.active:''}`}>
              <img src="/images/private.png" alt="" width={50} height={50} />
              <span>Private</span>
            </div>
          </div>
        </div>

        <div className={styles.modalFooter}>
        <h2>Start a room, open to everyone</h2>
        <button onClick={createRoom}className={styles.footerButton}>
          <img src="/images/party.png" alt="" width={20} height={20}/>
          <span>Let's go</span>
        </button>
        </div>
       </div>

       
    </div>
  )
}

export default AddRoomModal