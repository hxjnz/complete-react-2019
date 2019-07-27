import * as firebase from "firebase/app";

import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAWX8eg-rnn1IqgaD5i71TSqCB_H8QNi6E",
  authDomain: "crwn-db-2ebb9.firebaseapp.com",
  databaseURL: "https://crwn-db-2ebb9.firebaseio.com",
  projectId: "crwn-db-2ebb9",
  storageBucket: "",
  messagingSenderId: "180828988011",
  appId: "1:180828988011:web:d6d6fac793df88b7"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ promt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

// Here is your client ID
// 615645894822-8q0mot1rbv1ghrrr5he40f55vjs57id6.apps.googleusercontent.com
// Here is your client secret
// zypabHoyrrzJhD52CNzKFx9u
