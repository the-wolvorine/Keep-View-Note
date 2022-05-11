import db from "./config";
import React, { useState, useEffect } from "react";
import "./App.css";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./UserProfile.css";

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
    const [mobilenumberValue, setmobilenumberValue] = useState("");

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

      function formatPhoneNumber(value) {
        if (!value) return value;
      
        const phoneNumber = value.replace(/[^\d]/g, "");
      
        const phoneNumberLength = phoneNumber.length;
    
        if (phoneNumberLength < 4){
          setUserMobile(phoneNumber)
          return phoneNumber;
        }
    
        else if (phoneNumberLength < 7) {
          setUserMobile(phoneNumber)
          return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
        }
        else if(phoneNumberLength===10){
          setUserMobile(phoneNumber)
          return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
            3,
            6
          )}-${phoneNumber.slice(6, 10)}`;
        }
        else {
          setUserMobile(phoneNumber.slice(0,10))
          return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
          3,
          6
        )}-${phoneNumber.slice(6, 10)}`;
        }
      }
  

      function DisplayMobileNumber(value) {
        if (!value) return value;
      
        const phoneNumber = value.replace(/[^\d]/g, "");
        setUserMobile(phoneNumber)
        
        setmobilenumberValue(`(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
            3,
            6
          )}-${phoneNumber.slice(6, 10)}`);
      }


      const handleInputMobile = (e) => {
        const formattedPhoneNumber = formatPhoneNumber(e.target.value);
        setmobilenumberValue(formattedPhoneNumber);
      };

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
                DisplayMobileNumber(doc.data().mobile)
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
        setTimeout(function(){
          setClickedName(false);
      },10000)

    }
    function changeMobile()
    {
        setClickedMobile(true);
        setTimeout(function(){
          setClickedMobile(false);
      },10000)

    }
    function changeNameSubmit(){
        const isValid = nameValidation();
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
<section class="vh-100" style={{backgroundColor : "#f4f5f7"}}>
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col mb-lg-0">
        <div class="card mb-3" style={{borderRadius: '15px' ,margin: '.5rem'}}>
          <div class="row g-0">
            <div class="col-md-3 gradient-custom text-center text-white" style={{borderRadius: '.5rem'}}>
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                alt="Avatar"
                class="img-fluid my-5"
                // style={{width: '80px'}}
              />
               {/* <i class="far fa-edit mb-5"></i> */}
            </div>
            <div class="col-md-8">
              <div class="card-body p-4">
                <h4>Personal Information</h4>
                  <hr class="mt-0 mb-4"/>
                  {/* <div class="row pt-1"> */}
                  <div class="col-md-auto">
                    <h6>Name</h6>
                    {!clickedName && <p class="text-muted" onClick={changeName}>{name}&nbsp;&nbsp;</p>}
                    {clickedName && <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} onKeyPress={(e) => { if (e.key === "Enter") { changeNameSubmit();}}}></input>}
                    {Object.keys(nameErr).map((key)=>{
                    return <div style={{color : "red"}}>{nameErr[key]}</div>
                     })}
                    <h6>Phone</h6>
                    {!clickedMobile && <p class="text-muted" onClick={changeMobile} >{mobilenumberValue}&nbsp;&nbsp;</p>}
                    {clickedMobile && <input type="text" onChange={(e) => handleInputMobile(e)} value={mobilenumberValue} onKeyPress={(e) => { if (e.key === "Enter") { changeMobileSubmit();}}}></input>}
                    {Object.keys(mobileErr).map((key)=>{
                    return <div style={{color : "red"}}>{mobileErr[key]}</div>
                     })}
                    <h6>Email</h6>
                    <p class="text-muted">{email}</p>
                    {!clickedPassword && <a onClick={changePassword} class="fw-bold text-body" href="#"><u>Change Password</u></a>}
                    {clickedPassword && 
                      <div>
                        <h6>Enter Current Password:</h6>
                        <input type="password" onChange={(e) => setCurrentPassword(e.target.value)}></input>
                        <h6 class="spacing-style">Enter new password:</h6>
                        <input type="password"  onChange={(e) => setUserPassword(e.target.value)}></input>
                        <br></br>
                        {Object.keys(passwordErr).map((key)=>{
                    return <div style={{color : "red"}}>{passwordErr[key]}</div>
                     })}
                        <button onClick={changePasswordSubmit} class="btn btn-dark" style={{padding: '5px', minWidth: '90px', margin: 'revert'}}>Submit</button>
                        <button onClick={cancelEditPassword} class="btn btn-dark" style={{padding: '5px', minWidth: '90px'}}>cancel</button>
                      </div>
                    }
                  </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</div>
 
</section>
</div>

    );
    }
export default UserProfile;



