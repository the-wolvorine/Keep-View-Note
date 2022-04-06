import db from "./config";
import React, { useState, useEffect } from "react";
import firebase from 'firebase';
import 'bootstrap/dist/css/bootstrap.css';
import "./App.css";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Welcome.css';

function Welcome(){
    let email = sessionStorage.getItem('authenticatedUser');
    const [name, setName] = useState("");
    const [textarea, setTextarea] = useState("");
    const [textarea1, setTextarea1] = useState("");
    const [clicked,setClicked] = useState(false);
    const [notes, setNotes] = useState({});
    const [id,setId] = useState("")
    const [clickedViewNote,setClickedViewNote] = useState(false);
    const [clickedEditNote,setClickedEditNote] = useState(false);
    const [editnote, setEditNote] = useState("");

    toast.configure()
    const notify = ()=>{
        toast.success('Note saved Succesfully', { position: toast.POSITION.BOTTOM_CENTER, autoClose:2000})
      } 

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

      useEffect(()=>{
        if(clickedEditNote===true)
        {
            setClickedEditNote(true);
        }
        if(clickedEditNote===false)
        {
            setClickedEditNote(false);
        }
      },[clickedEditNote])
      
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
        notify()
        setClicked(false)
        db.collection("usersData").doc(id).get().then((function(doc){
        setNotes(doc.data().notes)
        })) 
      }

      function handleChangeEdit(){
        db.collection("usersData").doc(id).set({
            "notes": firebase.firestore.FieldValue.arrayRemove(editnote)
          },
          {merge:true})
        db.collection("usersData").doc(id).set({
          "notes": firebase.firestore.FieldValue.arrayUnion(textarea1)
        },
        {merge:true})
        setClickedEditNote(false)
        db.collection("usersData").doc(id).get().then((function(doc){
        setNotes(doc.data().notes)
        })) 
        toast.success('Note Updated Succesfully', { position: toast.POSITION.BOTTOM_CENTER, autoClose:2000})
        setTextarea1("")
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

    function cancelChangeEdit(){
        setClickedEditNote(false)
    }

    function editNote(note){
        setEditNote(note)
        setClickedEditNote(true)
    }

    function delNote(note){
        db.collection("usersData").doc(id).set({
            "notes": firebase.firestore.FieldValue.arrayRemove(note)
          },
          {merge:true})
          toast.warning('Note deleted Succesfully', { position: toast.POSITION.BOTTOM_CENTER, autoClose:2000})
          db.collection("usersData").doc(id).get().then((function(doc){
            setNotes(doc.data().notes)
            })) 
    }
    
    return(
        <div class="container bootstrap snippets bootdeys">
          <div class="row">
              <div class="content-card">
                  <div class="card-big-shadow">
                      <div class="card" data-background="color" data-color="blue" data-radius="none">
                          <div class="content">
                              <h6 class="category">Welcome {name}</h6>
                              {!clicked && !clickedViewNote && 
                                <div>
                                  <p class="description">Start Creating your notes...</p>
                                  <button class="btn btn-outline-dark" onClick={addNotes}>Add New Notes</button>
                                </div>}
                              {!clicked && !clickedViewNote && <button class="btn btn-outline-dark" onClick={viewNotes}>View Saved Notes</button>}
                              {clicked &&
                                <div className="input-group">
                                  <div class="input-group-pretend">
                                    <textarea value={textarea} onChange={(e) => setTextarea(e.target.value)} className="form-control" id="exampleFormControlTextarea1" rows="5"></textarea>
                                    <button class="btn btn-outline-dark" onClick={handleChange}>Submit</button>
                                    <button class="btn btn-dark" onClick={cancelChange}>Cancel</button>
                                  </div>
                                </div>
                              } 
                          </div>
                      </div>
                  </div>
              </div>
            <br/>
            <br/>
            {clickedEditNote &&<div><b>Update Your Note Here</b><div className="input-group">
            <textarea value={textarea1} onChange={(e) => setTextarea1(e.target.value)} className="form-control" id="exampleFormControlTextarea1" rows="5"></textarea>
            </div> 
                <br/><button class="btn btn-outline-dark" onClick={handleChangeEdit}>Submit</button>&nbsp;
                <button class="btn btn-dark" onClick={cancelChangeEdit}>Cancel</button></div>} 
            {clickedViewNote && 
            <div>
                <table class="table table-bordered table-hover">
                <thead><b><i>NOTES</i></b></thead>
                <tbody>{notes.map((notes)=>
                <tr><li>{notes}<td><button class="btn btn-outline-dark" onClick={() => {editNote(notes);setTextarea1(notes)}}>Update</button>&nbsp;<button class="btn btn-dark" onClick={() => delNote(notes)}>Delete</button></td>
                </li></tr>)
                }</tbody></table>
            </div>}
            {clickedViewNote && <div><button class="btn btn-dark" onClick={cancelviewNote}>Close</button></div>}
            </div>
        </div>
    );
}
export default Welcome;