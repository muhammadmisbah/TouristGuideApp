import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  // TouchableOpacity,
  Dimensions,
  StatusBar,
  Image
} from 'react-native';
import {Input, Item, Label, Button, Text, View, Spinner} from 'native-base';
import {Actions} from 'react-native-router-flux';
import styles from '../styles.js';
import {connect} from 'react-redux';
import * as firebase from 'firebase';

class First extends Component{
  constructor(){
    super();
    this.state={
      sign: false,
    }
  }
  
  componentDidMount(){
    firebase.auth().onAuthStateChanged((user)=> {
      console.log(user);
      if(user){
        this.props.user(user);      
        Actions.map();
      }
      else{
        this.setState({sign: true})
      }
    })
  }

  render() {
    return (
      <View style={styles.fcontainer}>
        <Image style={{height: Dimensions.get('window').height / 4,
         width: Dimensions.get('window').width / 2,
          marginTop: Dimensions.get('window').height / 7,}} source={require('../../tgLogo.png')}/>
        <Image style={{height: Dimensions.get('window').height / 12,
         width: Dimensions.get('window').width / 1.05,
          }}
           source={require('../../logo.png')}/>
          <StatusBar backgroundColor='brown' barStyle="light-content"/>
          
          {this.state.sign ?
          <View style={styles.first}>
            <Button onPress={()=>Actions.signin()} style={styles.fbutton}>
                <Text style={styles.btext}>Sign In </Text>
            </Button>
                <Text style={styles.ftext}>-- OR --</Text>
            <Button onPress={()=>Actions.signup()} style={styles.fbutton}>
                <Text style={styles.btext}>Sign Up </Text>
            </Button>
          </View>
          :
          <View style={styles.first}>
            <Spinner color="brown"/>
          </View>
          }
       </View>
    );
  }
}
const mapStateToProps = (state)=>{
  return{}
};
const mapDispatchToProps = (dispatch)=>{
  return { user: (user)=>
    dispatch({type: "SIGN_UP",
      user: user,
      data: true
    })
  }
  };
export default connect(mapStateToProps, mapDispatchToProps)(First);