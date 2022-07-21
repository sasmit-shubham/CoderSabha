import React, {useState} from 'react'
import Card from '../../../component/shared/Card/Card'
import Button from '../../../component/shared/Button/Button'
import TextInput from '../../../component/shared/TextInput/TextInput'
import styles from './StepName.module.css'
import { useDispatch,useSelector } from 'react-redux'
import { setName } from '../../../store/activateSlice'
const StepName = ({onNext}) => {
  const {name} = useSelector((state)=>state.activate);
  const dispatch = useDispatch();
  const HeaderContent ={
    title:"what's your full name",
    labelName:"Superhero",
    symbol:"🦸"
  }
  const [fullname,setfullname] = useState(name);
  const nextStep = () =>{
    if(!fullname){
      return;
    }
    dispatch(setName(fullname));
    onNext();
  }
  return (
    <div>
      <div className={styles.cardWrappper}>
        <Card HeaderContent={HeaderContent} 
        >
          <TextInput
              value={fullname}
              onChange={(e)=>setfullname(e.target.value)}
          />
           <p className={styles.bottomParagraph}>
             please enter real name :)
           </p>
           <div >
             <Button onClick={nextStep} buttonName={"Next"}/>
           </div>
        </Card>
      </div>
    </div>
  )
}

export default StepName