import React, { Component } from 'react';
import {View, Text,StyleSheet, Image} from 'react-native';

var data = {name: "Udon West", location: "150 Ave", phone: "124-555-1111"};

export default class RestaurantPage extends Component {
  testGET(){
    console.log("testing");
    fetch('https://api.foursquare.com/v2/venues/40a55d80f964a52020f31ee3?client_id=E4I2YF3S5DENC1Z52CT2TS5HHCHGY2ZSISMDPXZXAYSGIZDS&client_secret=DF233W3QNVPARPBOETGASUQGWHLIAHUUEHISC1UEUODDDTBK&v=20130815&ll=40.7,-74&query=sushi')
      .then((response) => response.json())
      .then((responseJson) => {

        console.log(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render(){
    this.testGET();
    return(
      <View>
        <View style={{marginTop:90, marginLeft: 20, flexDirection:'row'}}>
          <View style={{flex:0.3}}>
            <Image source={require('./img/group_img.png')} style={{height: 100, width: 100, margin: 20, borderWidth: 2}} />
          </View>
          <View style={{flex:0.6, margin: 20,marginLeft: 80}}>
            <Text style={{fontSize: 20, fontWeight:'bold', marginBottom: 15}}>{data.name}</Text>
            <Text>{data.location}</Text>
            <Text>{data.phone}</Text>
          </View>
        </View>
        <View style={{borderTopWidth: 0.5, marginLeft: 30, marginRight: 30}}>
          <Text style={{marginTop: 20, fontSize: 15 ,fontWeight:'bold'}}>Eco-Ratings</Text>
        </View>
        <View style={{flexDirection:'row', height: 50, marginTop: 10}}>
          <View style={{flex:0.6, marginLeft: 30}}>
            <Text >Separate bins for recyclables, compostables and landfill waste?</Text>
          </View>
          <View style={{flex:0.4}}>
            <Text >5 out of 7</Text>
          </View>
        </View>
        <View style={{flexDirection:'row', height: 30, marginTop: 10}}>
          <View style={{flex:0.6, marginLeft: 30}}>
            <Text >Biodegradable dishes/utensils?</Text>
          </View>
          <View style={{flex:0.4}}>
            <Text >4 out of 6</Text>
          </View>
        </View>
        <View style={{borderTopWidth: 0.5, marginLeft: 30, marginRight: 30}}>
          <Text style={{marginTop: 20, fontSize: 15 ,fontWeight:'bold'}}>Community</Text>
        </View>
      </View>
    );
  }

}
