
import { useState } from "react";
import axios from "axios";
import { useNavigate,Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginloading, loginfailure, loginsuccess } from "../Redux/Login/action";
import TextField from '@mui/material/TextField';
import styled from "styled-components";
import Button from '@mui/material/Button';

const Body = styled.div`
width:25%;
height:320px;
border: 1px solid gray;
margin:50px auto;
border-radius:8px;
background-color: whitesmoke;
`;




export const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
const {isauthenticated} = useSelector((state)=>state.login)

    const handleSubmit = () => {
        const payload = { username, password };
// console.log(username, password);
        dispatch(loginloading())
    axios.post(`https://masai-api-mocker.herokuapp.com/auth/login`, payload).then((res) => {
           console.log(username,res)
        dispatch(loginsuccess({username, token:res.data.token }));
        navigate("/")
    }).catch((err) => dispatch(loginfailure()));
       
    }

    if (isauthenticated) {
        return <Navigate to="/"/>
    }
    return (
        <Body>

            
            <h1>Login</h1>
            <TextField
        //   required
          id="outlined-required"
          label="Username"
          defaultValue="username"
            
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
            />
            <br />
           
            <br />
            
            <TextField 
          required
          id="outlined-required"
          label="Password"
          defaultValue="Password"
            
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
            />
            <br />
           <br/>

           
            <Button variant="contained" disabled={!username && !password} onClick={() => handleSubmit()}>Login</Button>
    
           
        </Body>
    )
}