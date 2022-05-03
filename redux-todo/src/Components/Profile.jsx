

import { useState, useEffect } from "react";
import {useSelector} from "react-redux"
import axios from "axios";
import "./Home.css"

export const Profile = ({username, token}) => {
    const [profile, setProfile] = useState({});

    console.log(username);

    useEffect(() => {
        fetch(`https://masai-api-mocker.herokuapp.com/user/${username}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }).then((res) => res.json())
            .then((res) => setProfile(res))
        .catch((er)=>console.log(er))
    }, []);

    return (
        <div>
            <div id="head">Profile Details</div> 
            <div id="info">
            <h2 id="profile">Name : {profile.name}</h2>
            <h2 id="profile">Email : {profile.email}</h2>
            <h2 id="profile">Username : {profile.username}</h2>
            <h2 id="profile">Mobile : {profile.mobile}</h2>
                <h2 id="profile">Description : {profile.description}</h2>
                </div>
        </div>
    )

}