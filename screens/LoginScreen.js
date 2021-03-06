import React, {Component} from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';

// import Expo from "expo"
// import {Google} from 'expo'
import * as Google from 'expo-google-app-auth';
import firebase from 'firebase';
import Home from './home';
import User from '../User';
const IOS_CLIENT_ID = 
        '884861809882-pd8lksphtg2cr31qanerc60sead808c2.apps.googleusercontent.com'
const ANDROID_CLIENT_ID = 
        '884861809882-ucjhe2gqon1f79rh9jtdi7e36faa8cm9.apps.googleusercontent.com'


        

export default class LoginScreen extends Component {
  state = {
    email: "",
    phone: "",
    name: "",
    image: "",
    uid : ""
  };


    isUserEqual = (googleUser, firebaseUser)=> {
        if (firebaseUser) {
          var providerData = firebaseUser.providerData;
          // for (var i = 0; i < providerData.length; i++) {
          //   if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          //       providerData[i].uid === googleUser.getBasicProfile().getId()) {
          //     // We don't need to reauth the Firebase connection.
          //     return true;
          for (var i = 0; i < providerData.length; i++) {
            if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
               providerData[i].uid === googleUser.user.id) {
               return true;
            }
          }
        }
        return false;
      }
    onSignIn = (googleUser) => {
        console.log('Google Auth Response', googleUser);
        // We need to register an Observer on Firebase Auth to make sure auth is initialized.
        var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
          unsubscribe();
          // Check if we are already signed-in Firebase with the correct user.
          if (!this.isUserEqual(googleUser, firebaseUser)) {
            // Build Firebase credential with the Google ID token.
            var credential = firebase.auth.GoogleAuthProvider.credential(
                googleUser.idToken,
                googleUser.accessToken
                );
      
            // Sign in with credential from the Google user.
            firebase.auth().signInWithCredential(credential).then(function(result){
                console.log("user signed in");
                if(result.additionalUserInfo.isNewUser){
                    firebase.database()
                    .ref('/user/' + result.user.uid)
                    .set({
                        gmail: result.user.email,
                        // profile_picture: result.additionalUserInfo.profile.picture,
                        profile_picture: result.user.photoURL,
                        locale: result.additionalUserInfo.profile.locale,
                        first_name: result.additionalUserInfo.profile.given_name,
                        last_name: result.additionalUserInfo.profile.family_name,
                        name: result.additionalUserInfo.profile.name,
                        created_at: Date.now()
                    })
                    .then(function(snapshot){
                      console.log(snapshot)
                    })
                } else{
                    firebase.database()
                    .ref('/user/' + result.user.uid).update({
                        last_logged_in: Date.now()
                    })

                }
            })
            .catch((error) => {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
            });
          } else {
            console.log('User already signed-in Firebase.');
          }
        });
      }
    signInWithGoogle = async() => {
        try {
          const result = await Google.logInAsync({
              androidClientId: ANDROID_CLIENT_ID,
              iosClientId: IOS_CLIENT_ID,
              scopes: ['profile', 'email'],
            });
      
            if (result.type === 'success') {
                this.onSignIn(result);
                console.log("LoginScreen.js", result.user.givenName);
                // this.props.navigation.navigate(this.change(), {
                //     username: result.user.givenName
                // })
                return result.accessToken
            } else {
                return {cancelled: true}
            }
            } catch (e) {
                console.log("error", e)
                return {error: true}
            }
        }
        // const signInWithGoogle = () => {
        //     signInWithGoogleAsync()
        //     }
        render() {
            return (
              <View style={styles.container}>
                <Button title="Login with Google" onPress={this.signInWithGoogle} />
              </View>
        );
    }
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});