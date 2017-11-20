import React, { Component } from 'react';
import {Platform} from 'react-native';
import { Router, Scene, Stack} from 'react-native-router-flux';
import First from './components/index/firstpage';
import SignIn from './components/auth/signIn';
import SignUp from './components/auth/signUp';
import Main from './components/index/index';
import Place from './components/index/place';
import GMap from './components/index/map';


export default class App extends Component//<{}> 
{
  render() {
    return (
        <Router>
          <Stack key="root" activeBackgroundColor>
              <Scene key="first" component={First} initial={true} hideNavBar/>
              <Scene key="signin" component={SignIn} hideNavBar/>
              <Scene key="signup" component={SignUp} hideNavBar/>
              <Scene key='index' component={Main} hideNavBar/>
              <Scene key='place' component={Place} hideNavBar/>
              <Scene key='map' component={GMap} hideNavBar/>
          </Stack>       
        </Router>
    );
  }
}