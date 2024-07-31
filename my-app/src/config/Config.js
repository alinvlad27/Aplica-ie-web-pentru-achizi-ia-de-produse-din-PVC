import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCDlRDGjTdsexUDaiv3vGg0y1pk77ysDLk",
  authDomain: "pvc-site-licenta.firebaseapp.com",
  projectId: "pvc-site-licenta",
  storageBucket: "pvc-site-licenta.appspot.com",
  messagingSenderId: "265899669220",
  appId: "1:265899669220:web:e8e7a83e44ac938e3a1ef1"
  };

  firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();
  const db = firebase.firestore();
  const storage = firebase.storage();

  export { auth, db, storage }