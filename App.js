import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Image} from 'react-native';
import Home from './screens/home';
import Mission from'./screens/mission';
import LoadingScreen from'./screens/LoadingScreen';
import LoginScreen from'./screens/LoginScreen';
import User from './User';

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



// function HomeStack(){

//   return(
//     <Stack.Navigator>
      
//       <Stack.Screen name="Home" component={Home} options={{
//         headerTransparent:true,
//         headerLeft : () => (
//         <Image source={require('./assets/drawericon.png')} style={{}}/>
//         ),
//         title : '',
//         headerRight : () => (
//           <Image source={this.state.userPhoto} style={{marginHorizontal:20,marginTop:40}}/>
//         )
//         }}/>
//       <Stack.Screen name="Mission" component={Mission} options={{
//         headerTransparent:true,
//         headerLeft : () => (
//           <Image source={require('./assets/blackmenu.png')} style={{marginHorizontal:20,marginTop:40}}/>
//         ),
//         title : '',
//         headerRight : () => (
//           <Image source={require('./assets/user.png')} style={{marginHorizontal:35,marginTop:45}}/>
//         )
//         }}/>
          
//       </Stack.Navigator>
//   )
// }


const Stack = createStackNavigator();

// getMusicListByGroup(data).once('value', (snapshot) => {

// 	// value 값만 가져오기
//    console.log(Object.values(snapshot.val()));
   
//    // key 값만 가져오기
//    console.log(Object.keys(snapshot.val()));
// });


// const AppNavigator = NavigationContainer(AppSwitchNavigator)


export default class App extends React.Component{

  componentDidMount = () => {
    this.checkIfLoggedIn();
    this.getUserName();
  }

  state ={
    isLoggedIn: true,
    userPhoto: '',
    user: null
  }

  getUserName = () => {

    firebase.database().ref('user/' + User.uid).on('value', (snapshot) =>{

    const userProfile = snapshot.val().profile_picture;

    console.log("photo!! : " + userProfile) 
    this.setState({
      userPhoto: userProfile
      })
    User.image = this.state.userPhoto
    
    });
  }



  
  checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged( 
        function(user){
        if(user){
            // this.props.navigation.navigate(() => HomeStack());
            this.setState({ user: user.uid });
            console.log("log in :" + this.state.user);
            User.uid = this.state.user
            return this.setState({
                isLoggedIn: true
            })
        } else {
            console.log("fail")
            this.setState({ user: null });
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
        {!this.state.isLoggedIn ? <LoginStack/> : <Stack.Navigator>
      
      <Stack.Screen name="Home" component={Home} options={{
        headerTransparent:true,
        headerLeft : () => (
        <Image source={require('./assets/drawericon.png')} style={{}}/>
        ),
        title : '',
        headerRight : () => (
          <Image source={{uri: '"https://lh3.googleusercontent.com/a-/AOh14GisfongqfdDqNBQ14bvFJfqGwR-KdK3SX9JxggqFA=s96-c"' }} style={{marginHorizontal:20,marginTop:40}}/>
        )
        }}/>
      <Stack.Screen name="Mission" component={Mission} options={{
        headerTransparent:true,
        headerLeft : () => (
          <Image source={require('./assets/blackmenu.png')} style={{marginHorizontal:20,marginTop:40}}/>
        ),
        title : '',
        headerRight : () => (
          <Image source={"https://lh3.googleusercontent.com/a-/AOh14GisfongqfdDqNBQ14bvFJfqGwR-KdK3SX9JxggqFA=s96-c" ? {uri: "https://lh3.googleusercontent.com/a-/AOh14GisfongqfdDqNBQ14bvFJfqGwR-KdK3SX9JxggqFA=s96-c" } : null} style={{marginHorizontal:35,marginTop:45}}/>
        )
        }}/>
          
      </Stack.Navigator>}
      </NavigationContainer>
    );
  }
}




