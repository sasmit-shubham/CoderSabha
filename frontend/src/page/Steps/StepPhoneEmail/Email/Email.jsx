import React, {useState} from 'react'
import Card from '../../../../component/shared/Card/Card'
import Button from '../../../../component/shared/Button/Button'
import TextInput from '../../../../component/shared/TextInput/TextInput'
import styles from '../StepPhoneEmail.module.css'

const HeaderContent ={
  title:"Enter your Email id",
  labelName:"E-Mail",
  symbol:"📧"
}
const Email = () => {
  const [email, setEmail] = useState('');
  return (
    <Card HeaderContent={HeaderContent}>
      <TextInput value={email} onChange={(e)=>setEmail(e.target.value)}/>
      
      <div className={styles.actionButtonWrap}>
        <Button  buttonName={"Next"}/>
      </div>
      <p className={styles.bottomPara}>
        By entering your number, you are agreeing to our Terms of service and privacy Policy. Thanks!
      </p>
    </Card>
  )
}

export default Email