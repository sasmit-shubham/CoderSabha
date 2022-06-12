import React from 'react'
import {  useNavigate} from 'react-router-dom'
import styles from './Home.module.css'
import Card from '../../component/shared/Card/Card'
import Button from '../../component/shared/Button/Button'
const Home = () => {
  const HeaderContent ={
    title:"Welcome to Coderसभा",
    labelName:"Waving Hand",
    symbol:"👋"
  }
  // const signInLinkStyle = {
  //   color: '0077ff',
  //   fontWeight: 'bold',
  //   marginLeft:'10px'
  // }
  const navigate = useNavigate();
  const redirectToTheRegisterPage = () => {
    navigate('/authenticate');
    console.log("redirecting to the register page");
  }
  return (
    <div className={styles.cardwrapper}>
      <Card HeaderContent={HeaderContent}>
      <p className={styles.text}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore neque consequuntur molestias incidunt assumenda dolor officia itaque esse odio optio commodi ratione sequi ea, qui sed. Mollitia magnam recusandae fuga.
        </p>
        <div>
        
          <Button onClick={redirectToTheRegisterPage} buttonName={"Let's Go"}/>
        </div>
        <div className={styles.signInWrapper}>
          <span className={styles.hasInvite}>Have you an invite test</span>
          
        </div>
      </Card>
    </div>
  )
}

export default Home;

