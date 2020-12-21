import React from 'react';
import {View, StyleSheet,Text,ImageBackground, Button} from 'react-native';
import firebase from 'firebase'
import Day from'./day';
import Card from'./card';
import User from '../User';

const user = 'yohan'

// var ref = firebase.database().ref(`${mValue}`);
//     ref.once("value")
//     .then((snapshot) => {
//         let Profile = snapshot.child("profile_picture").val()
//         let Name = snapshot.child("first_name").val()
//         let email = snapshot.child("gmail").val()

//         let arr = this.state.arrUser
//         arr.push({Profile, Name, email})
//         this.setState({arrUser: arr})
//     }).catch(err=> console.log(err));




// var userId = firebase.auth().currentUser.uid;

// firebase.database().ref('/users/' + userId).once('value', val => {
//    console.log(val.val())
// });



// firebase.auth().onAuthStateChanged(user => { 
//     this.currentUser = firebase.auth().currentUser; 
//     if (this.currentUser) { 
//         this.vendor = firebase.firestore().doc(`/Products/${this.currentUser.uid}`); 
//     } 
// });




export default class home extends React.Component{

    componentDidMount(){
        this.getUserName();
    }


    state={
        color : '#136DF',
        activestate: 'rgba(255,255,255,0.291821)',
        username: "",
        photoUrl: "",
        email: "",
        uid: '',
    };

    change = () => {
        return(
            this.props.navigation.navigate('Mission')
        );
    }

    getUserName = async () => {
        var userId = User.uid;
        await firebase.database().ref('user/' + userId).on('value', (snapshot) =>{
        const UserEmail = snapshot.val().gmail;
        const UserName = snapshot.val().name;
        console.log("name!!! : " + UserName)
        this.setState({
            username: UserName,
            email: UserEmail
        })
        });
    }


    render(){
        return(
            <View style={styles.container}>
                <View style={styles.containerone}>
                    <View style={styles.boxone}>

                    </View>
                    <View style={styles.boxtwo}>
                        <Text style={styles.name}> Hi {this.state.username}</Text>
                        <Text style={styles.subtitle}> {this.state.email}</Text>

                    </View>
                    <View style={styles.boxthree}>
                        <ImageBackground source={require('../assets/graphone.png')} style={{width:360,height:'100%'}}/>

                    </View>
                    <View style={styles.boxfour}>
                        <Day dayname="Sun"/>
                        <Day dayname="Mon"/>
                        <Day dayname="Tue"/>
                        <Day dayname="Wed"/>
                        <Day dayname="Thu" active={this.state.activestate}/>
                        <Day dayname="Fri"/>
                        <Day dayname="Sat"/>

                    </View>
                </View>
                <View style={styles.containertwo}>
                    <View style={styles.line}></View>
                    <View style={styles.progress}>
                        <Text style={styles.textone}> My Progress</Text>
                    </View>
                    <View style={styles.cards}>
                        <Card
                        move="bounceInLeft"
                        image={require('../assets/checkbox.png')}
                        title="Mission"
                        subtitle="85% completed"
                        completed="85%"
                        screenchange = {()=>this.change()}
                        />
                        <Card
                        move="bounceInRight"
                        image={require('../assets/checktodo.png')}
                        title="done"
                        subtitle="75% completed"
                        completed="75%"
                        />
                    <Button title="로그아웃 " onPress={()=> firebase.auth().signOut()}/>


                    </View>
                    
                </View>

            </View>


        );
    }
}

const styles =StyleSheet.create({
    container : {
        flex : 1,
        display : 'flex',
        backgroundColor : '#136DF3'
    },
    containerone : {
        flex : 1.5,
        display : 'flex'
    },
    containertwo : {
        flex : 1,
        backgroundColor : '#fff',
        borderTopRightRadius : 60,
        borderTopLeftRadius : 60,
    },
    boxone : {
        flex : 1,
    },
    boxtwo : {
        flex : 0.8,
        marginHorizontal : 35
    },
    boxthree : {
        flex : 2.5,
    },
    boxfour : {
        flex : 0.5,
        color : '#fff',
        flexDirection : 'row'
    },
    name : {
        fontSize : 38,
        color : '#fff',
        fontWeight : 'bold',
        letterSpacing : -0.5,
    },
    subtitle : {
        fontSize : 20,
        color : '#fff'
    },
    line : {
        width : 66,
        height : 4,
        backgroundColor : '#F4F0F0',
        borderRadius : 2,
        marginVertical : 25,
        left : 150
    },
    progress : {
        left : 50
    },
    textone : {
        fontSize : 20,
        color : '#2D2D2D',
        letterSpacing : -0.5
    },
    cards : {
        flex : 1,
        display : 'flex',
        marginTop : 10,
        marginHorizontal : 30
    },
})
