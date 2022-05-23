import React, { useEffect, useState } from 'react'
import MusicPost from '../components/MusicPost'
import { doc, getDoc, collection, query, orderBy, getDocs } from 'firebase/firestore'
import { db, auth } from "../firebase.js"
import Navbar from '../components/Navbar'

const HomeScreen = () => {

  const [musicPosts, setMusicPosts] = useState([])


  useEffect(()=>{
    const musicsRef = collection(db,'musics');
 
    getDocs(musicsRef).then(musicSnapshots=>{
      let arr = []
      musicSnapshots.forEach((doc)=>{
        arr.push({id: doc.id, ...doc.data()})
      })

      setMusicPosts(arr)
      // console.log("HERE:",musicPosts[0])
      // alert(musicPosts.length)
    });

  },[])
  return (
    <>
       <Navbar active={"homePage"}/>
    <div className="homepage">
      <div className="homepage__posts">
        {musicPosts.length>0&&musicPosts.map(post=>
          <MusicPost musicPost={post} key={post.id}/>
        )}
      </div>
    </div>
    </>
  )
}

export default HomeScreen