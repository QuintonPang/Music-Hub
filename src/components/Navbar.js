import React from 'react'
import Logo from '../assets/logo.jpg'
import { useNavigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import {auth,db } from "../firebase.js"

const Navbar = ({active}) => {
    const navigate = useNavigate()
    const [ user, loading, error ] = useAuthState(auth)

  return (
    <div className="navbar">
    <div className="logo">
      <img src={Logo} alt="logo" />
    </div>
    <div className="navbar__links">
      <div className={`navbar__link ${active==="homePage"&&"active"}`} >
        <a href="/">Home Page</a>
      </div>
      <div className={`navbar__link ${active==="uploadMusicPage"&&"active"}`}>
        <a href="#" onClick={()=>navigate('/uploadMusic')}>Upload Music</a>
      </div>
      <div className={`navbar__link ${active==="profilePage"&&"active"}`}>
        <a href="#"  onClick={()=>navigate('/profilePage/'+user.uid)}>Profile Page</a>
      </div>
      <div className={`navbar__link navbar__link-logout`}>
        <a href="#"  onClick={()=>{window.confirm("Logout?")&&auth.signOut()}}>Logout</a>
      </div>
    </div>
  </div>
  )
}

export default Navbar