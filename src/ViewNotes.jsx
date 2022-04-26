import db from "./config";
import React, { useState, useEffect } from "react";
import firebase from 'firebase';
import 'bootstrap/dist/css/bootstrap.css';
import "./App.css";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Welcome.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'; 
import { EditorState, convertFromRaw , convertToRaw} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { useNavigate } from "react-router-dom";


function ViewNotes(){
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
    const [empty, setEmpty] = useState(false);
    const [emptylocked, setEmptyLocked] = useState(false);
    const [shareClicked, setShareClicked] = useState(false);
    const [shareEmail, setShareEmail] = useState("");
    const [sharenote,setShareNote] = useState("")
    const [viewSharedNotesSuccess, setViewSharedNotesSuccess ] = useState(false);
    const [viewsharednotes, setViewSharedNotes ] = useState("");
    const [clickedEditSharedNote , setClickedEditSharedNote] = useState(false)
    const [sharedEmail,setSharedEmail ] = useState("")
    const navigate = useNavigate();

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
            setViewSharedNotes(element.data().sharednotes)
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
        updateEmpty()
        })) 
        toast.success('Note Updated Succesfully', { position: toast.POSITION.BOTTOM_CENTER, autoClose:2000})
        setClicked(false)
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
        setClicked(false)
    }

    function cancelChangeEditLocked(){
        setClickedEditNoteLocked(false)
        setClicked(false)
    }

    function editNote(note){
        sm(note)
        setEditNote(note)
        setClicked(true)
        setClickedEditNote(true)
        setClickedEditNoteLocked(false)
    }

    function editNoteLocked(note){
        sm(note)
        setEditNoteLocked(note)
        setClicked(true)
        setClickedEditNote(false)
        setClickedEditNoteLocked(true)
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
        update();
        setClicked(false)
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
        setClicked(false)
    }

    const wrapperStyle = {
        border: '1px solid #969696',
    }
    const editorStyle = {
        height:'28rem',
        width: '46rem',
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
        return(text_to_display)
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
    }

    function closeShared(){
        setViewSharedNotesSuccess(false)
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
    <div className="splitLeft">
    <br/>
    <br/>
    <div>
        <table class="table table-bordered table-hover">
        <thead><b><i>NOTES</i></b></thead>
        <tbody>{notes.map((notes)=>
        <tr><li style={{cursor:'pointer'}} onClick={() => {editNote(notes)}}>{display(notes)}
        </li></tr>)
        }
        </tbody>
        </table>
        
    </div>
    {!viewSharedNotesSuccess && <table class="table table-bordered table-hover"><thead style={{cursor:'pointer'}} onClick={viewSharedNotes}><b><i>SHARED NOTES</i></b></thead></table>}
    {viewSharedNotesSuccess && <div>
            <table class="table table-bordered table-hover">
            <thead style={{cursor:'pointer'}} onClick={closeShared}><b><i>SHARED NOTES</i></b></thead>
            <tbody>{viewsharednotes.map(({sharednote,email})=>
            <tr><li onClick={()=>{editSharedNote(sharednote,email)}}>{displayShared(sharednote)}
            </li></tr>)
            }</tbody></table>
        </div>}
    {empty && <div> <center>You haven't saved any Note yet.<br/> Please go ahead and add your new note today!!! </center></div>}
    {!unlockSuccess && <b><button class="btn btn-outline-dark" onClick={unlockNotes}>LOCKED <img src="https://media.istockphoto.com/vectors/lock-icon-vector-id936681148?k=20&m=936681148&s=612x612&w=0&h=j6fxNWrJ09iE7khUsDWetKn_PwWydgIS0yFJBEonGow=" height="30"/></button></b>}
    {unlocknotes && <div>
    <div class="form-outline mb-4">
        {!unlockSuccess && <div><br/><input type="password" id="form3Example4cg" class="form-control form-control-lg" placeholder="Password" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} onKeyPress={(e) => { if (e.key === "Enter") { unlockClicked();}}}/></div>}
    </div>
    {!unlockSuccess && <div class="d-flex justify-content-center"><button onClick={unlockClicked} className="btn btn-block btn-lg btn-dark">unlock</button> </div>}
        {unlockSuccess && <div>
            <table class="table table-bordered table-hover">
            <thead><b><i>UNLOCKED &nbsp;<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCswczXCVvOOzNq90KITbZeWGTuN1LukqAeA&usqp=CAU" height="20"/></i></b></thead>
            <tbody>{lockednotes.map((notes)=>
            <tr><li onClick={()=>{editNoteLocked(notes)}}>{display(notes)}
            </li></tr>)
            }</tbody></table>
        </div>}
    </div>}
    {unlocknotes && unlockSuccess && <div><button class="btn btn-dark" onClick={lockAgain}>Hide</button></div>}
    <br/>
    {<div><button class="btn btn-dark" onClick={cancelviewNote}>Close</button></div>}
    </div><div class="splitRight">
    {clicked && clickedEditNote && !shareClicked && <div><div class="image"><img onClick={()=>lockNotes(editnote)} style={{cursor:'pointer'}} src="https://media.istockphoto.com/vectors/lock-icon-vector-id936681148?k=20&m=936681148&s=612x612&w=0&h=j6fxNWrJ09iE7khUsDWetKn_PwWydgIS0yFJBEonGow=" height="22"/>&nbsp;<img onClick={()=>delNote(editnote)} style={{cursor:'pointer'}} src="https://icons-for-free.com/iconfiles/png/512/delete+24px-131985190578721347.png" height="20"/>&nbsp;&nbsp;<img onClick={()=>share(editnote)} style={{cursor:'pointer'}} src="https://www.seekpng.com/png/detail/119-1191645_share-button-png-share-icon-svg.png" height="15"/></div><div className="input-group">
            <Editor
            initialEditorState={editorState}
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
    <button class="btn btn-outline-dark" onClick={handleChangeEdit}>Submit</button>&nbsp;
    <button class="btn btn-dark" onClick={cancelChangeEdit}>Cancel</button></div>
    }
    <div class="splitRight">
        {clicked && clickedEditNote && shareClicked &&
        <div class="card-body p-5">
            <h6 class="text-capitalize p-2">Enter email to share this note:</h6>
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
    {clicked && !clickedEditNote && clickedEditNoteLocked &&<div><div class="image"><img onClick={()=>unlockNotesRemove(editnotelocked)} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCswczXCVvOOzNq90KITbZeWGTuN1LukqAeA&usqp=CAU" height="16"/>&nbsp;<img onClick={()=>delNoteLocked(editnotelocked)} src="https://icons-for-free.com/iconfiles/png/512/delete+24px-131985190578721347.png" height="20"/></div><div className="input-group">
            <Editor
            initialEditorState={editorState}
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
    <button class="btn btn-outline-dark" onClick={handleChangeEditLocked}>Submit</button>&nbsp;
    <button class="btn btn-dark" onClick={cancelChangeEditLocked}>Cancel</button></div>}
    {clickedEditSharedNote && !clickedEditNoteLocked && !clickedEditNote && <div><b> SHARED NOTE &nbsp; - {sharedEmail}</b>
    <div className="input-group">
        <Editor
            initialEditorState={editorState}
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
    {!clicked && <div><b>Add New Note</b><div className="input-group">
            <Editor
            initialEditorState={editorState1}
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
    <button class="btn btn-outline-dark" onClick={handleChange}>Add</button>
    </div>
    </div>}
    </div>
    </div>
 </div>
 );
}
export default ViewNotes;