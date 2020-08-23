// Import stylesheets
import './style.css';

import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyDWG7bl3gyNmI4a_7f5BMr5jBgSwhQo4c8",
    authDomain: "chat-d6693.firebaseapp.com",
    databaseURL: "https://chat-d6693.firebaseio.com",
    projectId: "chat-d6693",
    storageBucket: "chat-d6693.appspot.com",
    messagingSenderId: "883201097461",
    appId: "1:883201097461:web:553a6baf7238aff338cfbc"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  if (!firebase.apps.length) {
    firebase.initializeApp({});
}
let chat = firebase.firestore().collection("chat");

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();

  let message = document.querySelector("input").value;
  chat.add({
    message: message,
    timestamp: Date.now()
  });
  document.querySelector("input").value = "";

  return false;
});

chat.orderBy("timestamp", "desc").limit(10).onSnapshot((querySnapshot) => {
  let list = document.querySelector("ol");
  list.innerHTML = "";
  querySnapshot.forEach((doc) => {
    let li = document.createElement("li");
    li.textContent = doc.data().message;
    list.append(li);
  });
});