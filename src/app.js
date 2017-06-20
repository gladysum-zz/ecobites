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
  View,
  TouchableOpacity
} from 'react-native';
import { Router, Scene, Actions } from 'react-native-router-flux';
import { Icon,Input } from 'native-base';

import LoginPage from './components/LoginPage';
import RestaurantList from './components/RestaurantList';
import RestaurantPage from './components/RestaurantPage';
import AddRating from './components/AddRating';



class App extends Component {


  render() {
    return (
    <Router>
      <Scene key="Login">
        <Scene key="LoginPage" component={LoginPage}  title={"EcoBites"} titleStyle={{fontWeight:'bold', fontSize: 40, color: "green"}} navigationBarStyle={{backgroundColor:'rgba(52,52,52,0)',borderBottomWidth:0}} />
      </Scene>
      <Scene key="root">
        <Scene key="RestaurantList" component={RestaurantList} type="reset" title="Search Restaurants" titleStyle={{ fontSize: 20}} navigationBarStyle={{backgroundColor:"green"}} renderBackButton={()=> <Icon name='menu' />}  />
        <Scene key="RestaurantPage" component={RestaurantPage} direction="vertical" title="Restaurant" titleStyle={{ fontSize: 20}} navigationBarStyle={{backgroundColor:"green"}}  renderRightButton={()=> <TouchableOpacity onPress={Actions.AddRating}><Icon name='ios-add' /></TouchableOpacity>}  />
        <Scene key="AddRating" component={AddRating} direction="vertical" title="Add Rating" titleStyle={{ fontSize: 20}} navigationBarStyle={{backgroundColor:"green"}}  />

      </Scene>

    </Router>
    );
  }
}



export default App;
