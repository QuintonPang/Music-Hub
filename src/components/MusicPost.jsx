import React, { useEffect, useState } from 'react'
import {  doc, getDoc } from "firebase/firestore";
import {auth,db } from "../firebase.js"

const MusicPost = ({musicPost}) => {

  const [username, setUsername] = useState(null)
  useEffect(()=>{
    const userRef = doc(db, "users", musicPost?.postedBy);
    getDoc(userRef).then((userSnap)=>{
        setUsername(userSnap.data().name)
    });
  },[])
  return (
    <div className="musicPost">
          <p>{musicPost?.filename}</p>
      <div className="musicPlayer">
          <audio controls>
            <source src={musicPost?.musicUrl} type={`audio/${musicPost?.filename.split('.')[musicPost?.filename.split('.').length-1]}`}/>
            Your browser does not support the audio element.
          </audio>
      </div>
        <div className="musicPost__details">
          <small>Posted by <div className="musicPost__details-username">{username}</div> at {!musicPost?.timePosted?new Date().toLocaleTimeString():musicPost?.timePosted?.toDate()?.toLocaleTimeString()} </small>
        </div>
      <i className="musicPost__likeIcon"></i>
    </div>
  )
}

export default MusicPost