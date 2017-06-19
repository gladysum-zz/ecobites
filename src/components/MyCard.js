import React, { Component } from 'react';
import {View, Text,StyleSheet, Image} from 'react-native';
import { Container, Content, Card, CardItem, List, ListItem, Header, Footer,FooterTab, Title, Icon, Button, InputGroup, Input } from 'native-base';


export default class MyCard extends Component {
  render(){
    return (
      <Card style={this.props.style}>
        <CardItem button onPress={this.props.func}>
          <Image style={styles.imageStyle} source={require('./img/group_img.png')} />
        </CardItem>
        <CardItem button onPress={this.props.func} >
          <Text style={styles.textStyle}>{this.props.text}</Text>
        </CardItem>
      </Card>
    );
  }
}



const styles = StyleSheet.create({
  imageStyle : { flex: 1, width: 155, height: 140,resizeMode: 'cover' },
  textStyle: {textAlign:'center'}
});
