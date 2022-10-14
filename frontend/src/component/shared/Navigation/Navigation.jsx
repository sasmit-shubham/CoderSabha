import React from 'react'
import { Link } from 'react-router-dom'
import {RiVoiceprintFill} from "react-icons/ri"
import {RiLogoutCircleRLine} from "react-icons/ri"
import styles from "./Navigation.module.css" 
import {logout} from "../../../Http/Index"
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from '../../../store/authSlice'

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

  const dispatch= useDispatch();
  const {isAuth,user} = useSelector((state)=>state.auth);
  async function logoutUser(){
    try {
      const {data} = await logout();
      dispatch(setAuth(data));
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <nav className={`${styles.navbar} container`}>

      <Link style={brandStyle} to="/">
        <RiVoiceprintFill color="#d4af37" size="2em"/>
        <span style={logoText}>Coderसभा</span>
      </Link>
      {isAuth && (
                <div className={styles.navRight}>
                    <h3>{user?.name}</h3>
                    <Link to="/">
                        <img
                            className={styles.avatar}
                            src="/images/worker.png"
                            width="40"
                            height="40"
                            alt="avatar"
                        />
                    </Link>
                    <button
                        className={styles.logoutButton}
                        onClick={logoutUser}
                    >
                        <RiLogoutCircleRLine  size="1.5em"/>
                    </button>
                </div>
            )}
      {/* {isAuth && <button onClick={logoutUser}>logout</button>} */}
    </nav>
  )
}

