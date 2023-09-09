import React, {useState} from 'react'
import Card from '../../../../component/shared/Card/Card'
import Button from '../../../../component/shared/Button/Button'
import TextInput from '../../../../component/shared/TextInput/TextInput'
import styles from '../StepPhoneEmail.module.css'
import {sendOtp} from '../../../../Http/Index'
import {useDispatch} from 'react-redux'
import { setOtp } from '../../../../store/authSlice'


const HeaderContent ={
    title:"Enter your Phone number",
    labelName:"Telephone",
    symbol:"☎️"
    
}
const Phone = ({onNext}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const dispatch = useDispatch();

  async function Submit(){
    // server request
    const {data} = await sendOtp({phone:phoneNumber}); 
    console.log("this data is being printed from the phone.jsx file");
    console.log(data);
    dispatch(setOtp({phone:data.phone, hash:data.hash}))
    onNext();
  }
  
  return (
    <Card HeaderContent={HeaderContent}>
       <TextInput value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)}/>
      <div className={styles.actionButtonWrap}>
        <Button  buttonName={"Next"} onClick={Submit}/>
      </div>
      <p className={styles.bottomPara}>
        By entering your number, you are agreeing to our Terms of service and privacy Policy. Thanks!
      </p>
    </Card>
  )
}

export default Phone