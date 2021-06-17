import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAmrziEx6u1NpzxYV9uPK7X9t6EANO0IB0",
    authDomain: "to-do-e63c5.firebaseapp.com",
    projectId: "to-do-e63c5",
    storageBucket: "to-do-e63c5.appspot.com",
    messagingSenderId: "201997646830",
    appId: "1:201997646830:web:da58c3fabbc5320875acff",
    measurementId: "G-603484CQY7"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth;
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
