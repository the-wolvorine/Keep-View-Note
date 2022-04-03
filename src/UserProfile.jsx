import db from "./config";
import React, { useState, useEffect } from "react";
import "./App.css";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserProfile(){
    let email = sessionStorage.getItem('authenticatedUser');
    const [name, setName] = useState("");
    const [newname, setNewName] = useState("");
    const [mobile, setMobile] = useState("");
    const [newmobile, setNewMobile] = useState("");
    const [clickedName,setClickedName] = useState(false);
    const [clickedMobile,setClickedMobile] = useState(false);
    const [clickedPassword,setClickedPassword] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    toast.configure()
    useEffect(() => {
    db.collection("usersData").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if(doc.data().email===email)
            {
                setName(doc.data().name)
                setMobile(doc.data().mobile)
                setNewName(doc.data().name)
                setNewMobile(doc.data().mobile)
            }
        });
     })
    }, []);

      useEffect(()=>{
        if(clickedName===true)
        {
            setClickedName(true);
        }
        if(clickedName===false)
        {
            setClickedName(false);
        }
      },[clickedName])

      useEffect(()=>{
        if(clickedMobile===true)
        {
            setClickedMobile(true);
        }
        if(clickedMobile===false)
        {
            setClickedMobile(false);
        }
      },[clickedMobile])

      useEffect(()=>{
        if(clickedPassword===true)
        {
            setClickedPassword(true);
        }
        if(clickedPassword===false)
        {
            setClickedPassword(false);
        }
      },[clickedPassword])

    function changeName()
    {
        setClickedName(true);

    }
    function changeMobile()
    {
        setClickedMobile(true);

    }
    function changeNameSubmit(){
        db.collection("usersData").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if(doc.data().email===email)
                {
                    db.collection("usersData").doc(doc.id).set({
                        "name": newname
                      },
                      {merge:true})
                }
            });
        })
        setName(newname)
        setClickedName(false)
        toast.success('Name updated Succesfully', { position: toast.POSITION.BOTTOM_CENTER, autoClose:2000})
    }
    function changeMobileSubmit(){
        db.collection("usersData").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if(doc.data().email===email)
                {
                    db.collection("usersData").doc(doc.id).set({
                        "mobile": newmobile
                      },
                      {merge:true})
                }
            });
        })
        setMobile(newmobile)
        setClickedMobile(false)
        toast.success('Mobile number updated Succesfully', { position: toast.POSITION.BOTTOM_CENTER, autoClose:2000})
    }
    function cancelEditName()
    {
        setClickedName(false)
    }
    function cancelEditMobile()
    {
        setClickedMobile(false)
    }
    function cancelEditPassword()
    {
        setClickedPassword(false)
    }
    function changePassword(){
        setClickedPassword(true);
    }
    function changePasswordSubmit(){
        db.collection("usersData").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if(doc.data().email===email)
                {
                    if(doc.data().password===currentPassword)
                    {
                        db.collection("usersData").doc(doc.id).set({
                            "password": newPassword
                          },
                          {merge:true})
                          toast.success('Password changed Succesfully', { position: toast.POSITION.BOTTOM_CENTER, autoClose:2000})
                          setClickedPassword(false)
                    }
                    else{
                        toast.error('Current password doesnt match', { position: toast.POSITION.BOTTOM_CENTER, autoClose:2000})
                    }
                }
            });
         })
    }

    return(
        <div>
            <h2>User Profile</h2>
            <table class="table table-bordered table-hover">
                    <tbody>
                    <tr>
                    <th scope="row">Name</th>    
                    {!clickedName && <td>{name}&nbsp;&nbsp;<button onClick={changeName}>Edit</button></td>}
                    {clickedName && <td><input type="text" value={newname} onChange={(e) => setNewName(e.target.value)}></input>
                    &nbsp;&nbsp;<button onClick={() => {changeNameSubmit()}}>submit</button>
                    &nbsp;&nbsp;<button onClick={cancelEditName}>cancel</button></td> }
                    </tr>
                    <tr>
                    <th scope="row">Mobile</th> 
                    {!clickedMobile && <td>{mobile}&nbsp;&nbsp;<button onClick={changeMobile}>Edit</button></td> }
                    {clickedMobile && <td><input type="text" value={newmobile} onChange={(e) => setNewMobile(e.target.value)}></input>
                    &nbsp;&nbsp; <button onClick={() => {changeMobileSubmit()}}>submit</button>
                    &nbsp;&nbsp; <button onClick={cancelEditMobile}>cancel</button></td>}
                    </tr>
                    <tr>
                    <th scope="row">Email</th>  
                    <td>{email}</td>
                    </tr>
                </tbody>
            </table>
            {!clickedPassword && <button onClick={changePassword}>Change password</button>}
            {clickedPassword && <div><div>Enter Current Password:<input type="password" onChange={(e) => setCurrentPassword(e.target.value)}></input></div><br/>
            <div>Enter new password:<input type="password" onChange={(e) => setNewPassword(e.target.value)}></input></div>
            <button onClick={changePasswordSubmit}>Submit</button>&nbsp;
            <button onClick={cancelEditPassword}>cancel</button>
            </div>}
        </div>
    
    );
}
export default UserProfile;