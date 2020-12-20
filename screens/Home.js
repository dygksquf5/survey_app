import React, { useState, useEffect, Component, Button } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import { Container, Content, Card} from 'native-base';
import FontIcon from 'react-native-vector-icons/MaterialCommunityIcons';




export default class Home extends Component {

  render() {

    return (
      <View style={styles.root}>
        <Container>
          <Content style={{marginBottom: -200}}>
          {/* <TouchableOpacity onPress={this.gotoPassword}> */}
          <TouchableOpacity>
            <Card style={styles.card}>
            <View style={styles.line}>
                <Text>   </Text>
              </View>

              <View style={styles.cardDate}>
              <Image style={styles.icon1}>
                  </Image>

              <Text style={styles.cardDownText}>{this.props.navigation.getParam("username")}</Text>
              <Button title="로그아웃" onPress={() => this.props.navigation.navigate("LoginScreen") }/> 

              </View>              

            </Card>
            </TouchableOpacity>
          </Content>

          
          <Content style={{marginVertical:-110}}>
          {/* <TouchableOpacity onPress={this.gotoGetCred}> */}
          <TouchableOpacity >
            <Card style={styles.card2}> 
              <View style={styles.plusIcon}>
                <FontIcon name='folder-plus-outline' color='#96b4ee' size={45}> 
                  </FontIcon> 
              </View>
            </Card>
            </TouchableOpacity>
          </Content>

        </Container>

        



        <View style={styles.addButton}>
          {/* <TouchableHighlight underlayColor='#ff7043' onPress={this.gotoQR} > */}
          <TouchableHighlight underlayColor='#ff7043' >
            <Text style={{ marginLeft:-10, marginTop: 3,
                  color: "white"}}> <FontIcon name='qrcode-scan' color='white' size={27}  style={{marginLeft:-90}} /><Text>   </Text>
              SCAN CODE
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
    
  }
  // gotoQR = () => {
  //   this.props.navigation.navigate('QRcode_scanner');
  // };
  // gotoPassword = () => {
  //   this.props.navigation.navigate('SecondScreen');
  // };
  // gotoGetCred = () => {
  //   this.props.navigation.replace('Loading_2');
  // };

}



const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'white',
  },

  card: {
    height: 180,
    marginLeft: 25,
    marginRight: 25,
    marginTop: 40,
    shadowColor: '#A4A4A4',
    shadowOpacity: 0.8,
    shadowRadius: 3,
    shadowOffset: {
      height: 4,
      width: 1,
    },
    borderRadius: 14,
    backgroundColor: '#FAFAFA',
    borderColor: '#FAFAFA',
  },

  card2:{
    height: 100,
    marginLeft: 25,
    marginRight: 25,
    marginTop: 50,
    paddingTop: 20,
    shadowColor: '#A4A4A4',
    shadowOpacity: 0.8,
    shadowRadius: 3,
    shadowOffset: {
      height: 4,
      width: 1,
    },
    borderRadius: 14,
    backgroundColor: '#FAFAFA',
    borderColor: '#FAFAFA',
  },

  addButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 100,
    borderRadius: 100,
    backgroundColor: '#2c69dd',
    borderColor: '#96b4ee',
    height: 45,
    width: 180,
    borderRadius: 100,
    position: 'absolute',
    bottom: 30,
    shadowColor: '#A4A4A4',
    shadowOpacity: 0.8,
    shadowRadius: 3,
    shadowOffset: {
      height: 4,
      width: 1,
    },
  },


  icon1:{
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 35,
    marginRight: 210,
    width: 60,
    height: 60,
    
    
  },
  line:{
    backgroundColor:'#2c69dd',
    fontSize: 5,
    marginTop: 28,
    marginBottom: -10
  },
  
  cardDate:{
    
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginRight:30,
    marginBottom:20,


  },
  plusIcon:{
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginRight:30,
    marginBottom:30 ,
    paddingTop:6,

  },

  cardDownText: {
    marginTop: -41,
    fontSize: 24,
    marginRight: 35,
    marginBottom:13,
    
  },

});
