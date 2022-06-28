import React, {useState} from 'react'
import Card from '../../../component/shared/Card/Card'
import Button from '../../../component/shared/Button/Button'
import TextInput from '../../../component/shared/TextInput/TextInput';
import styles from './StepOtp.module.css'
import {verifyOtp} from '../../../Http/Index';
import { useSelector } from 'react-redux';
import {setAuth} from '../../../store/authSlice';
import { useDispatch } from 'react-redux'; 

 
const StepOtp = () => {
  const dispatch = useDispatch();
  const HeaderContent ={
    title:"Enter the code we just texted you!",
    labelName:"locked",
    symbol:"🔒"
  }
  const [otp,setOtp] = useState('');
  const {phone,hash} = useSelector((state)=>state.auth.otp)
  async function submit() {
    try{
      const {data } = await verifyOtp({otp,phone,hash});
      console.log(data);
      dispatch(setAuth(data));

    } catch(err){
      console.log(err);
    }
  }
  return (
    <>
      <div className={styles.cardWrappper}>
        <Card HeaderContent={HeaderContent} 
        >
          <TextInput
              value={otp}
              onChange={(e)=>setOtp(e.target.value)}
          />
           <div className={styles.actionButtonWrap}>
             <Button onClick={submit} buttonName={"Next"}/>
           </div>
           <p className={styles.bottomParagraph}>
             By entering your number you are agreeing to our Terms of service and 
             privacy policy.
           </p>
        </Card>
      </div>
    </>
  )
}

export default StepOtp