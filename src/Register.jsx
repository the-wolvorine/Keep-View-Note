import db from "./config";
import React, { useState, useEffect } from "react";
import "./App.css";
  
function Register() {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userMobile, setUserMobile] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [usersData, setUsersData] = useState([]);
  
  useEffect(() => {
    db.collection("usersData").onSnapshot((snapshot) => {
      setUsersData(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    console.log({ usersData });
  }, []);
  
  const submit = (e) => {
    e.preventDefault();
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
  
  function alertF(){
      alert("Registered Succesfully")
  }
  return (
    <div className="App">
    <div className="App__form">
             <form>
Name: 
    <div className="row align-items-center g-3">
             <input
        type="text"
        className="row align-items-center g-3"
        placeholder="Name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      /></div>
Email: 
      <div className="row align-items-center g-3">
      <input
        type="text"
        className="row align-items-center g-3"
        placeholder="email"
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
      /></div>
Mobile Number: 
      <div className="row align-items-center g-3">
      <input
        type="number"
        className="row align-items-center g-3"
        placeholder="Mobile number"
        value={userMobile}
        onChange={(e) => setUserMobile(e.target.value)}
      /></div>
Create new Password: 
      <div className="row align-items-center g-3">
      <input
        type="password"
        placeholder="Password"
        value={userPassword}
        onChange={(e) => setUserPassword(e.target.value)}
      /></div>
<br/>
      <button onClick={submit} className="btn btn-primary">Register</button>
      
      </form>
    </div>
  </div>
);
}
  
export default Register;