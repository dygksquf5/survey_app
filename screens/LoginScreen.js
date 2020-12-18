import React, {Component} from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';

import * as Google from 'expo-google-app-auth';
// import * as Expo from 'expo'
// import {Google} from 'expo'



export default class LoginScreen extends Component {
    signInWithGoogleAsync = async() => {
        try {
          const result = await Expo.Google.logInAsync({
              behavior: 'web',
              androidClientId: '884861809882-r2nj8gdf0skh658vfjuopfdte8a62eue.apps.googleusercontent.com',
              iosClientId: '884861809882-5bim2oemp4ohg1ridqe6ffhhi6cmgguu.apps.googleusercontent.com',
              scopes: ['profile', 'email'],
            });
      
            if (result.type === 'success') {
                return result.accessToken;
            } else {
                return { cancelled: true };
            }
            } catch (e) {
                return { error: true };
            }
        }

    render(){
        const signInWithGoogle = () => {
            signInWithGoogleAsync()
            }
        return (
            <View style={styles.container}>
                <Button title="구글 로그인 하기" 
                onpress={()=> signInWithGoogle()}/> 
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