import {useLocation} from 'react-router-dom';
import db from "./config";
import React, { useState, useEffect } from "react";
import "./App.css";

function UserProfile(){
    let email = sessionStorage.getItem('authenticatedUser');
    const location = useLocation();
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    db.collection("usersData")
      .get()
      .then((function(doc){
        doc.forEach(element => {
            if(element.data().email===email)
            {
                setName(element.data().name)
                setMobile(element.data().mobile)
            }
           
        });
      }))
    return(
        <div>
            <h2>User Profile</h2>
            <table class="table table-bordered table-hover">
                    <tbody>
                    <tr>
                    <th scope="row">Name</th>    
                    <td>{name}</td>
                    </tr>
                    <tr>
                    <th scope="row">Mobile</th>  
                    <td>{mobile}</td>
                    </tr>
                    <tr>
                    <th scope="row">Email</th>  
                    <td>{email}</td>
                    </tr>
                </tbody>
            </table>
        </div>
   
    );
}
export default UserProfile;
