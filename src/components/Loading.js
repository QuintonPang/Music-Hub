import { Circle } from "better-react-spinkit"
import Logo from '../assets/logo.jpg'

function Loading() {
    return (
        <center style={{display:"grid", placeItems:"center",height:"100vh"}}>
            <div>
                <img 
                src={Logo} 
                alt="logo"
                height="200px"
                style={{marginBottom:10,borderRadius:"5px"}}
                />
                <Circle color="#f46734"  size={64} /> 
            </div>
        </center>
    )
}

export default Loading
