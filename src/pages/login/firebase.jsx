import firebase from 'firebase';
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBp84iulVibhUAQsIYt65WozEFbF9nJn_8",
  authDomain: "loginhms-a52df.firebaseapp.com",
  projectId: "loginhms-a52df",
  storageBucket: "loginhms-a52df.appspot.com",
  messagingSenderId: "173367873813",
  appId: "1:173367873813:web:cf4bcd4335da1f2c67191c"
};

firebase.initializeApp(firebaseConfig);
let auth = firebase.auth();
export { auth, firebase };