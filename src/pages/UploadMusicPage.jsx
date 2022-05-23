import React from 'react'
import { Formik, Form, Field, ErrorMessage} from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth,db } from "../firebase.js"
import { addDoc, serverTimestamp, collection } from 'firebase/firestore'
import Navbar from '../components/Navbar'

const Login = () => {

  const [ user, loading, error ] = useAuthState(auth)

    const navigate = useNavigate()
    
    const initialValues={
        musicAttachment:null
    }

    const onSubmit = (data) =>{
      const newData = new FormData()
      newData.append("file",data.musicAttachment)
      newData.append("upload_preset","uploads")
      try{
        fetch("https://api.cloudinary.com/v1_1/quintonpyx/raw/upload",{
                method:"POST",
                body:newData,
            })
            .then(res=>{
                // console.log(res.json())
                return res.json()
            }).then(d=>{
              console.log(d)
              const c = collection(db,"musics")

              addDoc(c,{
                  postedBy: user.uid,
                  filename:data.musicAttachment.name,
                  musicUrl: d.url,
                  timePosted: serverTimestamp(),
              })
              navigate('/')
            })

      }catch(err){
        console.log(err)
      }
    }
    const MAX_FILE_SIZE = 1024 * 1024 * 10
    const validationSchema =Yup.object().shape({
      musicAttachment: Yup.mixed()
       .test({
         message: 'Please provide a supported file type (mp3/wav)',
         test: (file, context) => {
          //  alert(file.name)
            const filenameWithoutExtension = file.name.split('.').slice(0, -1).join('.')
           const isValid = ['mp3','wav'].includes(file.name.replace(filenameWithoutExtension+'.',''));
           if (!isValid) context?.createError();
           return isValid;
         }
       }).required()
       .test({
         message: `File too big, can't exceed ${MAX_FILE_SIZE}mb`,
         test: (file) => { 
           const isValid = file?.size < MAX_FILE_SIZE;
           return isValid;
          }
        })
      });
      return (
        <>
        <Navbar active="uploadMusicPage"/>
    <div className="uploadMusicPage">
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
           {(formik) => {
        return (
          <Form className="uploadMusicPage__form">
                <label htmlFor="musicAttachment">Music file:</label>
                <ErrorMessage name="musicAttachment" component="span"/>
                {/* <Field id="musicAttachment" name="musicAttachment" type="file" /> */}
                <input id="musicAttachment" name="musicAttachment" type="file" onChange={(event) => {
                  formik.setFieldValue("musicAttachment", event.currentTarget.files[0]);
                  }} />
                <button disabled={formik.isSubmitting} className="uploadMusicPage__button" type="submit">Post</button>
            </Form>
        );
      }}
           
        </Formik>
    </div>
    </>
  )
}

export default Login