let firebase = require("firebase");
let firebaseConfig = {
  apiKey: "AIzaSyAGcujzRJjlZZ7OyKRBZxmsOnz231WhXSI",
  authDomain: "note-d6caf.firebaseapp.com",
  databaseURL: "https://note-d6caf-default-rtdb.firebaseio.com",
  projectId: "note-d6caf",
  storageBucket: "note-d6caf.appspot.com",
  messagingSenderId: "1091351237546",
  appId: "1:1091351237546:web:480cf8ef80c26d6b1611d3",
  measurementId: "G-J9PGSK3HZX"
};

firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

describe('Users', () => {
  it('should get users data', (getData) => {
    chai.request(db.collection("usersData")).get().end((res)=> {
      res.should.have.status(200);
      res.body.should.be.a('array');
      getData();
    });
  });
});

