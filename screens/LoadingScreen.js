import React, {Component} from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import firebase from 'firebase';

  


export default class LoadingScreen extends Component {

    componentDidMount(){
        this.checkIfLoggedIn();
    }

    state ={
        isLoggedIn: false
    }

    checkIfLoggedIn = () => {
        firebase.auth().onAuthStateChanged( 
            function(user){
            if(user){
                console.log("log in ")
                this.props.navigation.navigate();
                
            } else {
                console.log("fail")
                this.props.navigation.navigate('LoginScreen');
            }
        }.bind(this)
        )
    }
    
    render(){
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large"/>   
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