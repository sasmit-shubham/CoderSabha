import React, {useState} from 'react'
import { ImMobile2 } from 'react-icons/im';
import { AiOutlineMail } from 'react-icons/ai';
import Phone from './Phone/Phone';
import Email from './Email/Email';
import styles from './StepPhoneEmail.module.css'
const PhoneEmailMap = {
  phone: Phone,
  email: Email,

}

const StepPhoneEmail = ({onNext}) => {
  const [type,setType] = useState('phone');
  
  const Component = PhoneEmailMap[type];
  return (
    <>
        <div className={styles.cardWrapper}>
          <div>
             <div className={styles.buttonWrapper}>
                <button className={`${styles.tabbutton} ${type===`phone`?styles.active:''}`} onClick={()=>setType('phone')}><ImMobile2 color="white" size="2.5em"/></button>
                <button className={`${styles.tabbutton} ${type===`email`?styles.active:''}`}onClick={()=>setType('email')}><AiOutlineMail color="white" size="2.5rem"/></button>
             </div>
             <div>
              <Component onNext = {onNext}/>
             </div>
             
          </div>

        </div>
        
    </>
  )
}

export default StepPhoneEmail