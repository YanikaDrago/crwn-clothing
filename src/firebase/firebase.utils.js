import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCgm2ZhhEPQQwyoq2wGr-iK75D1UQ6hYt0",
    authDomain: "crwn-db-6ddf4.firebaseapp.com",
    projectId: "crwn-db-6ddf4",
    storageBucket: "crwn-db-6ddf4.appspot.com",
    messagingSenderId: "773651481530",
    appId: "1:773651481530:web:a45e6ca665ec9798265383",
    measurementId: "G-ZEE9Q5PKPY"
  } // на сйте создали проект, при настройке взяли config
  //установили пакет, здесь настраиваем utilis

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({promit: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;

