
import { useReducer } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const initState = {
    name: "",
    email: "",
    password: "",
    username: "",
    mobile: "",
    description: "",
    error: false,
}

function registerreducer(state, action) {
    switch (action.type) {
        case 'Change_name':
            return { ...state, name: action.payload };
        case 'Change_email':
            return { ...state, email: action.payload };
        case 'Change_password':
            return { ...state, password: action.payload };
        case 'Change_username':
            return { ...state, username: action.payload };
        case 'Change_mobile':
            return { ...state, mobile: action.payload };
        case 'Change_description':
            return { ...state, description: action.payload };
        case 'Register_Error':
            return { ...state, error: true };
          
        default:
            throw new Error();
    };
}

export const SignUp = () => {

    const navigate = useNavigate()
    // const [register, setRegister] = useState("");
    const [state, dispatch] = useReducer(registerreducer, initState);
   
    const { name, email, password, username, mobile, description } = state;


    const handleSubmit = () => {
        axios.post("https://masai-api-mocker.herokuapp.com/auth/register", state).then((res => {
           
            alert(res.data.message)
            if (res.data.error == false) {
                navigate("/login")
            }
        }))
       .catch((err) =>dispatch({type: "Register_Error"})) 
    
    }
    return (
        <div>

            <h1>Register</h1>

            <label>Name</label>
            <br/>
            <input
                type="text"
                placeholder="Enter your name"
                value={name}
                required
                onChange={(e)=>dispatch({ type: "Change_name", payload:e.target.value })}
                
            />
            <br />
            <label>Email</label>
            <br/>
            <input
                type="text"
                placeholder="Enter your Email"
                value={email}
                required
                onChange={(e)=>dispatch({ type: "Change_email", payload:e.target.value })}
                
            />
            <br />
            <label>Password</label>
            <br/>
            <input
                type="password"
                placeholder="Enter your Password"
                value={password}
                required
                onChange={(e)=>dispatch({ type: "Change_password", payload:e.target.value })}
                
            />
            <br />
            <label>Username</label>
            <br/>
            <input
                type="text"
                placeholder="Enter your Username"
                value={username}
                required
                onChange={(e)=>dispatch({ type: "Change_username", payload:e.target.value })}
                
            />
            <br />
            <label>Mobile No.</label>
            <br/>
            <input
                type="number"
                placeholder="Enter your Mob No."
                value={mobile}
                required
                onChange={(e)=>dispatch({ type: "Change_mobile", payload:e.target.value })}
                
            />
            <br />

            <label>Description</label>
            <br/>
            <input
                type="text"
                placeholder="Enter description"
                value={description}
                required
                onChange={(e)=>dispatch({ type: "Change_description", payload:e.target.value })}
                
            />
            <br />
            <button disabled={!name && !password && !username && !email && !mobile && !description} onClick={()=>handleSubmit()}>Submit</button>
        </div>
    )
}