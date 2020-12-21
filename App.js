import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Image} from 'react-native';
import Home from './screens/home';
import Mission from'./screens/mission';
import LoadingScreen from'./screens/LoadingScreen';
import LoginScreen from'./screens/LoginScreen';

import * as firebase from 'firebase'
import { firebaseConfig } from './config';


if (!firebase.apps.length) { firebase.initializeApp(firebaseConfig); }





function LoginStack(){

  return (
    <Stack.Navigator>
      <Stack.Screen name ="LoginScreen" component={LoginScreen} options={{
        headerTransparent:false
      }}/>
      
    </Stack.Navigator>
  );
}

function HomeStack(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{
        headerTransparent:true,
        headerLeft : () => (
        <Image source={require('./assets/drawericon.png')} style={{}}/>
        ),
        title : '',
        headerRight : () => (
          <Image source={require('./assets/user.png')} style={{marginHorizontal:20,marginTop:40}}/>
        )
        }}/>
      <Stack.Screen name="Mission" component={Mission} options={{
        headerTransparent:true,
        headerLeft : () => (
          <Image source={require('./assets/blackmenu.png')} style={{marginHorizontal:20,marginTop:40}}/>
        ),
        title : '',
        headerRight : () => (
          <Image source={require('./assets/user.png')} style={{marginHorizontal:35,marginTop:45}}/>
        )
        }}/>
          
      </Stack.Navigator>
  )
}


const Stack = createStackNavigator();



// const AppNavigator = NavigationContainer(AppSwitchNavigator)


export default class App extends React.Component{

  componentDidMount(){
    this.checkIfLoggedIn();
  }

  state ={
    isLoggedIn: true
  }

  checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged( 
        function(user){
        if(user){
            console.log("log in ")
            // this.props.navigation.navigate(() => HomeStack());
            return this.setState({
                isLoggedIn: true
            })
        } else {
            console.log("fail")
            // this.props.navigation.navigate('LoginScreen');
            return this.setState({
                isLoggedIn: false
            })
        }
    }.bind(this)
    )
  }



  render(){
    return(
      <NavigationContainer>
        {!this.state.isLoggedIn ? <LoginStack/> : <HomeStack/>}
      </NavigationContainer>
    );
  }
}




// componentDidMount(){
//   this.checkIfLoggedIn();
// }

// state ={
//   isLoggedIn: false
// }

// checkIfLoggedIn = () => {
//   firebase.auth().onAuthStateChanged( 
//       function(user){
//       if(user){
//           console.log("log in ")
//           // this.props.navigation.navigate(() => HomeStack());
//           return this.setstate({
//               isLoggedIn: true
//           })
//       } else {
//           console.log("fail")
//           // this.props.navigation.navigate('LoginScreen');
//           return this.setstate({
//               isLoggedIn: false
//           })
//       }
//   }.bind(this)
//   )
// }

// render(){
//   return (
//       <View style={styles.container}>
//           <ActivityIndicator size="large"/>   
//       </View>
//   );
// }