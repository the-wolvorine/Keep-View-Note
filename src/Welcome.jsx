import {useLocation} from 'react-router-dom';
import db from "./config";
import React, { useState, useEffect } from "react";
import "./App.css";

const Welcome=()=>{
    const location = useLocation();
    let email = sessionStorage.getItem('authenticatedUser');
    const [name, setName] = useState("");

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
    return(
        <div>
            <h3><center>Welcome &nbsp;{name}</center></h3>
        </div>
    
    );
}
export default Welcome;