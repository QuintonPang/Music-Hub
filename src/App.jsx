import React,{ useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import Loading from "./components/Loading.js"
import { collection, setDoc, doc, serverTimestamp } from 'firebase/firestore'
import Login from './pages/Login.jsx'
import {auth,db } from "./firebase.js"
import HomePage from './pages/HomePage'
import UploadMusicPage from './pages/UploadMusicPage'
import './styles/main.scss'
import { BrowserRouter as Router , Routes, Route } from 'react-router-dom'
import ProfilePage from './pages/ProfilePage.jsx'

  const App = () => {
    
    // useAuthState returns array of 3, first is user, second is loading, third is error 
    const [ user, loading, error ] = useAuthState(auth)

    useEffect(()=>{
    
        if(user){
          
          const c = collection(db, 'users')
          
          setDoc(doc(c,user.uid),{
            name: user.displayName,
            email:user.email,
            lastSeen: serverTimestamp(),
            photoURL : user.photoURL,
          },
          { merge:true } // update fields if exists
         )
    
        }
    
      },[user])

    if (loading) return <Loading/>;
    if(!user) return <Login/>;
    return (
        <Routes>
          <Route path='/*' element={<HomePage/>}/>
          <Route path='/uploadMusic' element={<UploadMusicPage/>}/>
          <Route path='/profilePage/:id' element={<ProfilePage/>}/>
        </Routes>
    )

  }
  
  export default App
  

  