import React, {Component} from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import store from './redux/store'
import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyBZB7sOgrWij0bTyO-0w18WQxcVst-v8OY",
    authDomain: "touristguide-41eec.firebaseapp.com",
    databaseURL: "https://touristguide-41eec.firebaseio.com",
    projectId: "touristguide-41eec",
    storageBucket: "",
    messagingSenderId: "505443117285"
  };
  firebase.initializeApp(config);

class ReduxApp extends React.Component{
     render(){
         return(
            <Provider store={store}>
                 <App/>
            </Provider>
         );
     }
 }
AppRegistry.registerComponent('Tourist', () => ReduxApp);
