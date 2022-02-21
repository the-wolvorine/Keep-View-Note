import React, { useState, useEffect } from "react";
import "./App.css";
import db from "./config";
  
function ViewCount() {
  
  const [cViewCount, setcViewCount] = useState("");
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
    console.log("db collection value      "+db.collection("keep-view-note"));
  }, []);
  


  window.addEventListener('load', (event) => {
    
    Fetchdata();
  });

  const Fetchdata = ()=>{
    db.collection("keep-view-note").doc("1")
    .get()
    .then(function(doc) {
      if (doc.exists) {
        console.log("view count is:", doc.data().viewcount);

    db.collection("keep-view-note").doc("1").set({
        "viewcount": doc.data().viewcount+1
      },{merge:true})
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch(function(error) {
      console.log("Error getting document:", error);
    });

}

  
  

  return (
    <div classviewcount="App">
      <div classviewcount="App__DataDisplay">
        <table>
          <tr>
            <th>viewcount</th>
          </tr>
  
          {keepviewnote?.map(({ id, data }) => (
            <tr key={id}>
              <td>{data.viewcount}</td>
            </tr>
          ))}
        </table>
         {cViewCount} 
      </div>
    </div>
  );
}
  
export default ViewCount;