import db from "./config";
import React, { useState, useEffect } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";
import AuthenticationService from "./AuthenticationService";
import {toast} from 'react-toastify';
import { GoogleLogin } from "react-google-login";
import { clientId } from "./config";
import Register from "./Register.jsx";
import 'react-toastify/dist/ReactToastify.css';
import "./Login.css";

function Login(){
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [usersData, setUsersData] = useState([]);
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userMobile, setUserMobile] = useState("");
  const [gCount, setGCount] = useState(0);
  
  toast.configure()

  useEffect(()=>{
    if(gCount===0)
    {
        setGCount(0);
    }
    if(gCount===1)
    {
        setGCount(1);
    }
  },[gCount])

  useEffect(() => {
        db.collection("usersData").onSnapshot((snapshot) => {
          setUsersData(
            snapshot.docs.map((doc) => ({
              data: doc.data(),
            }))
          );
        });
   }, []);
  
   const notify1 = ()=>{
    toast.error('Please enter valid credentials', { position: toast.POSITION.BOTTOM_CENTER, autoClose:2000})
  } 
  const notify2 = ()=>{
    toast.error('Sorry we didnt find your account, Please sign up', {position: toast.POSITION.BOTTOM_CENTER, autoClose:2000})
  } 

  function authenticate(){
     db.collection("usersData")
      .get()
      .then((function(doc){
        let c=doc.size;
        let count=0;
        doc.forEach(element => {
            if(element.data().email===userEmail)
            {
                if(element.data().password===userPassword)
                {
                   sendSubmit();
                }
                else{
                  notify1()
                }
            }
            else{
              count=count+1;
            }
            if(count===c)
            {
              notify2()
            }
        });
      }))
  }
  const onSuccess = (res) => {
    let user = res.profileObj;
    db.collection("usersData")
      .get()
      .then((function(doc){
        var count=0;
        console.log(count)
        doc.forEach(element => {
          if(element.data().email===user.email)
          {
            count=1;
            AuthenticationService.registerSuccessfulLogin(user.email,user.googleId)
            navigate("/welcome",{state:{email:user.email}})
          }
        }
      )
    if(count===0){
      db.collection("usersData").add({
        name: user.name,
        email: user.email,
        mobile: "",
        authentication: "google"
      });
  
      setUserName("");
      setUserEmail("");
      setUserMobile("");
      AuthenticationService.registerSuccessfulLogin(user.email,user.googleId)
      navigate("/welcome",{state:{email:user.email}})
    }
    }));
  };
  
  const sendSubmit = () => {
      AuthenticationService.registerSuccessfulLogin(userEmail,userPassword)
      navigate("/welcome",{state:{email:userEmail}});
      
  };
  const loginClicked= (e) => {
    authenticate();
  };
  return(
    <div class="mask d-flex align-items-center gradient-custom-3">
    <div class="container">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-9 col-lg-7 col-xl-6">
          <div class="card" style={{borderRadius: '15px' ,margin: '1rem'}}>
            <div class="card-body p-5">
            <h2 class="text-capitalize text-center p-2">Sign in</h2>
                <div class="form-outline mb-4">
                  <input type="email" id="form3Example3cg" class="form-control form-control-lg" placeholder="Email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} onKeyPress={(e) => { if (e.key === "Enter") { loginClicked();}}}/> 
                </div> 
                <div class="form-outline mb-4">
                  <input type="password" id="form3Example4cg" class="form-control form-control-lg" placeholder="Password"  value={userPassword} onChange={(e) => setUserPassword(e.target.value)} onKeyPress={(e) => { if (e.key === "Enter") { loginClicked();}}}/>  
                </div>
                <div class="d-flex justify-content-center">
                <button onClick={loginClicked} className="btn btn-block btn-lg btn-dark">Login</button>
                </div>
                <div class="or-container">
                  <div class="line-separator"></div>
                  <div class="or-label">or</div>
                  <div class="line-separator"></div>
                </div>
                <div class="d-flex justify-content-center">
                  <GoogleLogin
                    clientId={clientId}
                    render={renderProps => (
                      <button class="btn btn-block btn-lg btn-dark" onClick={renderProps.onClick} ><i class="fa fa-google"></i> Sign In With Google</button>
                    )}
                    onSuccess={onSuccess}
                    style={{ marginTop: '100px' }}
                    isSignedIn={true}
                  />
                </div>
                <p class="text-center text-muted mt-5 mb-0">Don't have an account? <a href="/register" onClick={<Register/>} class="fw-bold text-body"><u>Signup here</u></a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Login;