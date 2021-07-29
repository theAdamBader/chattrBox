import './App.css';

//importing firebase to start auth back-end
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
    apiKey: "AIzaSyAdJzL2pS9TMSNuxih6KuVcrblF0RpO3tY",
    authDomain: "chattr-box.firebaseapp.com",
    projectId: "chattr-box",
    storageBucket: "chattr-box.appspot.com",
    messagingSenderId: "1098584024908",
    appId: "1:1098584024908:web:3b42ece072cf5a1e8551e9",
    measurementId: "G-X5KBZWY5MJ"
})

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
      </header>
    </div>
  );
}

export default App;