import db from "./config";
import React, { useState, useEffect } from "react";
import firebase from 'firebase';
import 'bootstrap/dist/css/bootstrap.css';
import "./App.css";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Welcome.css';
import { useNavigate } from "react-router-dom";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';  
import { ContentState, convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML ,convertFromHTML } from 'draft-convert';
import DOMPurify from 'dompurify';


function Welcome(){
    const createMarkup = (html) => {
        return  {
          __html: DOMPurify.sanitize(html)
        }
      }
      const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
          const wrapperStyle = {
              border: '1px solid #969696',
          }
          const editorStyle = {
              height:'25rem',
              padding:'1rem'
          }
      const  [convertedContent, setConvertedContent] = useState(null);
      const handleEditorChange = (state) => {
        setEditorState(state);
        convertContentToHTML();
      }
      const convertContentToHTML = () => {
        let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
        setConvertedContent(currentContentAsHTML);
        console.log("length is "+currentContentAsHTML.length)
      }

  const navigate = useNavigate();
    let email = sessionStorage.getItem('authenticatedUser');
    const [name, setName] = useState("");
    const [textarea, setTextarea] = useState("");
    const [textarea1, setTextarea1] = useState("");
    const [textarea2, setTextarea2] = useState("");
    const [clicked,setClicked] = useState(false);
    const [notes, setNotes] = useState({});
    const [lockednotes, setLockedNotes] = useState({});
    const [id,setId] = useState("")
    const [clickedViewNote,setClickedViewNote] = useState(false);
    const [clickedEditNote,setClickedEditNote] = useState(false);
    const [editnote, setEditNote] = useState("");
    const [clickedEditNoteLocked,setClickedEditNoteLocked] = useState(false);
    const [editnotelocked, setEditNoteLocked] = useState("");
    const [unlocknotes, setUnlockNotes] = useState(false);
    const [userPassword, setUserPassword] = useState("");
    const [originalPassword, setOriginalPassword] = useState("");
    const [unlockSuccess , setUnlockSuccess] = useState(false);

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
              }    
          });
        })) 
        }, []);

    function update(){
      db.collection("usersData").doc(id).get().then((function(doc){
        setLockedNotes(doc.data().noteslocked)
        setNotes(doc.data().notes)
        }))
    }

    function handleChange(){
        if(convertedContent.length>7){
            db.collection("usersData").doc(id).set({
              "notes": firebase.firestore.FieldValue.arrayUnion(convertedContent)
            },
            {merge:true})
        notify()
        setClicked(false)
        db.collection("usersData").doc(id).get().then((function(doc){
        setNotes(doc.data().notes)
        })) }
        else{
          toast.error('Please write something to save', { position: toast.POSITION.BOTTOM_CENTER, autoClose:2000})
        }
        setTextarea("")
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

      function handleChangeEditLocked(){
        db.collection("usersData").doc(id).set({
            "noteslocked": firebase.firestore.FieldValue.arrayRemove(editnotelocked)
          },
          {merge:true})
        db.collection("usersData").doc(id).set({
          "noteslocked": firebase.firestore.FieldValue.arrayUnion(textarea2)
        },
        {merge:true})
        setClickedEditNoteLocked(false)
        db.collection("usersData").doc(id).get().then((function(doc){
        setLockedNotes(doc.data().noteslocked)
        })) 
        toast.success('Note Updated Succesfully', { position: toast.POSITION.BOTTOM_CENTER, autoClose:2000})
        setTextarea2("")
      }
        
    function addNotes(){
        setClicked(true);
      }
      
    function viewNotes(){
         setClickedViewNote(true)
      }

    function cancelviewNote(){
        setClickedViewNote(false)
        setUnlockNotes(false)
        setUnlockSuccess(false)
     }

    function cancelChange(){
        setClicked(false)
    }

    function cancelChangeEdit(){
        setClickedEditNote(false)
    }

    function cancelChangeEditLocked(){
      setClickedEditNoteLocked(false)
  }

    function editNote(note){
        setEditNote(convertFromHTML(note))
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
                                        options: ['bold','italic','underline','strikethrough'],
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
                    options: ['bold','italic',  'underline'],
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
            {/* <textarea value={textarea1} onChange={(e) => setTextarea1(e.target.value)} className="form-control" id="exampleFormControlTextarea1" rows="5"></textarea> */}
            </div> 
                <br/><button class="btn btn-outline-dark" onClick={handleChangeEdit}>Submit</button>&nbsp;
                <button class="btn btn-dark" onClick={cancelChangeEdit}>Cancel</button></div>}  
            {clickedViewNote && 
            <div>
                <table class="table table-bordered table-hover">
                <thead><b><i>NOTES</i></b></thead>
                <tbody>{notes.map((notes)=>
                <tr><li><div className="preview" dangerouslySetInnerHTML={createMarkup(notes)}></div><td>
                  <button class="btn btn-outline-dark" onClick={() => {editNote(notes);setTextarea1(notes)}}>Update</button>&nbsp;
                  <button class="btn btn-outline-dark" onClick={() => lockNotes(notes)}>Lock</button>&nbsp;
                  <button class="btn btn-dark" onClick={() => delNote(notes)}>Delete</button></td>
                </li></tr>)
                }</tbody></table>
            </div>}
            {/* Encrypted Notes start*/}
            {clickedEditNoteLocked &&<div><b>Update Your Note Here</b><div className="input-group">
            <textarea value={textarea2} onChange={(e) => setTextarea2(e.target.value)} className="form-control" id="exampleFormControlTextarea1" rows="5"></textarea>
            </div> 
                <br/><button class="btn btn-outline-dark" onClick={handleChangeEditLocked}>Submit</button>&nbsp;
                <button class="btn btn-dark" onClick={cancelChangeEditLocked}>Cancel</button></div>} 
                {clickedViewNote && !unlockSuccess && <b><button class="btn btn-outline-dark" onClick={unlockNotes}>ENCRYPTED NOTES <img src="https://media.istockphoto.com/vectors/lock-icon-vector-id936681148?k=20&m=936681148&s=612x612&w=0&h=j6fxNWrJ09iE7khUsDWetKn_PwWydgIS0yFJBEonGow=" height="30"/></button></b>}
                {clickedViewNote && unlocknotes && <div>
                  <div class="form-outline mb-4">
                  {!unlockSuccess && <div><br/><input type="password" id="form3Example4cg" class="form-control form-control-lg" placeholder="Password"  value={userPassword} onChange={(e) => setUserPassword(e.target.value)} onKeyPress={(e) => { if (e.key === "Enter") { unlockClicked();}}}/></div>}
                  </div>
                  {!unlockSuccess && <div class="d-flex justify-content-center"><button onClick={unlockClicked} className="btn btn-block btn-lg btn-dark">unlock</button> </div>}
                      {unlockSuccess && <div>
                    <table class="table table-bordered table-hover">
                    <thead><b><i>ENCRYPTED NOTES &nbsp;<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCswczXCVvOOzNq90KITbZeWGTuN1LukqAeA&usqp=CAU" height="20"/></i></b></thead>
                    <tbody>{lockednotes.map((notes)=>
                    <tr><li><div className="preview" dangerouslySetInnerHTML={createMarkup(notes)}/><td>
                      <button class="btn btn-outline-dark" onClick={() => {editNoteLocked(notes);setTextarea2(notes)}}>Update</button>&nbsp;
                      <button class="btn btn-outline-dark" onClick={() => unlockNotesRemove(notes)}>Unlock</button>&nbsp;
                      <button class="btn btn-dark" onClick={() => delNoteLocked(notes)}>Delete</button></td>
                    </li></tr>)
                    }</tbody></table>
                        </div>}
                </div>}
                {clickedViewNote && unlocknotes &&  unlockSuccess && <div><button class="btn btn-dark" onClick={lockAgain}>Hide</button></div>}
            
            {clickedViewNote && <div><button class="btn btn-dark" onClick={cancelviewNote}>Close</button></div>}
            </div>
            {/* Encrypted Notes end*/}
        </div>
    );
}
export default Welcome;