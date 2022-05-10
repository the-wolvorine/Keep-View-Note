import db from "./config";
import React, { useState, useEffect } from "react";
import ReactTooltip from "react-tooltip";
import firebase from 'firebase';
import 'bootstrap/dist/css/bootstrap.css';
import "./App.css";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Home.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'; 
import { EditorState, convertFromRaw , convertToRaw} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { useNavigate } from "react-router-dom";

function Home(){
    var CryptoJS = require("crypto-js");
    let email = sessionStorage.getItem('authenticatedUser');
    const [name, setName] = useState("");
    const [notes, setNotes] = useState([]);
    const [lockednotes, setLockedNotes] = useState([]);
    const [id,setId] = useState("")
    const [clickedEditNote,setClickedEditNote] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [editnote, setEditNote] = useState("");
    const [clickedEditNoteLocked,setClickedEditNoteLocked] = useState(false);
    const [editnotelocked, setEditNoteLocked] = useState("");
    const [unlocknotes, setUnlockNotes] = useState(false);
    const [userPassword, setUserPassword] = useState("");
    const [originalPassword, setOriginalPassword] = useState("");
    const [unlockSuccess , setUnlockSuccess] = useState(false);
    const [convertedContent, setConvertedContent] = useState("");
    const [convertedContent1, setConvertedContent1] = useState("");
    const [editorState, setEditorState] = useState();
    const [editorState1, setEditorState1] = useState(()=>EditorState.createEmpty());
    const [emptyall, setEmptyAll] = useState(false);
    const [shareClicked, setShareClicked] = useState(false);
    const [shareEmail, setShareEmail] = useState("");
    const [sharenote,setShareNote] = useState("")
    const [viewSharedNotesSuccess, setViewSharedNotesSuccess ] = useState(false);
    const [viewsharednotes, setViewSharedNotes ] = useState("");
    const [clickedEditSharedNote , setClickedEditSharedNote] = useState(false)
    const [sharedEmail,setSharedEmail ] = useState("")
    const [notesclicked, setNotesClicked ] = useState(true)
    const [sharednull, setSharedNull] = useState(false);
    var [date,setDate] = useState(new Date());

    var today = new Date()
    var curHr = today.getHours()

    function welcomeMessage(){
    if (curHr < 12) {
    return 'Good Morning'
    } else if (curHr < 18) {
    return 'Good Afternoon'
    } else {
    return 'Good Evening'
    }
    } 

    function sm(notes){
        var bytes = CryptoJS.AES.decrypt(notes, email);
        var decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        let content = convertFromRaw(JSON.parse(decryptedData));
        setEditorState(EditorState.createWithContent(content))
    }

    function SharedNoteSm(notes){
        let content = convertFromRaw(JSON.parse(notes));
        setEditorState(EditorState.createWithContent(content))
    }


    toast.configure()

    useEffect(() => {
        var timer = setInterval(()=>setDate(new Date()), 1000 )
        return function cleanup() {
            clearInterval(timer)
        }
    
    });

    useEffect(()=>{
        if(emptyall===true)
        {
        setEmptyAll(true);
        }
        if(emptyall===false)
        {
        setEmptyAll(false);
        }
    },[emptyall])

    useEffect(()=>{
        if(sharednull===true)
        {
        setSharedNull(true);
        }
        if(sharednull===false)
        {
        setSharedNull(false);
        }
    },[sharednull])

    useEffect(()=>{
        if(shareClicked===true)
        {
        setShareClicked(true);
        }
        if(shareClicked===false)
        {
        setShareClicked(false);
        }
    },[shareClicked])

    useEffect(()=>{
        if(notesclicked===true)
        {
        setNotesClicked(true);
        }
        if(notesclicked===false)
        {
        setNotesClicked(false);
        }
    },[notesclicked])

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
        if(viewSharedNotesSuccess===true)
        {
        setViewSharedNotesSuccess(true);
        }
        if(viewSharedNotesSuccess===false)
        {
        setViewSharedNotesSuccess(false);
        }
    },[viewSharedNotesSuccess])

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
            setNotes(element.data().notes.reverse())
            setId(element.id)
            setLockedNotes(element.data().noteslocked.reverse())
            setOriginalPassword(element.data().password)
            console.log("shared notes value"+element.data().sharednotes)
            if(element.data().sharednotes===undefined){
                setSharedNull(true)
            }
            if(element.data().sharednotes===null){
                setSharedNull(true)
            }
            setViewSharedNotes(element.data().sharednotes.reverse())
            if(element.data().notes.length+element.data().noteslocked.length===0){
                setEmptyAll(true);
            }
            if(element.data().notes.length+element.data().noteslocked.length>0){
                setEmptyAll(false);
            }
        } 
        }
        );
        })) 
    }, []);

    function update(){
        db.collection("usersData").doc(id).get().then((function(doc){
        setLockedNotes(doc.data().noteslocked.reverse())
        setNotes(doc.data().notes.reverse())
        setViewSharedNotes(doc.data().sharednotes)
        updateEmpty()
    }))
    }
    function handleChangeEdit(){
        var ciphertext = CryptoJS.AES.encrypt(convertedContent, email).toString();
        if(convertedContent.length>132){
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
        setNotes(doc.data().notes.reverse())
        setViewSharedNotes(doc.data().sharednotes)
        updateEmpty()
        })) 
        toast.success('Note Updated Succesfully', { position: toast.POSITION.BOTTOM_CENTER, autoClose:2000})
        setClicked(false)
        }
        else{
        toast.error('Please write something to update', { position: toast.POSITION.BOTTOM_CENTER, autoClose:2000})
        }
    }

    function handleChangeEditLocked(){
        var ciphertext = CryptoJS.AES.encrypt(convertedContent, email).toString();
        if(convertedContent.length>132){
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
        setLockedNotes(doc.data().noteslocked.reverse())
        setViewSharedNotes(doc.data().sharednotes)
        })) 
        toast.success('Note Updated Succesfully', { position: toast.POSITION.BOTTOM_CENTER, autoClose:2000})
        setClicked(false)
        updateEmpty()
        }
        else{
        toast.error('Please write something to update', { position: toast.POSITION.BOTTOM_CENTER, autoClose:2000})
        }
    }

    function cancelChangeEdit(){
        setClickedEditNote(false)
        setClicked(false)
    }

    function cancelChangeEditLocked(){
        setClicked(false)
    }

    function editNote(note){
        sm(note)
        setEditNote(note)
        setClicked(true)
        setClickedEditNote(true)
        setClickedEditNoteLocked(false)
        setClickedEditSharedNote(false)
    }

    function editNoteLocked(note){
        sm(note)
        setEditNoteLocked(note)
        setClicked(true)
        setClickedEditNote(false)
        setClickedEditNoteLocked(true)
        setClickedEditSharedNote(false)
    }

    function editSharedNote(note, email){
        SharedNoteSm(note)
        setSharedEmail(email)
        setClicked(true)
        setClickedEditNote(false)
        setClickedEditNoteLocked(false)
        setClickedEditSharedNote(true)
    }

    function delNote(note){
        db.collection("usersData").doc(id).set({
        "notes": firebase.firestore.FieldValue.arrayRemove(note)
        },
        {merge:true})
        toast.warning('Note deleted Succesfully', { position: toast.POSITION.BOTTOM_CENTER, autoClose:2000})
        db.collection("usersData").doc(id).get().then((function(doc){
        setNotes(doc.data().notes.reverse())
        setLockedNotes(doc.data().noteslocked.reverse())
        setViewSharedNotes(doc.data().sharednotes)
        updateEmpty()
        })) 
        setClicked(false)
    }

    function updateEmpty(){
        db.collection("usersData")
        .get()
        .then((function(doc){
        doc.forEach(element => {
        if(element.data().email===email)
        {
        if(element.data().notes.length+element.data().noteslocked.length===0){
            setEmptyAll(true);
        }
        if(element.data().notes.length+element.data().noteslocked.length>0){
            setEmptyAll(false);
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
        setLockedNotes(doc.data().noteslocked.reverse())
        setNotes(doc.data().notes.reverse())
        setViewSharedNotes(doc.data().sharednotes)
        updateEmpty()
        })) 
        setClicked(false)
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
        toast.success('Note Locked Succesfully', { position: toast.POSITION.BOTTOM_CENTER, autoClose:2000})
        update();
        setClicked(false)
    }

    function unlockClicked(){
        if(userPassword===originalPassword)
        setUnlockSuccess(true);
        else
        toast.error('Sorry, Invalid Passsword!!', { position: toast.POSITION.BOTTOM_CENTER, autoClose:2000})
        setUserPassword("")
        setTimeout(function(){
            setUnlockSuccess(false)
          },60000)
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
        toast.success('Note unlocked successfully', { position: toast.POSITION.BOTTOM_CENTER, autoClose:2000})
        setClicked(false)
    }

    const wrapperStyle = {
        border: '1px solid #969696',
    }
    const editorStyle = {
        height:'28rem',
        padding:'1rem'
    
    }

    const handleEditorChange = (state) => {
        setEditorState(state);
        convertContentToRaw();
    }

    const handleEditorChange1 = (state) => {
        setEditorState1(state);
        convertContentToRaw1();
    }

    const convertContentToRaw = () => {
        let currentContentAsHTML = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
        setConvertedContent(currentContentAsHTML);
    }

    const convertContentToRaw1 = () => {
        let currentContentAsHTML = JSON.stringify(convertToRaw(editorState1.getCurrentContent()));
        setConvertedContent1(currentContentAsHTML);
    }
    
    const display=(notes)=>{
        var bytes = CryptoJS.AES.decrypt(notes, email);
        var decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        var d=JSON.parse(decryptedData)
        var text_to_display=d.blocks[0].text;
        if(text_to_display.length<45)
        return(text_to_display)
        else{
        var text_to_display1=text_to_display.substring(0,45)+"....";
        return(text_to_display1)
        }
    }

    const displayShared=(notes)=>{
        var d=JSON.parse(notes)
        var text_to_display=d.blocks[0].text;
        return(text_to_display)
    }

    function handleChange(){
        var ciphertext = CryptoJS.AES.encrypt(convertedContent1, email).toString();
        if(convertedContent1.length>132){
        db.collection("usersData").doc(id).set({
        "notes": firebase.firestore.FieldValue.arrayUnion(ciphertext)
        },
        {merge:true})
        toast.success('Note saved Succesfully', { position: toast.POSITION.BOTTOM_CENTER, autoClose:2000})
        db.collection("usersData").doc(id).get().then((function(doc){
        setNotes(doc.data().notes.reverse())
        setViewSharedNotes(doc.data().sharednotes)
        setEditorState1(()=>EditorState.createEmpty())
        })) 
        updateEmpty()
        }
        else{
        toast.error('Please write something to save', { position: toast.POSITION.BOTTOM_CENTER, autoClose:2000})
        }
    }

    function share(note){
        setShareClicked(true)
        setShareNote(note)
    }
    
    function shareSubmit(e){
        e.preventDefault()
        const notes= sharenote
        db.collection("usersData")
        .get()
        .then((function(doc){
        var bytes = CryptoJS.AES.decrypt(notes, email);
        var sharednote = bytes.toString(CryptoJS.enc.Utf8);
        var data={sharednote,email}
        var count=0;
        doc.forEach(element => { 
        if(element.data().email===shareEmail)
        {
        count=1
        var id=element.id;
        db.collection("usersData").doc(id).set({
        "sharednotes": firebase.firestore.FieldValue.arrayUnion(data)
        },
        {merge:true})
        toast.success('Shared Successfully to '+shareEmail, { position: toast.POSITION.BOTTOM_CENTER, autoClose:2000})
        setShareEmail("")
        setShareClicked(false)
        }
        });
        if(count===0){
        toast.error('We didnt find an account to share, please check email again', { position: toast.POSITION.BOTTOM_CENTER, autoClose:2000})
        }
        }))
    }
    
    function cancelShare(){
        setShareClicked(false)
    }

    function viewSharedNotes(){
        setViewSharedNotesSuccess(true);
        setNotesClicked(false)
    }

    function notesClicked(){
        setNotesClicked(true)
        setViewSharedNotesSuccess(false);
    }

 return(
 <div class="container-sm">
    <div class="row">
        <div class="content border rounded border-dark shadow p-3 mb-2 bg-white rounded">
            <h6 class="category">{welcomeMessage()}, &nbsp;<b>{name}</b> <h6 style={{position: 'absolute', right: 55, top:100}}>{date.toLocaleString('en-us', { month: 'long',day: '2-digit', year: 'numeric' })} &emsp;{date.toLocaleTimeString()}</h6></h6>
        </div>
    <div className="splitLeft">
        <button class="btn active btn-outline-dark btn-sm" onClick={()=>setClicked(false)}> <i class="fa fa-plus"></i> <b>Add Note</b></button>
    <div>
        {<b> <button class="btn btn-outline-dark btn-sm" onClick={notesClicked}>Saved Notes</button></b>}&nbsp;{<b> <button class="btn btn-outline-dark btn-sm" onClick={viewSharedNotes}>Shared Notes</button></b>}
        <br/>
        {!viewSharedNotesSuccess && notesclicked && <b>Notes</b>}
        {viewSharedNotesSuccess && !notesclicked && <b>Shared notes</b>}
        <div class="line-separator"></div>
        <div class="scroll">
            {!viewSharedNotesSuccess && notesclicked && <div><table class="table table-bordered table-hover">
            {emptyall &&
                <table class="table table-bordered table-hover">
                    <tbody>
                    <tr><p style={{ color: 'red' }}>Oops..! You don't have any notes to display</p></tr>
                    </tbody>
                </table>
            }
                {!emptyall && <tbody>{notes.map((notes)=>
                <tr><li style={{cursor:'pointer'}} onClick={() => {editNote(notes)}}>{display(notes)}
                </li></tr>)
                }
                {!unlockSuccess &&lockednotes.map((notes)=>
                    <tr><li style={{cursor:'pointer'}} onClick={()=>{editNoteLocked(notes)}}><b>Note is Locked &nbsp;</b>
                    <i class="fa fa-lock" aria-hidden="true"></i>
                    </li></tr>)
                    }
                {unlockSuccess && lockednotes.map((notes)=>
                    <tr><li style={{cursor:'pointer'}}  onClick={()=>{editNoteLocked(notes)}}>{display(notes)} <i onClick={()=>unlockNotesRemove(editnotelocked)} class="fa fa-unlock" aria-hidden="true"></i>
                    </li></tr>)
                    }
                </tbody>}
            </table></div>}
            {viewSharedNotesSuccess && !notesclicked && !sharednull && <table class="table table-bordered table-hover">
                <tbody>{viewsharednotes.map(({sharednote,email})=>
                <tr><li onClick={()=>{editSharedNote(sharednote,email)}}>{displayShared(sharednote)}
                </li></tr>)
                }</tbody></table>}
            {viewSharedNotesSuccess && !notesclicked && sharednull &&
                <table class="table table-bordered table-hover">
                    <tbody>
                    <tr><p style={{ color: 'red' }}>Oops..! You don't have any shared notes to display</p></tr>
                    </tbody></table>
                }
        </div>
    </div>
    </div><div class="splitRight">
    {clicked && clickedEditNote && !shareClicked && 
        <div class="image">
            <i data-tip data-for="LockTip" onClick={()=>lockNotes(editnote)} style={{cursor:'pointer'}} title="Lock Note" class="icon fa fa-lock"></i>&nbsp;
            <ReactTooltip id="LockTip" place="top" effect="solid">
                Lock your note
            </ReactTooltip>
            <i data-tip data-for="DeleteTip" onClick={()=>delNote(editnote)} style={{cursor:'pointer'}} title="Delete" class="icon fa fa-trash"></i>&nbsp;&nbsp;
            <ReactTooltip id="DeleteTip" place="top" effect="solid">
                Delete your note
            </ReactTooltip>
            <i data-tip data-for="ShareTip" onClick={()=>share(editnote)} style={{cursor:'pointer'}} title="share Note" class="icon fa fa-share" aria-hidden="true"></i>
            <ReactTooltip id="ShareTip" place="top" effect="solid">
                Share your note
            </ReactTooltip>
        <div class="shadow mb-3 mt-1 bg-white rounded">
            <Editor
            initialEditorState={editorState}
            placeholder="Start writing..."
            editorState={editorState}
            wrapperClassName="wrapper-class"
            wrapperStyle={wrapperStyle}
            editorStyle={editorStyle}
            toolbarClassName="toolbar-class"
            editorClassName="demo-editor" 
            onEditorStateChange={handleEditorChange}
            toolbar={{
            options: ['inline', 'blockType', 'textAlign', 
            'history','emoji', 'image'], 
            inline: {
            options: ['bold','italic', 'underline' , 'strikethrough'],
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
    <button class="btn btn-outline-dark" onClick={handleChangeEdit}>Save</button>&nbsp;
    <button class="btn btn-dark" onClick={cancelChangeEdit}>Cancel</button></div>
    }
    <div class="splitRight">
        {clicked && clickedEditNote && shareClicked &&
        <div class="card-body p-5">
            <h4 class="text-capitalize p-2">Enter email to share this note:</h4>
            <form>
                <div class="form-outline mb-5">
                <input type="email" class="form-control form-control-lg" style={{maxWidth: '75%'}} placeholder="Enter Email" value={shareEmail} onChange={(e) => setShareEmail(e.target.value)}/>&nbsp;
                <div>
                <button class="btn btn-outline-dark" style={{padding: '10px', minWidth: '90px'}} onClick={shareSubmit}>Submit</button>&nbsp;&nbsp;
                <button class="btn btn-dark" style={{padding: '10px', minWidth: '90px'}} onClick={cancelShare}>Cancel</button>
                </div>
                </div>
            </form>
        </div>
        }
    </div>
    {clicked && !clickedEditNote && clickedEditNoteLocked && unlockSuccess &&
        <div class="image">
            <i data-tip data-for="UnlockTip" style={{cursor:'pointer'}} onClick={()=>unlockNotesRemove(editnotelocked)} title="Unlock Note" class="icon fa fa-unlock" aria-hidden="true"></i>&nbsp;
            <ReactTooltip id="UnlockTip" place="top" effect="solid">
                Unlock your note
            </ReactTooltip>
            <i data-tip data-for="DeletedTip" style={{cursor:'pointer'}} onClick={()=>delNoteLocked(editnotelocked)} title="Delete" class="icon fa fa-trash"></i>
            <ReactTooltip id="DeletedTip" place="top" effect="solid">
                Delete your note
            </ReactTooltip>
        <div class="shadow mb-3 mt-1 bg-white rounded">
            <Editor
            initialEditorState={editorState}
            placeholder="Start writing..."
            editorState={editorState}
            wrapperClassName="wrapper-class"
            wrapperStyle={wrapperStyle}
            editorStyle={editorStyle}
            toolbarClassName="toolbar-class"
            editorClassName="demo-editor" 
            onEditorStateChange={handleEditorChange}
            toolbar={{
            options: ['inline', 'blockType', 'textAlign', 
            'history','emoji','image'], 
            inline: {
            options: ['bold','italic', 'underline' , 'strikethrough'],
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
        <button class="btn btn-outline-dark" onClick={handleChangeEditLocked}>Save</button>&nbsp;
        <button class="btn btn-dark" onClick={cancelChangeEditLocked}>Cancel</button>
    </div>}
    {clicked && !clickedEditNote && clickedEditNoteLocked && !unlockSuccess &&
        <div class="card-body p-5">
            <h4 class="text-capitalize p-2">Enter your user password to view locked notes:</h4>
            <form>
                <div class="form-outline mb-5">
                    <input type="password" class="form-control form-control-lg" style={{maxWidth: '75%'}} placeholder="Password" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} onKeyPress={(e) => { if (e.key === "Enter") { unlockClicked();}}}/>
                </div>
            </form>
            <button onClick={unlockClicked} className="btn btn-dark">unlock</button>
        </div>
    }
    {clicked && clickedEditSharedNote && !clickedEditNoteLocked && !clickedEditNote &&
        <div class="image">
        <b> SHARED NOTE &nbsp; - {sharedEmail}</b>
    <div class="shadow mb-3 mt-1 bg-white rounded">
        <Editor
            initialEditorState={editorState}
            placeholder="Start writing..."
            editorState={editorState}
            wrapperClassName="wrapper-class"
            wrapperStyle={wrapperStyle}
            editorStyle={editorStyle}
            toolbarClassName="toolbar-class"
            editorClassName="demo-editor" 
            onEditorStateChange={handleEditorChange}
            toolbar={{
            options: ['inline', 'blockType', 'textAlign', 
            'history','emoji','image'], 
            inline: {
            options: ['bold','italic', 'underline' , 'strikethrough'],
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
        </div>}
        {!clicked && <div><b>ADD NEW NOTE</b><div class="shadow mb-3 mt-1 bg-white rounded">
            <Editor
            initialEditorState={editorState1}
            placeholder="Start writing..."
            editorState={editorState1}
            wrapperClassName="wrapper-class"
            wrapperStyle={wrapperStyle}
            editorStyle={editorStyle}
            toolbarClassName="toolbar-class"
            editorClassName="demo-editor" 
            onEditorStateChange={handleEditorChange1}
            toolbar={{
            options: ['inline', 'blockType', 'textAlign', 
            'history','emoji','image'], 
            inline: {
            options: ['bold','italic', 'underline' , 'strikethrough'],
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
            <button class="btn btn-outline-dark" onClick={handleChange}>Save</button>
        </div>}
    </div>
    </div>
 </div>
 );
}
export default Home;