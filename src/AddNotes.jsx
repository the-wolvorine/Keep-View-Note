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
import { useNavigate } from "react-router-dom";

function AddNotes(){

    var CryptoJS = require("crypto-js");
    let email = sessionStorage.getItem('authenticatedUser');
    const [notes, setNotes] = useState({});
    const [id,setId] = useState("")
    const [convertedContent, setConvertedContent] = useState("");
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

    useEffect(() => {
        db.collection("usersData")
        .get()
        .then((function(doc){
          doc.forEach(element => { 
              if(element.data().email===email)
              {
                  setNotes(element.data().notes)
                  setId(element.id)
              }    
          });
        })) 
        }, []);

    const wrapperStyle = {
            border: '1px solid #969696',
    }
    const editorStyle = {
            height:'34rem',
            padding:'1rem'
    }

    toast.configure()
    const notify = ()=>{
        toast.success('Note saved Succesfully', { position: toast.POSITION.BOTTOM_CENTER, autoClose:2000})
      } 

    const navigate = useNavigate();

    function cancelChange(){
        navigate("/welcome")
    }

    const handleEditorChange = (state) => {
        setEditorState(state);
        convertContentToHTML();
      }

    const convertContentToHTML = () => {
        let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
        setConvertedContent(currentContentAsHTML);
      }

    function handleChange(){
        var ciphertext = CryptoJS.AES.encrypt(convertedContent, email).toString();
          if(convertedContent.length>7){
              db.collection("usersData").doc(id).set({
                "notes": firebase.firestore.FieldValue.arrayUnion(ciphertext)
              },
              {merge:true})
          notify()
          db.collection("usersData").doc(id).get().then((function(doc){
          setNotes(doc.data().notes)
          })) 
          navigate("/welcome")
        }
          else{
            toast.error('Please write something to save', { position: toast.POSITION.BOTTOM_CENTER, autoClose:2000})
          }
        }

    return(
        <div class="container">
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
    )
}

export default AddNotes;