import firebase from 'firebase/app'; 
import "firebase/auth";

const configFire = {
    apiKey: "AIzaSyAdJzL2pS9TMSNuxih6KuVcrblF0RpO3tY",
    authDomain: "chattr-box.firebaseapp.com",
    projectId: "chattr-box",
    storageBucket: "chattr-box.appspot.com",
    messagingSenderId: "1098584024908",
    appId: "1:1098584024908:web:3b42ece072cf5a1e8551e9",
    measurementId: "G-X5KBZWY5MJ"
}

firebase.initializeApp(configFire);

export default configFire;