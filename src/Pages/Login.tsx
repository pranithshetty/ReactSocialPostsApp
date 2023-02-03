import {auth, provider} from '../config/firebase'
import {signInWithPopup} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
export const Login = ()=> {
    const navigate = useNavigate()
    const signInWithGoogle = async()=>{
        const result = signInWithPopup(auth, provider)
        console.log(result);
        navigate('/')
        
    }
    return(<div>
        <p>Sign in with google</p>
        <button onClick={signInWithGoogle}>Sign in </button>
    </div>)
}