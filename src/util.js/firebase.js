import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyCWVMHWxDjygjMQ32oTAtuJuiVbdv7tBB0",
    authDomain: "numerical-react.firebaseapp.com",
    projectId: "numerical-react",
    storageBucket: "numerical-react.appspot.com",
    messagingSenderId: "630004520923",
    appId: "1:630004520923:web:2d7b456fd95d55e02fb9fe",
    measurementId: "G-3HV0H3B8Y8"
  };

    firebase.initializeApp(firebaseConfig);
    firebase.firestore();

export default firebase;