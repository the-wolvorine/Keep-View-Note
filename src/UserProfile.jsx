import db from "./config";
import React, { useState, useEffect } from "react";
import "./App.css";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserProfile(){
    let email = sessionStorage.getItem('authenticatedUser');
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [clickedName,setClickedName] = useState(false);
    const [clickedMobile,setClickedMobile] = useState(false);
    const [clickedPassword,setClickedPassword] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userMobile, setUserMobile] = useState("");
    const [nameErr,setNameErr] = useState({});
    const [mobileErr,setMobileErr] = useState({});
    const [passwordErr,setPasswordErr] = useState({});

    const nameValidation = () =>{
        const nameErr = {};
        let isValid = true;
     
        if(userName.trim().length<4 && !userName.length<1){
          nameErr.nameShort= "Name is too short"
          isValid = false;
        }
      
        if(userName.length<1){
          nameErr.nameEnter= "Please enter your Name"
          isValid = false;
        }
     
        setNameErr(nameErr);
        return isValid;
      
      }

      const mobileValidation = () =>{
        const mobileErr = {};
        let isValid = true;

        if(userMobile.trim().length>10){
          mobileErr.invalidMobile= "Please enter valid mobile number"
          isValid = false;
        }
        if(userMobile.trim().length<10 && !userMobile.length<1){
          mobileErr.invalidMobile= "Please enter valid mobile number"
          isValid = false;
        }

        if(userMobile.length<1){
          mobileErr.mobileEnter= "Please enter your mobile number"
          isValid = false;
        }
      
        setMobileErr(mobileErr);
        return isValid;
      
      }

      const passwordValidation = () =>{
        const passwordErr = {};
        let isValid = true;
        const up= new RegExp('[A-Z]');
        const lo= new RegExp('[a-z]');
        const nu= new RegExp('[0-9]');
        const sc= new RegExp('[#?!@$%^&*-]')
      
        if(!up.test(userPassword) && userPassword.length>=8){
          passwordErr.upperCase = "Password must contain atleast one upper case letter"
          isValid = false;
        }
        if(!lo.test(userPassword) && userPassword.length>=8){
          passwordErr.lowerCase = "Password must contain atleast one lower case letter"
          isValid = false;
        }
        if(!nu.test(userPassword) && userPassword.length>=8){
          passwordErr.numberCase = "Password must contain atleast one number"
          isValid = false;
        }
        if(!sc.test(userPassword) && userPassword.length>=8){
          passwordErr.specialCase = "Password must contain atleast one special character"
          isValid = false;
        }
        if(userPassword.length<8 && !userPassword.length<1){
          passwordErr.passwordShort= "Password is too short"
          isValid = false;
        }
        if(userPassword.length<1){
          passwordErr.passwordEnter= "Please enter your password"
          isValid = false;
        }

        setPasswordErr(passwordErr)
        return isValid;
      
      }

    toast.configure()
    useEffect(() => {
    db.collection("usersData").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if(doc.data().email===email)
            {
                setName(doc.data().name)
                setMobile(doc.data().mobile)
                setUserName(doc.data().name)
                setUserMobile(doc.data().mobile)
            }
        });
     })
    }, []);

      useEffect(()=>{
        if(clickedName===true)
        {
            setClickedName(true);
        }
        if(clickedName===false)
        {
            setClickedName(false);
        }
      },[clickedName])

      useEffect(()=>{
        if(clickedMobile===true)
        {
            setClickedMobile(true);
        }
        if(clickedMobile===false)
        {
            setClickedMobile(false);
        }
      },[clickedMobile])

      useEffect(()=>{
        if(clickedPassword===true)
        {
            setClickedPassword(true);
        }
        if(clickedPassword===false)
        {
            setClickedPassword(false);
        }
      },[clickedPassword])

    function changeName()
    {
        setClickedName(true);

    }
    function changeMobile()
    {
        setClickedMobile(true);

    }
    function changeNameSubmit(){
        const isValid = nameValidation();
        console.log(isValid)
        if(isValid){
        db.collection("usersData").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if(doc.data().email===email)
                {
                    db.collection("usersData").doc(doc.id).set({
                        "name": userName
                      },
                      {merge:true})
                }
            });
        })
        setName(userName)
        setClickedName(false)
        toast.success('Name updated Succesfully', { position: toast.POSITION.BOTTOM_CENTER, autoClose:2000})
    }
    }
    function changeMobileSubmit(){
        const isValid = mobileValidation();
        if(isValid){
        db.collection("usersData").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if(doc.data().email===email)
                {
                    db.collection("usersData").doc(doc.id).set({
                        "mobile": userMobile
                      },
                      {merge:true})
                }
            });
        })
        setMobile(userMobile)
        setClickedMobile(false)
        toast.success('Mobile number updated Succesfully', { position: toast.POSITION.BOTTOM_CENTER, autoClose:2000})
    }
    }
    function cancelEditName()
    {
        setClickedName(false)
    }
    function cancelEditMobile()
    {
        setClickedMobile(false)
    }
    function cancelEditPassword()
    {
        setClickedPassword(false)
    }
    function changePassword(){
        setClickedPassword(true);
    }
    function changePasswordSubmit(){
        db.collection("usersData").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if(doc.data().email===email)
                {
                    if(doc.data().password===currentPassword)
                    {
                        const isValid = passwordValidation();
                         if(isValid){
                        db.collection("usersData").doc(doc.id).set({
                            "password": userPassword
                          },
                          {merge:true})
                          toast.success('Password changed Succesfully', { position: toast.POSITION.BOTTOM_CENTER, autoClose:2000})
                          setClickedPassword(false)
                        }
                    }
                    else{
                        toast.error('Current password doesnt match', { position: toast.POSITION.BOTTOM_CENTER, autoClose:2000})
                    }
                }
            });
         })
}

    return(
        <div>
            <h2>User Profile</h2>
            <table class="table table-bordered table-hover">
                    <tbody>
                    <tr>
                    <th scope="row">Name</th>    
                    {!clickedName && <td>{name}&nbsp;&nbsp;<button onClick={changeName}>Edit</button></td>}
                    {clickedName && <td><input type="text" value={userName} onChange={(e) => setUserName(e.target.value)}></input>
                    {Object.keys(nameErr).map((key)=>{
                    return <div style={{color : "red"}}>{nameErr[key]}</div>
                     })}
                    &nbsp;&nbsp;<button onClick={() => {changeNameSubmit()}}>submit</button>
                    &nbsp;&nbsp;<button onClick={cancelEditName}>cancel</button></td> }
                    </tr>
                    <tr>
                    <th scope="row">Mobile</th> 
                    {!clickedMobile && <td>{mobile}&nbsp;&nbsp;<button onClick={changeMobile}>Edit</button></td> }
                    {clickedMobile && <td><input type="text" value={userMobile} onChange={(e) => setUserMobile(e.target.value)}></input>
                    {Object.keys(mobileErr).map((key)=>{
                    return <div style={{color : "red"}}>{mobileErr[key]}</div>
                     })}
                    &nbsp;&nbsp; <button onClick={() => {changeMobileSubmit()}}>submit</button>
                    &nbsp;&nbsp; <button onClick={cancelEditMobile}>cancel</button></td>}
                    </tr>
                    <tr>
                    <th scope="row">Email</th>  
                    <td>{email}</td>
                    </tr>
                </tbody>
            </table>
            {!clickedPassword && <button onClick={changePassword}>Change password</button>}
            {clickedPassword && <div><div>Enter Current Password:<input type="password" onChange={(e) => setCurrentPassword(e.target.value)}></input></div><br/>
            <div>Enter new password:<input type="password" onChange={(e) => setUserPassword(e.target.value)}></input></div>
            {Object.keys(passwordErr).map((key)=>{
                    return <div style={{color : "red"}}>{passwordErr[key]}</div>
                     })}
            <button onClick={changePasswordSubmit}>Submit</button>&nbsp;
            <button onClick={cancelEditPassword}>cancel</button>
            </div>}
        </div>
    
    );
}
export default UserProfile;