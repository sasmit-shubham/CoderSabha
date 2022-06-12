import React from 'react'

const StepUserName = ({onNext}) => {
  return (
    <div>
      <div>
        In this component you have setup your userName
      </div>
      <div>
        <button onClick={onNext}>

        </button>
      </div>
    </div>
  )
}

export default StepUserName