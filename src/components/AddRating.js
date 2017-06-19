import React, { Component } from 'react';
import {View, Text,StyleSheet, Image} from 'react-native';

var data = {name: "Udon West", location: "150 Ave", phone: "124-555-1111"};

export default class AddRating extends Component {
  render(){
    return(
      <View style={{marginTop:90, marginLeft: 20, flexDirection:'row'}}>
        <View style={{flex:0.3}}>
          <Image source={require('./img/group_img.png')} style={{height: 100, width: 100, margin: 20, borderWidth: 2}} />
        </View>
        <View style={{flex:0.6, margin: 20,marginLeft: 80}}>
          <Text style={{fontSize: 20, fontWeight:'bold', marginBottom: 15}}>{data.name}</Text>
          <Text>{data.location}</Text>
          <Text>{data.phone}</Text>
        </View>

        <View>
        </View>

      </View>
    );
  }

}
