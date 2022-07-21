import React, {useState} from 'react';
import StepAvatar from '../Steps/StepAvatar/StepAvatar'
import StepName from '../Steps/StepName/StepName'
const steps = {
  1: StepName,
  2: StepAvatar
}

function Activate() {

  const [step,setStep] = useState(1);
  const Step = steps[step];
  function onNext(){
    setStep(step+1);
  }
  
  return (
    <Step onNext = {onNext}></Step>
  )
}

export default Activate