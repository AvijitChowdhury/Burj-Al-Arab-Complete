import { Button } from '@material-ui/core';
import firebase from "firebase/app";
import "firebase/auth";
import React, { useContext } from 'react';
import { useHistory, useLocation } from 'react-router';
import { UserContext } from '../../App';
import firebaseConfig from './firebase.config';

const Login = () => {
    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }

    const [loggedInUser,setLoggedInUser] = useContext(UserContext);

    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    // Google Sign In  

    const handleGoogleSignIn = () => {
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(googleProvider)
            .then((result) => {
                // The signed-in user info.
                const {displayName,email} = result.user;
                const signedInUser = {
                    name : displayName,
                    email : email,
                }
                setLoggedInUser(signedInUser)
                console.log(email,displayName);
                storeAuthToken();
                
            }).catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
                console.log(`Error Code : ${errorCode} ; Error Message : ${errorMessage}; Email : ${email}; Credential : ${credential}`);
            });
    }

    const storeAuthToken = ()=>{
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
            // Send token to your backend via HTTPS
            console.log(idToken);
            sessionStorage.setItem('token',idToken);
            history.replace(from);
            // ...
          }).catch(function(error) {
            // Handle error
          });
    }
    return (
        <div>
            <br/>
            <Button variant="contained" color="primary" onClick={handleGoogleSignIn}> Sign in with google </Button>
        </div>
    );
};

export default Login;