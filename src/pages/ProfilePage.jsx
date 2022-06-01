import React, { useEffect, useState } from 'react'
import MusicPost from '../components/MusicPost'
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import {auth,db } from "../firebase.js"
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar';

const ProfilePage = () => {

    const { id:userId } = useParams()

    const [musicPosts, setMusicPosts] = useState([])
    const [user, setUser] = useState(null)

    useEffect(()=>{
      
        const mq = query(collection(db, "musics"), where("postedBy", "==", userId));
        getDocs(mq).then((mqSnapshot)=>{
            let arr = []
            mqSnapshot.forEach((doc) => {
                arr.push({id:doc.id,...doc.data()})
            });
            setMusicPosts(arr)
        });

        const userRef = doc(db, "users", userId);
        getDoc(userRef).then((userSnap)=>{
            setUser(userSnap)
        });

    },[userId])
  return (
    <div className="profilePage">
        <Navbar active="profilePage"/>
        <div className="avatar">
            <img src={user?.photoURL} alt={user?.displayName} />
        </div>
        <div className="profilePage__panel">
            <h1>Musics Posted</h1>
            <div className="musicPosts">
            {musicPosts.length>0&&musicPosts.map(post=>
          <MusicPost musicPost={post} key={post.id}/>
            )}
            </div>
        </div>
    </div>
  )
}

export default ProfilePage