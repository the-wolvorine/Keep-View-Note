import {useLocation} from 'react-router-dom';
import db from "./config";
import React, { useState, useEffect } from "react";
import firebase from 'firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEvernote} from '@fortawesome/free-brands-svg-icons';
import "./App.css";

function Welcome(){
    let email = sessionStorage.getItem('authenticatedUser');
    const [name, setName] = useState("");
    const [textarea, setTextarea] = useState("");
    const [clicked,setClicked] = useState(false);
    const [notes, setNotes] = useState({});
    const [id,setId] = useState("")
    const [clickedViewNote,setClickedViewNote] = useState(false);

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

    useEffect(()=>{
        if(clickedViewNote===true)
        {
            setClickedViewNote(true);
        }
        if(clickedViewNote===false)
        {
            setClickedViewNote(false);
        }
      },[clickedViewNote])
      
    useEffect(() => {
        db.collection("usersData")
        .get()
        .then((function(doc){
          doc.forEach(element => { 
              if(element.data().email===email)
              {
                  setName(element.data().name)
                  setNotes(element.data().notes)
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
        db.collection("usersData").doc(id).get() .then((function(doc){
        setNotes(doc.data().notes)
        })) 
      }
        
    function addNotes(){
        setClicked(true);
      }
      
    function viewNotes(){
         setClickedViewNote(true)
      }

    function cancelviewNote(){
        setClickedViewNote(false)
     }

    function cancelChange(){
        setClicked(false)
    }
    
    return(
        <div>
            <b><i>Welcome {name}</i></b>
            <br/>
            <br/>
            {!clicked && !clickedViewNote && <button onClick={addNotes}>Add notes</button>} 
            {!clicked && !clickedViewNote && <button onClick={viewNotes}>View Saved Notes</button>}
            {clickedViewNote && <div>{notes.map((notes)=><li>{notes}</li>)}</div>}
            {clickedViewNote && <div><button onClick={cancelviewNote}>Close</button></div>}
            {clicked &&<div><div className="input-group">
            <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon">
                <FontAwesomeIcon icon={faEvernote} />
                </span>
            </div>
            <textarea value={textarea} onChange={(e) => setTextarea(e.target.value)} className="form-control" id="exampleFormControlTextarea1" rows="5"></textarea>
            </div> 
                <br/><button onClick={handleChange}>Submit</button>
                <button onClick={cancelChange}>Cancel</button></div>} 
            </div>
    );
}
export default Welcome;