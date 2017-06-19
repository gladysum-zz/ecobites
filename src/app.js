/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Router, Scene, Actions } from 'react-native-router-flux';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';



class App extends Component {
  render() {
    return (
    <Router>
      <Scene key="Login">
        <Scene key="LoginPage" component={LoginPage}  title={"EcoBites"} titleStyle={{fontWeight:'bold', fontSize: 20, color: "white"}} navigationBarStyle={{backgroundColor:'rgba(52,52,52,0)',borderBottomWidth:0}} />
      </Scene>
      <Scene key="root">
        <Scene key="HomePage" component={HomePage} type="reset" title="EcoBites" titleStyle={{fontWeight:'bold', fontSize: 20}} navigationBarStyle={{backgroundColor:"#F8F8F9"}}  />

      </Scene>
    </Router>
    );
  }
}



export default App;
