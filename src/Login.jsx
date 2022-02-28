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
  <div>
      <center>
      <br/>
      <br/>
      Email:<br/><br/><input
      type="text"
      className="row align-items-center g-3"
      placeholder="email address"
      value={userEmail}
      onChange={(e) => setUserEmail(e.target.value)}
      onKeyPress={(e) => { if (e.key === "Enter") { loginClicked();}}}
      />
      <br/>
      Password:<br/><br/><input
      type="password"
      className="row align-items-center g-3"
      placeholder="password"
      value={userPassword}
      onChange={(e) => setUserPassword(e.target.value)}
      onKeyPress={(e) => { if (e.key === "Enter") { loginClicked();}}}
      />
      <br/>
      <button onClick={loginClicked} className="btn btn-primary">Login</button>
      </center>
  </div>
  )
}



export default Login;