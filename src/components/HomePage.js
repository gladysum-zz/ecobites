import React, { Component } from 'react';
import {View, Text,StyleSheet, Image, ListView} from 'react-native';
import StarRating from 'react-native-star-rating';


var restaurantData = [{name:"kitchen", stars:4.7, location: "150 Ave"},{name:"kitchen2", stars:3.5, location: "154 Ave"},{name:"kitchen3", stars:5, location: "32 Ave"}];



export default class HomePage extends Component {

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
      <ListView style={{marginTop: 70, borderTopWidth: .5}}
        dataSource={this.state.dataSource}
        renderRow={(rowData) =>
          <View style={{borderBottomWidth: .5, flexDirection:'row'}}>
            <Image source={require('./img/group_img.png')} style={{flex:.2, height: 50, margin: 10}}
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
                    selectedStar={(rating) => this.onStarRatingPress(rating)}
                  />
                </View>
                <View style={{flex:.3, marginLeft: 20}}>
                  <Text style={{fontSize: 10}}>1 Review</Text>
                </View>
                <View style={{flex:.3}}>
                  <Text style={{fontSize: 10}}>Something here</Text>
                </View>
              </View>

              <View style={{flex:1, marginTop: 5}}>
                <Text style={{}}>{rowData.location}</Text>
              </View>
            </View>

          </View>
        }
      />
    );
  }
}
