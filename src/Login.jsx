import db from "./config";
import React, { useState, useEffect } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";
import AuthenticationService from "./AuthenticationService";

function Login(){
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [usersData, setUsersData] = useState([]);
  const navigate = useNavigate();

  
  useEffect(() => {
      db.collection("usersData").onSnapshot((snapshot) => {
        setUsersData(
          snapshot.docs.map((doc) => ({
            data: doc.data(),
          }))
          
        );
      });
    }, []);

    function authenticate(){

    db.collection("usersData")
    .get()
    .then((function(doc){
      doc.forEach(element => { 
          if(element.data().email===userEmail)
          {
              if(element.data().password===userPassword)
              {
                 sendSubmit();
              }
              else{
                alert("Please enter valid credentials")
              }
          }
          
      });
    }))  
  }
  const sendSubmit = () => {
      AuthenticationService.registerSuccessfulLogin(userEmail,userPassword)
      navigate("/welcome",{state:{email:userEmail}});
      
    };
  const loginClicked= (e) => {
    authenticate();
  }
  return(
    <div class="mask d-flex align-items-center gradient-custom-3">
    <div class="container">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-9 col-lg-7 col-xl-6">
          <div class="card" style={{borderRadius: '15px' ,margin: '1rem'}}>
            <div class="card-body p-5">
            <h2 class="text-capitalize text-center p-2">Sign in</h2>
              <form>
                <div class="form-outline mb-4">
                  <input type="email" id="form3Example3cg" class="form-control form-control-lg" placeholder="Email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)}/> 
                </div> 
                <div class="form-outline mb-4">
                  <input type="password" id="form3Example4cg" class="form-control form-control-lg" placeholder="Password"  value={userPassword} onChange={(e) => setUserPassword(e.target.value)}/>  
                </div>
                <div class="d-flex justify-content-center">
                <button onClick={loginClicked} className="btn btn-block btn-lg btn-dark">Login</button>
                </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Login;