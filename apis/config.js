const firebase = require("firebase-admin");

var serviceAccount = require("./crudpoc-7d2ea-firebase-adminsdk-kz3j2-1b5f3b1cf3.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount)
});

const firebaseConfig = {
    apiKey: "AIzaSyB5fsmk8X94SD8jrhoXA3EirXZnWF8y5ac",
    authDomain: "crudpoc-7d2ea.firebaseapp.com",
    projectId: "crudpoc-7d2ea",
    storageBucket: "crudpoc-7d2ea.appspot.com",
    messagingSenderId: "181640374458",
    appId: "1:181640374458:web:934d5957f21fad4604fa83",
    measurementId: "G-LFJ23EVRGL"
};
// firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const Answer = db.collection("Answers");
module.exports = Answer;