import React from 'react'
import Card from '../../../component/shared/Card/Card'
import Button from '../../../component/shared/Button/Button'
import styles from './StepAvatar.module.css'
import { useSelector,useDispatch } from 'react-redux'
import { useState} from 'react'
import {setAvatar} from '../../../store/activateSlice'
import {activate} from '../../../Http/Index'
import { setAuth } from '../../../store/authSlice';
const StepAvatar = ({ onNext }) => {
  const dispatch = useDispatch();
  const {name,avatar} = useSelector((state)=>state.activate)
  const [image,setImage] = useState('/images/lion.png');
  const HeaderContent = {
    title:` Okay, ${name}`,
    labelName: "monkey-emoji",
    symbol: "🙈"
  }
  async function submit(){
    try{
     const {data} =  await activate({name,avatar});
     if(data.auth){
      dispatch(setAuth((data)));
     }
    }catch(err){
      console.log(err)
    }
  }
  const captureImage = (e) =>{
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      // console.log(reader.result);
      setImage(reader.result);
      dispatch(setAvatar(reader.result));
    }
  }
  return (
    <div>
      <div className={styles.cardWrappper}>
        <Card HeaderContent={HeaderContent}
        >
          <p className={styles.subheading}>How's this photo?</p>
          <div className={styles.avatarWrapper}>
            <img className={styles.avatarImage} src={image} alt="avatar" />
          </div>
          <div>
            <input
              onChange={captureImage} 
              id="avartarInput"
              type="file" 
              className={styles.avatarInput}

            />
            <label className={styles.avatarLabel} htmlFor="avartarInput" >
              Choose your picture
            </label>
          </div>
          <div >
            <Button onClick={submit} buttonName={"Next"} />
          </div>
        </Card>
      </div>
    </div>

  )
}

export default StepAvatar