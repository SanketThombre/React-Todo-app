
import { useReducer } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SignUpbox = styled.div`
width:20%;
height:400px;
// border: 1px solid gray;
margin:40px auto;
`;

const Body = styled.div`
width:100%;
height:650px;
border: 1px solid gray;
// background-image: linear-gradient(to right, gray, #c2d84b);
background-color: gray;
`;

const Headings = styled.h1`
width:100%;
height:50px;
border: 1px solid gray;
margin:0;
margin-bottom:15px;
background-color: black;
color:whitesmoke;
`;

const Input = styled.input`
width:85%;
height:25px;
border-radius: 10px;
border:none;
padding:5px 10px;
margin-bottom:5px;
`;

const Label = styled.label`
float:left;
margin-left:20px;
margin-bottom:10px;
font-size:20px;

`;

const Button = styled.button`
padding:8px 25px;
border-radius: 8px;
margin-top:10px;
background-color:#3A3845;
color:#F7CCAC;
cursor:pointer;
`;


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

export const Register = () => {

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
       <Body>
        <SignUpbox>

            <Headings>Register</Headings>            

            <Label>Name</Label>
            <br/>
            <Input
                type="text"
                placeholder="Enter your name"
                value={name}
                required
                onChange={(e)=>dispatch({ type: "Change_name", payload:e.target.value })}
                
            />
            <br />
            <Label>Email</Label>
            <br/>
            <Input
                type="text"
                placeholder="Enter your Email"
                value={email}
                required
                onChange={(e)=>dispatch({ type: "Change_email", payload:e.target.value })}
                
            />
            <br />
            <Label>Password</Label>
            <br/>
            <Input
                type="password"
                placeholder="Enter your Password"
                value={password}
                required
                onChange={(e)=>dispatch({ type: "Change_password", payload:e.target.value })}
                
            />
            <br />
            <Label>Username</Label>
            <br/>
            <Input
                type="text"
                placeholder="Enter your Username"
                value={username}
                required
                onChange={(e)=>dispatch({ type: "Change_username", payload:e.target.value })}
                
            />
            <br />
            <Label>Mobile No.</Label>
            <br/>
            <Input
                type="number"
                placeholder="Enter your Mob No."
                value={mobile}
                required
                onChange={(e)=>dispatch({ type: "Change_mobile", payload:e.target.value })}
                
            />
            <br />

            <Label>Description</Label>
            <br/>
            <Input
                type="text"
                placeholder="Enter description"
                value={description}
                required
                onChange={(e)=>dispatch({ type: "Change_description", payload:e.target.value })}
                
            />
            <br />
            <Button disabled={!name && !password && !username && !email && !mobile && !description} onClick={()=>handleSubmit()}>Submit</Button>
            </SignUpbox>
            </Body>
    )
}