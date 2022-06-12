import React from 'react'
import { Link } from 'react-router-dom'
import {RiVoiceprintFill} from "react-icons/ri"
import styles from "./Navigation.module.css" 
export default function Navigation() {
  // this is inline styling of react component
  const brandStyle = {
    color: '#d4af37',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '22px',
    display:'flex',
    alignItems:'center'
  };
  const logoText={
    marginLeft:'10px'
  }
  return (
    <nav className={`${styles.navbar} container`}>

      <Link style={brandStyle} to="/">
        <RiVoiceprintFill color="#d4af37" size="2em"/>
        <span style={logoText}>Coderसभा</span>
      </Link>
    </nav>
  )
}

