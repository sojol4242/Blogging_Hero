import firebase from "firebase";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCKiO4ooOOME9wrylkBAUlou_5t9-JiV0E",
  authDomain: "hero-blogging.firebaseapp.com",
  projectId: "hero-blogging",
  storageBucket: "hero-blogging.appspot.com",
  messagingSenderId: "785499474122",
  appId: "1:785499474122:web:14a4c6f4906cf1177a4c33",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
// const googleProvider = new firebase.auth.GoogleAuthProvider();
// const githubProvider =  new firebase.auth.GithubAuthProvider();

export { auth };
