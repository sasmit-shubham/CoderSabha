import React, {useState} from 'react'
import Card from '../../../../component/shared/Card/Card'
import Button from '../../../../component/shared/Button/Button'
import TextInput from '../../../../component/shared/TextInput/TextInput'
import styles from '../StepPhoneEmail.module.css'
import { sendOtpEmail } from '../../../../Http/Index'
import { useDispatch } from 'react-redux'
import { setOtp } from '../../../../store/authSlice'

const HeaderContent ={
  title:"Enter your Email id",
  labelName:"E-Mail",
  symbol:"📧"
}
const Email = ({onNext}) => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  async function Submit(){
    const {data} = await sendOtpEmail({email:email});
    console.log("email file");
    console.log(data.otp);
    dispatch(setOtp({phone:data.email, hash:data.hash}))
    onNext();
  }
  return (
    <Card HeaderContent={HeaderContent}>
      <TextInput value={email} onChange={(e)=>setEmail(e.target.value)}/>
      
      <div className={styles.actionButtonWrap}>
        <Button  buttonName={"Next"} onClick={Submit}/>
      </div>
      <p className={styles.bottomPara}>
        By entering your number, you are agreeing to our Terms of service and privacy Policy. Thanks!
      </p>
    </Card>
  )
}

export default Email