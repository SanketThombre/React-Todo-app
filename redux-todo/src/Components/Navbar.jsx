import {Link} from "react-router-dom";
import { logout } from "../Redux/Login/action";

import { useDispatch } from "react-redux";
import Button from '@mui/material/Button';
import styled from "styled-components";


export const Navbar = () => {
const dispatch = useDispatch();
    
    return (
        <div style={{ 
            width: '100%',
            height:"50px",
            display: 'flex',
            justifyContent: "space-evenly",
            
            // border: "1px solid black",
            alignItems: "center", 
            backgroundColor:"#F7E9D7"
        }}>
            <Link style={{textDecorationLine:"none"}}to="/"> <Button variant="outlined" >Home</Button> </Link>
            <Link style={{textDecorationLine:"none"}}to="/login"> <Button variant="outlined">Login</Button></Link>
            <Link style={{textDecorationLine:"none"}}to="/signup"> <Button variant="outlined">SignUp</Button></Link>
            <Link style={{ textDecorationLine: "none" }} to="/todos-create"> <Button variant="outlined">Create Todos</Button></Link>
            <Button variant="outlined" onClick={() => dispatch(logout())}>LogOut</Button>
        </div>
    )
}