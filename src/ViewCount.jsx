import React, { useState, useEffect } from "react";
import "./App.css";
import db from "./config";
import CountUp from 'react-countup';
import 'bootstrap/dist/css/bootstrap.css';
  
function ViewCount() {
  const [keepviewnote, setkeepviewnote] = useState([]);
  useEffect(() => {
    db.collection("keep-view-note").onSnapshot((snapshot) => {
      setkeepviewnote(
        snapshot.docs.map((doc) => ({
          id: 1,
          data: doc.data(),
        }))
      );
    });
  }, []);
  
  //increase view count on every refresh
  window.addEventListener('load', (event) => {
    db.collection("keep-view-note").doc("1")
    .get()
    .then(function(doc) {
      if (doc.exists) {
       db.collection("keep-view-note").doc("1").set({
        "viewcount": doc.data().viewcount+1
      },
      {merge:true})
      } 
      else {
        alert("No such document")
      }
    })
    .catch(function(error) {
      alert("Error getting document")
    });
  });  
  
  return (
    <div class="pb-2 text-center custom-styles">
      <h1>View Counter</h1>
      {keepviewnote?.map(({ id, data }) => (
        <CountUp end={data.viewcount} duration={0.5}></CountUp>
      ))}
    </div>
  );
}
  
export default ViewCount;