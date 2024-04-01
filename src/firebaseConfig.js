// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLv-b2gJ6q3vyhSXAUqZ9a4Md7pHPt1sk",
  authDomain: "loginapp-823ef.firebaseapp.com",
  projectId: "loginapp-823ef",
  storageBucket: "loginapp-823ef.appspot.com",
  messagingSenderId: "969084321436",
  appId: "1:969084321436:web:afc0f7ba12d3caf610b759",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;
