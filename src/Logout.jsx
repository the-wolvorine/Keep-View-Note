import React, { Component } from 'react'
import AuthenticationService from './AuthenticationService';
import { useNavigate } from "react-router-dom";

function Logout(){
    const navigate = useNavigate();
    setTimeout(function(){
        AuthenticationService.logout()
        navigate("/");
    },3000)
    return (
        <div>
        <center><b>Logout Successful.<br/>
        Thanks for using our App.</b>
        <br/><br/>
        You will now be redirected to Home page</center>      
        </div>
    )
        }

export default Logout;