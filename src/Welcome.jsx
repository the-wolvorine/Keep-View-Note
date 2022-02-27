import {useLocation} from 'react-router-dom';
import db from "./config";
import React, { useState, useEffect } from "react";
import "./App.css";

const Welcome=()=>{
    const location = useLocation();
    const [name, setName] = useState("");
    db.collection("usersData")
      .get()
      .then((function(doc){
        doc.forEach(element => { 
            console.log(element.data().email+"   "+location.state.email)
            if(element.data().email===location.state.email)
            {
                setName(element.data().name)
                console.log("name is"+name)
            }
            
        });
      })) 
    return(
        <div>
            welcome {name}
        </div>
    
    );
}
export default Welcome;