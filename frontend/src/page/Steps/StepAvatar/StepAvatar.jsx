import React from 'react'

const StepAvatar = ({onNext}) => {
  return (
    <div>
      <div>
        In this component you have to give the userName.
      </div>
      <div>
        <button onClick={onNext}></button>
      </div>
    </div>
  )
}

export default StepAvatar