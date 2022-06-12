import React from 'react'
import styles from './Button.module.css'
import { IoMdArrowRoundForward } from "react-icons/io"

const Button = ({buttonName,onClick}) => {
  return (
    <button onClick={onClick}className={styles.button}>
        <span>{buttonName}</span><IoMdArrowRoundForward className={styles.arrow}/>
    </button>
  )
}

export default Button