import { auth, provider } from "../firebase"
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Logo from '../assets/logo.jpg'

function Login() {

    const signIn = ()=>{
        signInWithPopup(auth, provider).then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            // const credential = GoogleAuthProvider.credentialFromResult(result);
            // const token = credential.accessToken;
            // The signed-in user info.
            // const user = result.user;
            // ...
          }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            // const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
          });

    }
    return (
        <div className="login">
            <div className="login__panel">
                <div className="logo">
                    <img src={Logo} alt="logo" />
                </div>
                <div className="login__button" onClick={signIn}>
                    <p>LOGIN</p>
                </div>
            </div>
        </div>
    )
}

export default Login
