import {useLocation} from 'react-router-dom';
import db from "./config";
import React, { useState, useEffect } from "react";
import firebase from 'firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEvernote} from '@fortawesome/free-brands-svg-icons';
import "./App.css";

function Welcome(){
    const location = useLocation();
    let email = sessionStorage.getItem('authenticatedUser');
    const [name, setName] = useState("");
    const [textarea, setTextarea] = useState("");
    const [clicked,setClicked] = useState(false);
    const [id,setId] = useState("")

    useEffect(()=>{
        if(clicked===true)
        {
            setClicked(true);
        }
        if(clicked===false)
        {
            setClicked(false);
        }
      },[clicked])
      
    useEffect(() => {
        db.collection("usersData")
        .get()
        .then((function(doc){
          doc.forEach(element => { 
              if(element.data().email===email)
              {
                  setName(element.data().name)
                  setId(element.id)
              }
          });
        })) 
        }, []);

    function handleChange(){
        db.collection("usersData").doc(id).set({
          "notes": firebase.firestore.FieldValue.arrayUnion(textarea)
        },
        {merge:true})
        alert("Note saved Succesfully")
        setClicked(false)
        setTextarea("")
      }
        
    function addNotes(){
        setClicked(true);
      }
      
    return(
        <div>
            <b><i>Welcome&nbsp; "{name}"</i></b>
            <br/>
            <br/>
            {!clicked && <button onClick={addNotes}>Add notes</button>} 
            {clicked &&<div><div className="input-group">
            <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon">
                <FontAwesomeIcon icon={faEvernote} />
                </span>
            </div>
            <textarea value={textarea} onChange={(e) => setTextarea(e.target.value)} className="form-control" rows="5"></textarea>
            </div> 
                <br/><button onClick={handleChange}>Submit</button></div>} 
            </div>
    
    );
}
export default Welcome;