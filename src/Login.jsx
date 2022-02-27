import db from "./config";
import React, { useState, useEffect } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";

function Login(){
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [verified, setVerified ] = useState(false);
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
          var a="";
      db.collection("usersData")
      .get()
      .then((function(doc){
        doc.forEach(element => { 
            if(element.data().email===userEmail)
            {
                if(element.data().password===userPassword)
                {
                   setVerified(true)
                }
            }
            
        });
        console.log(verified)
      })) 
    }
    const sendSubmit = () => {

        navigate("/welcome",{state:{email:userEmail}});
        
      };
    const loginClicked= (e) => {
      e.preventDefault()
        authenticate();
        if(verified)
        {
            sendSubmit();
            console.log("working fine")
        }
        console.log("login clicked "+userEmail+userPassword)
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
        />
        <br/>
        Password:<br/><br/><input
        type="password"
        className="row align-items-center g-3"
        placeholder="password"
        value={userPassword}
        onChange={(e) => setUserPassword(e.target.value)}
        />
        <br/>
        <button onClick={loginClicked} className="btn btn-primary">Login</button>
        </center>
    </div>
    )
}



export default Login;