import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeLoginFramework = () => {
    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }
}

export const handleGoogleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider)
    .then(res => {
      const {displayName, email , photoURL} = res.user;
      const signInUser = {
        isSignIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
        isSuccess: true,
      }
      return signInUser;
    })
    .catch(err => console.log(err))  
}

    //FB logging
export const handleFBLogIn = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(fbProvider).then(function(result) {
        var token = result.credential.accessToken;
        var user = result.user;
        user.isSuccess =  true;
        return user;

    }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
        
    });
}

export const handleSignOut = () => {
    return firebase.auth().signOut()
    .then(res => {
      const signOutUser = {
        isSignIn: false,
        name: '',
        email: '',
        photo: ''
      }
      return signOutUser;
    })
    .catch(err => console.log(err))
  }

export const createUserWithEmailPassword = (name, email, password) => {
    
    return firebase.auth().createUserWithEmailAndPassword(name, email, password)
    .then(res => {
      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.isSuccess = true;
      updateUserName(name);
      return newUserInfo;
    })
    .catch(error => {
      // Handle Errors here.
      const newUserInfo = {}
      newUserInfo.error = error.message;
      newUserInfo.isSuccess = false;
      return newUserInfo;
    });
}

export const logInUserWithEmailPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res => {
      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.isSuccess = true;
      return newUserInfo;

    })
    .catch(error => {
      const newUserInfo = {}
      newUserInfo.error = error.message;
      newUserInfo.isSuccess = false;
      return newUserInfo;    
    })
}


const updateUserName = name => {

    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name,
    }).then(function() {
      // Update successful.
    }).catch(function(error) {
      // An error happened.
    });

}