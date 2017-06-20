import React, { Component } from 'react';
import {View, Text,StyleSheet, Image,ScrollView} from 'react-native';
import {Button,Input, List,ListItem} from 'native-base';
import PubNub from 'pubnub';


var data = {name: "Tacos Lokos 4ever", location: "120 Franklin St Brooklyn, NY 11222", phone: "(646) 325-9567"};
var pubnubData = [];

const pubnub = new PubNub({
    subscribeKey: "sub-c-a9aedd3a-550b-11e7-8ac6-0619f8945a4f",
    publishKey: "pub-c-2a6d43bc-dfef-4729-ba92-a9c47259ceb6",
    ssl: true
})


var channel = "restaurant";
pubnub.subscribe({channels:[channel]});

export default class RestaurantPage extends Component {
  state = {dataSource: pubnubData };
  constructor() {
    super();


  }

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

  publishPubnub(){
    pubnub.publish({
      channel : "restaurant",
      message : "test"
    });
  }
  fetchPubnub(){
    pubnub.history({ channel: 'restaurant',}, (status, response) => {
      response.messages.forEach((msg)=>{
        // console.log(msg);
        if (typeof msg.entry === "string")
          pubnubData.push(msg.entry);
        else{
          pubnubData.push(msg.entry.text);
        }
      });
      this.setState({dataSource: pubnubData});
      }
    );
  }


  componentWillMount(){
    this.fetchPubnub();

  }

  render(){
    this.testGET();

    console.log("pubnubData");
    console.log(this.state.dataSource);
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
        <View style={{flexDirection:'row', justifyContent:"center", borderWidth: 2, marginLeft: 30, marginRight:30, borderRadius: 20}}>
          <ScrollView  ref={ref => this.scrollView = ref} onContentSizeChange={(contentWidth, contentHeight)=>{ this.scrollView.scrollTo({y: contentHeight - 60, animated: true})}} style={{ height: 200,marginLeft: 20, marginRight:20}}>
            <List dataArray={this.state.dataSource}
              renderRow={(item) =>
                  <ListItem style={{flexDirection:'row'}}>
                      <Image source={require('./img/avatar-large.png')}  style={{flex: 0.1,  width: 20, height:20}} />
                      <View style={{flex:0.6}}>
                        <Text style={{textAlign:"right"}}>{item}</Text>
                      </View>
                  </ListItem>
              }>
              </List>
          </ScrollView>
        </View>

      </View>
    );
  }

}

// Submit Button
// <View style={{flexDirection:'row', justifyContent:"center", backgroundColor:"yellow",marginLeft: 30, marginRight:30}}>
//   <Input  style={{color:"green", flex: 0.8, backgroundColor:"red"}}  label='comment'  onChangeText={comment => this.setState({ comment })}/>
//   <Button style={{flex:0.3}} onPress={this.publishPubnub.bind(this)}>
//     <Text>
//       Submit
//     </Text>
//   </Button>
// </View>
