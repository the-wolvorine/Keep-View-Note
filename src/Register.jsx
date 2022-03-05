import db from "./config";
import React, { useState, useEffect } from "react";
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
                  </div>
                  <div class="form-outline mb-4">
                    <input type="email" id="form3Example3cg" class="form-control form-control-lg" placeholder="Email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)}/> 
                  </div> 
                  <div class="form-outline mb-4">
                    <input type="tel" id="form3Example4cdg" class="form-control form-control-lg" placeholder="Mobile" value={userMobile} onChange={(e) => setUserMobile(e.target.value)}/>
                  </div>
                  <div class="form-outline mb-4">
                    <input type="password" id="form3Example4cg" class="form-control form-control-lg" placeholder="Password"  value={userPassword} onChange={(e) => setUserPassword(e.target.value)}/>  
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