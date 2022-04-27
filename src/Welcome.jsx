import db from "./config";
import React, { useState, useEffect } from "react";
import firebase from 'firebase';
import 'bootstrap/dist/css/bootstrap.css';
import "./App.css";
import './Welcome.css';
import { useNavigate } from "react-router-dom";


function Welcome(){
    let email = sessionStorage.getItem('authenticatedUser');
    const [name, setName] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
      db.collection("usersData")
      .get()
      .then((function(doc){
        doc.forEach(element => { 
            if(element.data().email===email)
            {
                setName(element.data().name)
            }    
        });
      })) 
      }, []);

    function addNotes(){
        navigate("/addnotes")
      }
      
    function viewNotes(){
         navigate("/viewnotes")
      }


    return(
      <div class="container">
        <div class="row">
          <div class="card shadow-lg p-3 bg-white rounded">
            <div class="content">
              <h6 class="category">Welcome {name}</h6>
              <div>
                <p class="description">Start Creating your notes...</p>
                <button class="btn btn-outline-dark" onClick={addNotes}>Add New Notes</button>
              </div>
              <button class="btn btn-outline-dark" onClick={viewNotes}>View Saved Notes</button>
            </div>
          </div>
        </div>
      </div>
    );
}
export default Welcome;