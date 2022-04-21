import db from "./config";
import React, { useState, useEffect } from "react";
import firebase from 'firebase';
import 'bootstrap/dist/css/bootstrap.css';
import "./App.css";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Welcome.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';  
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML} from 'draft-convert';
import DOMPurify from 'dompurify';
import { useNavigate } from "react-router-dom";


function ViewNotes(){
    var CryptoJS = require("crypto-js");
    let email = sessionStorage.getItem('authenticatedUser');
    const [name, setName] = useState("");
    const [notes, setNotes] = useState([]);
    const [lockednotes, setLockedNotes] = useState({});
    const [id,setId] = useState("")
    const [clickedEditNote,setClickedEditNote] = useState(false);
    const [editnote, setEditNote] = useState("");
    const [clickedEditNoteLocked,setClickedEditNoteLocked] = useState(false);
    const [editnotelocked, setEditNoteLocked] = useState("");
    const [unlocknotes, setUnlockNotes] = useState(false);
    const [userPassword, setUserPassword] = useState("");
    const [originalPassword, setOriginalPassword] = useState("");
    const [unlockSuccess , setUnlockSuccess] = useState(false);
    const [convertedContent, setConvertedContent] = useState("");
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const [empty, setEmpty] = useState(false);
    const [emptylocked, setEmptyLocked] = useState(false);
    const navigate = useNavigate();

    toast.configure()

      useEffect(()=>{
        if(empty===true)
        {
            setEmpty(true);
        }
        if(empty===false)
        {
            setEmpty(false);
        }
      },[empty])

      useEffect(()=>{
        if(emptylocked===true)
        {
            setEmptyLocked(true);
        }
        if(emptylocked===false)
        {
            setEmptyLocked(false);
        }
      },[emptylocked])

      useEffect(()=>{
        if(unlockSuccess===true)
        {
            setUnlockSuccess(true);
        }
        if(unlockSuccess===false)
        {
            setUnlockSuccess(false);
        }
      },[unlockSuccess])

      useEffect(()=>{
        if(unlocknotes===true)
        {
            setUnlockNotes(true);
        }
        if(unlocknotes===false)
        {
            setUnlockNotes(false);
        }
      },[unlocknotes])

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

      useEffect(()=>{
        if(clickedEditNoteLocked===true)
        {
            setClickedEditNoteLocked(true);
        }
        if(clickedEditNoteLocked===false)
        {
            setClickedEditNoteLocked(false);
        }
      },[clickedEditNoteLocked])
      
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
                  setLockedNotes(element.data().noteslocked)
                  setOriginalPassword(element.data().password)
                  if(element.data().notes.length===0){
                      setEmpty(true)
                  }
                  if(element.data().notes.length>0){
                      setEmpty(false)
                  }
                  if(element.data().noteslocked===0){
                    setEmptyLocked(true)
                }
                if(element.data().noteslocked>0){
                    setEmptyLocked(false)
                }
              }    
          });
        })) 
        }, []);

    function update(){
      db.collection("usersData").doc(id).get().then((function(doc){
        setLockedNotes(doc.data().noteslocked)
        setNotes(doc.data().notes)
        updateEmpty()
        }))
    }
      function handleChangeEdit(){
        var ciphertext = CryptoJS.AES.encrypt(convertedContent, email).toString();
        if(convertedContent.length>7){
        db.collection("usersData").doc(id).set({
            "notes": firebase.firestore.FieldValue.arrayRemove(editnote)
          },
          {merge:true})
          db.collection("usersData").doc(id).set({
            "notes": firebase.firestore.FieldValue.arrayUnion(ciphertext)
          },
          {merge:true})
        setClickedEditNote(false)
        db.collection("usersData").doc(id).get().then((function(doc){
        setNotes(doc.data().notes)
        updateEmpty()
        })) 
        toast.success('Note Updated Succesfully', { position: toast.POSITION.BOTTOM_CENTER, autoClose:2000})
      }
        else{
          toast.error('Please write something to update', { position: toast.POSITION.BOTTOM_CENTER, autoClose:2000})
        }
      }

      function handleChangeEditLocked(){
        var ciphertext = CryptoJS.AES.encrypt(convertedContent, email).toString();
        if(convertedContent.length>7){
        db.collection("usersData").doc(id).set({
            "noteslocked": firebase.firestore.FieldValue.arrayRemove(editnotelocked)
          },
          {merge:true})
        db.collection("usersData").doc(id).set({
          "noteslocked": firebase.firestore.FieldValue.arrayUnion(ciphertext)
        },
        {merge:true})
        setClickedEditNoteLocked(false)
        db.collection("usersData").doc(id).get().then((function(doc){
        setLockedNotes(doc.data().noteslocked)
        updateEmpty()
        })) 
        toast.success('Note Updated Succesfully', { position: toast.POSITION.BOTTOM_CENTER, autoClose:2000})
      }
        else{
          toast.error('Please write something to update', { position: toast.POSITION.BOTTOM_CENTER, autoClose:2000})
        }
      }
  
    function cancelviewNote(){
        setUnlockNotes(false)
        setUnlockSuccess(false)
        navigate("/welcome")
     }

    function cancelChangeEdit(){
        setClickedEditNote(false)
    }

    function cancelChangeEditLocked(){
      setClickedEditNoteLocked(false)
  }

    function editNote(note){
        setEditNote(note)
        setClickedEditNote(true)
    }

    function editNoteLocked(note){
      setEditNoteLocked(note)
      setClickedEditNoteLocked(true)
  }

    function delNote(note){
        db.collection("usersData").doc(id).set({
            "notes": firebase.firestore.FieldValue.arrayRemove(note)
          },
          {merge:true})
          toast.warning('Note deleted Succesfully', { position: toast.POSITION.BOTTOM_CENTER, autoClose:2000})
          db.collection("usersData").doc(id).get().then((function(doc){
            setNotes(doc.data().notes)
            setLockedNotes(doc.data().noteslocked)
            updateEmpty()
            })) 
    }

    function updateEmpty(){
        db.collection("usersData")
        .get()
        .then((function(doc){
          doc.forEach(element => { 
              if(element.data().email===email)
              {
                  if(element.data().notes.length===0){
                      setEmpty(true)
                  }
                  if(element.data().notes.length>0){
                      setEmpty(false)
                  }
                  if(element.data().noteslocked===0){
                    setEmptyLocked(true)
                }
                if(element.data().noteslocked>0){
                    setEmptyLocked(false)
                }
              }    
          });
        }))
    }

    function delNoteLocked(note){
      db.collection("usersData").doc(id).set({
        "noteslocked": firebase.firestore.FieldValue.arrayRemove(note)
      },
      {merge:true})
      toast.warning('Note deleted Succesfully', { position: toast.POSITION.BOTTOM_CENTER, autoClose:2000})
      db.collection("usersData").doc(id).get().then((function(doc){
        setLockedNotes(doc.data().noteslocked)
        setNotes(doc.data().notes)
        updateEmpty()
        })) 
    }

    function lockNotes(note){
      db.collection("usersData").doc(id).set({
        "notes": firebase.firestore.FieldValue.arrayRemove(note)
      },
      {merge:true})
      db.collection("usersData").doc(id).set({
        "noteslocked": firebase.firestore.FieldValue.arrayUnion(note)
      },
      {merge:true})
      update();
    }

    function unlockNotes(){
      setUnlockNotes(true);
    }

    function lockAgain(){
      setUnlockNotes(false)
      setUnlockSuccess(false)
    }

    function unlockClicked(){
      if(userPassword===originalPassword)
      setUnlockSuccess(true);
      else
      toast.error('Sorry, Invalid Passsword!!', { position: toast.POSITION.BOTTOM_CENTER, autoClose:2000})
      setUserPassword("")
    }

    function unlockNotesRemove(note){
      db.collection("usersData").doc(id).set({
        "noteslocked": firebase.firestore.FieldValue.arrayRemove(note)
      },
      {merge:true})
      db.collection("usersData").doc(id).set({
        "notes": firebase.firestore.FieldValue.arrayUnion(note)
      },
      {merge:true})
       update();
    }

    const createMarkup = (html) => {
      var bytes = CryptoJS.AES.decrypt(html, email);
      var decryptedData = bytes.toString(CryptoJS.enc.Utf8);
      return  {
        __html: DOMPurify.sanitize(decryptedData)
      }
    }
    const wrapperStyle = {
            border: '1px solid #969696',
    }
    const editorStyle = {
            height:'25rem',
            padding:'1rem'
    }

    const handleEditorChange = (state) => {
      setEditorState(state);
      convertContentToHTML();
    }

    const convertContentToHTML = () => {
      let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
      setConvertedContent(currentContentAsHTML);
    }

    
    return(
        <div class="container bootstrap snippets bootdeys">
          <div class="row">
          <div class="content-card">
                  <div class="card-big-shadow">
                      <div class="card" data-background="color" data-color="blue" data-radius="none">
                          <div class="content">
                              <h6 class="category">Welcome {name}</h6>

                      </div>
                  </div>
              </div>
            </div>
            <br/>
            <br/>
            {clickedEditNote &&<div><b>Update Your Note Here</b><div className="input-group">
            <Editor
                    initialEditorState={editorState}
                    wrapperClassName="wrapper-class"
                    wrapperStyle={wrapperStyle}
                    editorStyle={editorStyle}
                    toolbarClassName="toolbar-class"
                    editorClassName="demo-editor"                                                                               
                    onEditorStateChange={handleEditorChange}
                    toolbar={{
                        options: ['inline', 'blockType', 'textAlign', 
                                  'history','emoji'],                                
                        inline: {
                          options: ['bold','italic',  'underline' , 'strikethrough'],
                          bold: { className: 'demo-option-custom' },
                          italic: { className: 'demo-option-custom' },
                          underline: { className: 'demo-option-custom' },
                          strikethrough: {className: 'demo-option-custom' },
                          monospace: { className: 'demo-option-custom' },
                          superscript: {className: 'demo-option-custom'},
                          subscript: { className: 'demo-option-custom' }
                        },
                        blockType: {className: 'demo-option-custom-wide',
                        dropdownClassName: 'demo-dropdown-custom'},
                    }}
                />
            </div> 
                <br/><button class="btn btn-outline-dark" onClick={handleChangeEdit}>Submit</button>&nbsp;
                <button class="btn btn-dark" onClick={cancelChangeEdit}>Cancel</button></div>}  
            <div>
                <table class="table table-bordered table-hover">
                <thead><b><i>NOTES</i></b></thead>
                <tbody>{notes.map((notes)=>
                  <tr><li><div className="preview" dangerouslySetInnerHTML={createMarkup(notes)}></div><td>
                  <button class="btn btn-outline-dark" onClick={() => {editNote(notes)}}>Update</button>&nbsp;
                  <button class="btn btn-outline-dark" onClick={() => lockNotes(notes)}>Lock</button>&nbsp;
                  <button class="btn btn-dark" onClick={() => delNote(notes)}>Delete</button></td>
                </li></tr>)
                }
                </tbody></table>
            </div>
            {empty && <div> <center>You haven't saved any Note yet.<br/> Please go ahead and add your new note today!!! </center></div>}
            {/* Locked Notes start*/}
            {clickedEditNoteLocked &&<div><b>Update Your Note Here</b><div className="input-group">
            <Editor
                    initialEditorState={editorState}
                    wrapperClassName="wrapper-class"
                    wrapperStyle={wrapperStyle}
                    editorStyle={editorStyle}
                    toolbarClassName="toolbar-class"
                    editorClassName="demo-editor"                                                                               
                    onEditorStateChange={handleEditorChange}
                    toolbar={{
                        options: ['inline', 'blockType', 'textAlign', 
                                  'history','emoji'],                                
                        inline: {
                          options: ['bold','italic',  'underline' , 'strikethrough'],
                          bold: { className: 'demo-option-custom' },
                          italic: { className: 'demo-option-custom' },
                          underline: { className: 'demo-option-custom' },
                          strikethrough: {className: 'demo-option-custom' },
                          monospace: { className: 'demo-option-custom' },
                          superscript: {className: 'demo-option-custom'},
                          subscript: { className: 'demo-option-custom' }
                        },
                        blockType: {className: 'demo-option-custom-wide',
                        dropdownClassName: 'demo-dropdown-custom'},
                    }}
                />
            </div> 
                <br/><button class="btn btn-outline-dark" onClick={handleChangeEditLocked}>Submit</button>&nbsp;
                <button class="btn btn-dark" onClick={cancelChangeEditLocked}>Cancel</button></div>} 
                {!unlockSuccess  && <b><button class="btn btn-outline-dark" onClick={unlockNotes}>LOCKED <img src="https://media.istockphoto.com/vectors/lock-icon-vector-id936681148?k=20&m=936681148&s=612x612&w=0&h=j6fxNWrJ09iE7khUsDWetKn_PwWydgIS0yFJBEonGow=" height="30"/></button></b>}
                {unlocknotes && <div>
                  <div class="form-outline mb-4">
                  {!unlockSuccess && <div><br/><input type="password" id="form3Example4cg" class="form-control form-control-lg" placeholder="Password"  value={userPassword} onChange={(e) => setUserPassword(e.target.value)} onKeyPress={(e) => { if (e.key === "Enter") { unlockClicked();}}}/></div>}
                  </div>
                  {!unlockSuccess && <div class="d-flex justify-content-center"><button onClick={unlockClicked} className="btn btn-block btn-lg btn-dark">unlock</button> </div>}
                      {unlockSuccess && <div>
                    <table class="table table-bordered table-hover">
                    <thead><b><i>UNLOCKED &nbsp;<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCswczXCVvOOzNq90KITbZeWGTuN1LukqAeA&usqp=CAU" height="20"/></i></b></thead>
                    <tbody>{lockednotes.map((notes)=>
                    <tr><li><div className="preview" dangerouslySetInnerHTML={createMarkup(notes)}/><td>
                      <button class="btn btn-outline-dark" onClick={() => {editNoteLocked(notes)}}>Update</button>&nbsp;
                      <button class="btn btn-outline-dark" onClick={() => unlockNotesRemove(notes)}>Unlock</button>&nbsp;
                      <button class="btn btn-dark" onClick={() => delNoteLocked(notes)}>Delete</button></td>
                    </li></tr>)
                    }</tbody></table>
                        </div>}
                </div>}
                {unlocknotes &&  unlockSuccess && <div><button class="btn btn-dark" onClick={lockAgain}>Hide</button></div>}
            
            {<div><button class="btn btn-dark" onClick={cancelviewNote}>Close</button></div>}
            </div>
            {/* Locked Notes end*/}
        </div>
    );
}
export default ViewNotes;