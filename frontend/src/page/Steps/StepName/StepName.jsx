import React from 'react'

const StepName = ({onNext}) => {
  return (
    <div>
      <div>In this component you are required to fill the name</div>
      <div> <button onClick={onNext}>Next</button></div>
    </div>
  )
}

export default StepName