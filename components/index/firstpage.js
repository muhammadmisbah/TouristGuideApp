import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  // TouchableOpacity,
  Dimensions,
  StatusBar,
  Image
} from 'react-native';
import {Input, Item, Label, Button, Text, View} from 'native-base';
import {Actions} from 'react-native-router-flux';
import styles from '../styles.js';

export default class First extends Component{
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
          <View style={styles.first}>
            <Button onPress={()=>Actions.signin()} style={styles.fbutton}>
                <Text style={styles.btext}>Sign In </Text>
            </Button>
                <Text style={styles.ftext}>-- OR --</Text>
            <Button onPress={()=>Actions.signup()} style={styles.fbutton}>
                <Text style={styles.btext}>Sign Up </Text>
            </Button>
          </View>  
       </View>
    );
  }
}