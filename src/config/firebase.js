// Import the functions you need from the SDKs you need
import firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQ7jIlGGmDt_PhgdVLGtw_HR6oneD0Nvg",
  authDomain: "construction-tech.firebaseapp.com",
  projectId: "construction-tech",
  storageBucket: "construction-tech.appspot.com",
  messagingSenderId: "76543244234",
  appId: "1:76543244234:web:33d887472c11f91c9d0133",
  measurementId: "G-P6RF87H5ZQ",
};

// Initialize Firebase
const Firebase = firebase.initializeApp(firebaseConfig);
const db = Firebase.firestore()
  // Create a Recaptcha verifier instance globally
  // Calls submitPhoneNumberAuth() when the captcha is verified
var auth = Firebase.auth();
export {auth, firebase, db, Firebase};