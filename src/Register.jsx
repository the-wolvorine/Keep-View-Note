import db from "./config";
import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import "./Register.css";
import 'bootstrap/dist/css/bootstrap.css';
import Login from "./Login";
  
function Register() {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userMobile, setUserMobile] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [usersData, setUsersData] = useState([]);
  const [nameErr,setNameErr] = useState({});
  const [emailErr,setEmailErr] = useState({});
  const [mobileErr,setMobileErr] = useState({});
  const [passwordErr,setPasswordErr] = useState({});
  const valid = useRef(true)

  useEffect(() => {
    db.collection("usersData").onSnapshot((snapshot) => {
      setUsersData(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);
  
  const submit = (e) => {
    e.preventDefault();
    const isValid = formValidation();
    if(isValid){
    db.collection("usersData").add({
      name: userName,
      password: userPassword,
      email: userEmail,
      mobile: userMobile
    });

    setUserName("");
    setUserPassword("");
    setUserMobile("");
    setUserEmail("");
    alertF()
  };
}

const formValidation = () =>{
  const nameErr = {};
  const emailErr = {};
  const mobileErr = {};
  const passwordErr = {};
  let isValid = true;
  const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
  const validPassword = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$');
  const up= new RegExp('[A-Z]');
  const lo= new RegExp('[a-z]');
  const nu= new RegExp('[0-9]');
  const sc= new RegExp('[#?!@$%^&*-]')

  db.collection("usersData")
    .get()
    .then((function(doc){
      let count=0;
      let c=doc.size;
      let c1=0;
      doc.forEach(element => { 
        count=count+1;
          if(element.data().email===userEmail)
          {
          }
          else{
            c1=c1+1;
          }
          if(count===c)
          {
              if(c1===c)
              {
              }
              else
              {
                const emailErr = {};
                emailErr.emailExists = "We already have your email in our database, Please login instead"
                setEmailErr(emailErr)
                valid.current= false;
              }
            }
                
      });
    }))
  if(valid.current===false)
  {
    isValid=false;
    valid.current=true;
  }
  if(!validEmail.test(userEmail) && !userEmail.length<1){
    emailErr.emailError = "Please enter valid email address"
    isValid = false;
  }
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
  if(!validPassword.test(userPassword) && userPassword.length>=8){
    passwordErr.emailError = "Please enter valid password"
    isValid = false;
  }
  if(userName.trim().length<4 && !userName.length<1){
    nameErr.nameShort= "Name is too short"
    isValid = false;
  }
  if(userMobile.trim().length>10){
    mobileErr.invalidMobile= "Please enter valid mobile number"
    isValid = false;
  }
  if(userMobile.trim().length<10 && !userMobile.length<1){
    mobileErr.invalidMobile= "Please enter valid mobile number"
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
  if(userEmail.length<1){
    emailErr.emailEnter= "Please enter your email address"
    isValid = false;
  }
  if(userName.length<1){
    nameErr.nameEnter= "Please enter your Name"
    isValid = false;
  }
  if(userMobile.length<1){
    mobileErr.mobileEnter= "Please enter your mobile number"
    isValid = false;
  }

  setNameErr(nameErr);
  setEmailErr(emailErr);
  setMobileErr(mobileErr);
  setPasswordErr(passwordErr)
  return isValid;

}
  
  function alertF(){
      alert("Registered Succesfully")
  }

  return (
    <div class="mask d-flex align-items-center gradient-custom-3">
      <div class="container">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-12 col-md-9 col-lg-7 col-xl-6">
            <div class="card" style={{borderRadius: '15px' ,margin: '1rem'}}>
              <div class="card-body p-5">
                <h2 class="text-capitalize text-center p-2">Create your account</h2>
                <form>
                  <div class="form-outline mb-4">
                    <input type="text" id="form3Example1cg" class="form-control form-control-lg" placeholder="Full Name" value={userName} onChange={(e) => setUserName(e.target.value)}/>
                    {Object.keys(nameErr).map((key)=>{
                    return <div style={{color : "red"}}>{nameErr[key]}</div>
                     })}
                  </div>
                  <div class="form-outline mb-4">
                    <input type="email" id="form3Example3cg" class="form-control form-control-lg" placeholder="Email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)}/> 
                    {Object.keys(emailErr).map((key)=>{
                    return <div style={{color : "red"}}>{emailErr[key]}</div>
                     })}
                  </div> 
                  <div class="form-outline mb-4">
                    <input type="tel" id="form3Example4cdg" class="form-control form-control-lg" placeholder="Mobile" value={userMobile} onChange={(e) => setUserMobile(e.target.value)}/>
                    {Object.keys(mobileErr).map((key)=>{
                    return <div style={{color : "red"}}>{mobileErr[key]}</div>
                     })}
                  </div>
                  <div class="form-outline mb-4">
                    <input type="password" id="form3Example4cg" class="form-control form-control-lg" placeholder="Password"  value={userPassword} onChange={(e) => setUserPassword(e.target.value)}/>  
                    {Object.keys(passwordErr).map((key)=>{
                    return <div style={{color : "red"}}>{passwordErr[key]}</div>
                     })}
                  </div>
                  <div class="d-flex justify-content-center">
                    <button type="submit" onClick={submit} class="btn btn-block btn-lg btn-dark">Register</button>
                  </div>
                  <p class="text-center text-muted mt-5 mb-0">Have already an account? <a href="/login" onClick={<Login/>} class="fw-bold text-body"><u>Login here</u></a></p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
  
export default Register;