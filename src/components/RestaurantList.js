import React, { Component } from 'react';
import {View, Text,StyleSheet, Image, ListView,TouchableOpacity} from 'react-native';
import { Router, Scene, Actions } from 'react-native-router-flux';
import StarRating from 'react-native-star-rating';
var SearchBar = require('react-native-search-bar');



var restaurantData = [
  {name:"Tacos Lokos 4ever", stars:4.7, numReviews:12, location: "120 Franklin St Brooklyn, NY 11222",
  image:"./img/im1.jpg"},
  {name:"The Blue Light Speak Cheesy", stars:5, numReviews:53, location: "114 Greenpoint Ave Brooklyn, NY 11222", image:"./img/im2.jpg"},
  {name:"Bulbap Grill", stars:4.5, numReviews:46, location: "646 Manhattan Ave Brooklyn, NY 11222",
  image: "./img/im3.jpg"},
  {name:"Paulie Gee’s", stars:4.6, numReviews:945, location: "60 Greenpoint Ave Brooklyn, NY 11222",
  image: "./img/im4.jpg"},
  {name:"21 Greenpoint", stars:4.5, numReviews:36, location: "21 Greenpoint Ave Brooklyn, NY 11222",
  image: "./img/im5.jpg"},
  {name:"Naked Dog", stars:4.5, numReviews:103, location: "47 Java St Greenpoint, NY 11222",
  image: "./img/im6.jpg"},
  {name:"The Bounty", stars:4.5, numReviews:164, location: "131 Greenpoint Ave Brooklyn, NY 11222",
  image: "./img/im7.jpg"},
  {name:"The Gentry", stars:4.5, numReviews:28, location: "592 Manhattan Ave Brooklyn, NY 11222",
  image: "./img/im8.jpg"}
];



export default class RestaurantList extends Component {



  state = {dataSource: restaurantData };
  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(restaurantData),
    };
  }



  render() {
    return (
      <View>
        <View style={{marginTop: 63, backgroundColor:"blue"}}>
          <SearchBar
            ref='searchBar'
            placeholder='Search'
          />
        </View>
        <ListView style={{borderTopWidth: .5}}
          dataSource={this.state.dataSource}
          renderRow={(rowData) =>
              <TouchableOpacity onPress={Actions.RestaurantPage}>
              <View style={{borderBottomWidth: .5, flexDirection:'row'}} >

              <Image source={require(rowData.image)} style={{flex:.2, height: 50, margin: 10}}
              />
              <View style={{flex:.8, margin:10, flexDirection:'column'}}>
                <View style={{flex:1}}>
                  <Text style={{fontWeight:'bold'}}>{rowData.name}</Text>
                </View>
                <View style={{flex:1, flexDirection:'row'}}>
                  <View style={{flex:.15}}>
                    <StarRating
                      disabled={false}
                      maxStars={5}
                      starSize={10}
                      rating={rowData.stars}

                    />
                  </View>
                  <View style={{flex:.3, marginLeft: 20}}>
                    <Text style={{fontSize: 10}}>{rowData.numReviews} Reviews</Text>
                  </View>
                  <View style={{flex:.3}}>
                    <Text style={{fontSize: 10}}></Text>
                  </View>
                </View>

                <View style={{flex:1, marginTop: 5}}>
                  <Text style={{}}>{rowData.location}</Text>
                </View>
              </View>
              </View>

              </TouchableOpacity>
          }
        />
      </View>
    );
  }
}

