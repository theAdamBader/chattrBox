import React, { useRef, useState } from 'react';
import './App.css';
import configFire from './components/Firebase';

// importing firebase to start auth back-end
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// importing firebase hooks  
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons/';

<configFire />

const auth = firebase.auth();
const firestore = firebase.firestore();
const element = <FontAwesomeIcon icon={faPaperPlane} />

function App() {

  // storing an user auth
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <img className="logo" src="/images/chatterlogo.png" alt="Chatter Box Logo" />
        <SignOut />
      </header>

      <section>
        {/* if user has signed in then enter 'ChatRoom' else 'SignIn' */}
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}

function SignIn(){
  // using pass event handler to access Google's auth provider so that user access the chat using their Gmail accounts
  const signInWithGoogle = () =>{
    const provider = new firebase.auth.GoogleAuthProvider();

    // this pop-up the gmail authentication prop for user to sign in
    auth.signInWithPopup(provider);
  }

  return(
    <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
  );
}

function SignOut(){
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  );
}

function ChatRoom(){
  // gets a CollectionReference instance that refers to the collection at the specified path in this case it is firestore
  const messagesRef = firestore.collection('messages');
  const timeStampQuery = messagesRef.orderBy('createdAt').limit(25);
 // listen to the data with a hook
  const [messages] = useCollectionData(timeStampQuery, {idField: 'id'});
  const [formValue, setFormValue] = useState('');
  const autoScroll = useRef();

  const sendMessage = async(e) => {
    e.preventDefault();
    const { uid, photoURL } = auth.currentUser;
    
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    });

    setFormValue('');
    autoScroll.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (

    <>

    <main>
      {/* for each message it gets from the 'messages' array, it will loop over each document */}
      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

      <span ref={autoScroll}></span>
    </main>

    <form onSubmit={sendMessage}>
      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} />

      <button className="cntr-btn" disabled={!formValue} type="submit">{element}</button>

    </form>

    </>
  );
}

function ChatMessage(props){
  // when using a string it will prop the message to then send it as a message into the chat room
  const{ text, uid, photoURL } = props.message;
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return( 
    <div className={`message ${messageClass}`}>
      <img className="URLphoto" src= {photoURL} alt='' />
      <p>{text}</p>
    </div>
  )
}

export default App;