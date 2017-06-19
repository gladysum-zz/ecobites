import React, { Component } from 'react';
import {View, Text,StyleSheet, Image, ListView} from 'react-native';
import { Container, Content, Card, CardItem, List, ListItem, Header, Footer,FooterTab, Title, Icon, Button, InputGroup, Input, Spinner } from 'native-base';
import { Actions } from 'react-native-router-flux';
import MyCard from './MyCard.js';
import ScrollableTabView, {DefaultTabBar, } from 'react-native-scrollable-tab-view';
import firebase from 'firebase';


export default class LoginPage extends Component {
  state = {email:'test@test.com', password:'123456', error:'',name:'Pat'};


  componentWillMount(){
    var config = {
      apiKey: "AIzaSyBvyIdDdxf5Q1yWRttJiNcBw4KdvSgbTOI",
      authDomain: "ecobites-815de.firebaseapp.com",
      databaseURL: "https://ecobites-815de.firebaseio.com",
      projectId: "ecobites-815de",
      storageBucket: "ecobites-815de.appspot.com",
      messagingSenderId: "241741974150"
    };
    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true,uid:user.uid });
      } else {
        this.setState({ loggedIn: false,uid:undefined });
      }
    });
  }



  onLogin() {
    const { email, password } = this.state;
    this.setState({ error: '', loading: true });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(this.onLoginFail.bind(this));
  }

  onSignUp(){
    const { email, password,name } = this.state;

    this.setState({ error: '', loading: true });
    console.log(email+","+password);

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(user){
      const { currentUser } = firebase.auth();
      firebase.database().ref(`/users/${user.uid}/settings/name`)
        .set(name);
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(this.onLoginSuccess.bind(this));


    }.bind(this))
    .catch(this.onLoginFail.bind(this));
  }

  onLoginFail() {
    this.setState({ error: 'Authentication Failed', loading: false });
  }

  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: ''
    });
    Actions.root({uid:this.state.uid});

  }



  renderLoginButton(){
    if (this.state.loading) {
      return <Spinner color="#f49b42" />;
    }
    return(
      <Button  onPress={this.onLogin.bind(this)} >
        <Text>  Login </Text>
      </Button>
    );
  }

  renderSignUpButton(){
    if (this.state.loading) {
      return <Spinner color="#f49b42" />;
    }
    return (
      <Button onPress={this.onSignUp.bind(this)} >
        <Text>Sign up</Text>
      </Button>
    );
  }



  renderLoginForm(){
    return(
      <Card style={{margin: 5, backgroundColor:'rgba(52,52,52,0.8)'}}>
        <CardItem style={{marginTop:20,height: 200, flexDirection:'column',backgroundColor:'rgba(52,52,52,0.8)'}}>
          <InputGroup style={{flex:1}}>
              <Icon name='ios-person' />
              <Input  style={{color:"white"}} placeholder='Email' label='Email' value={this.state.email} onChangeText={email => this.setState({ email })}/>
          </InputGroup>
          <InputGroup style={{flex:1}}>
              <Icon name='ios-key' />
              <Input style={{color:"white"}} secureTextEntry placeholder='Password' value={this.state.password} label='Password' onChangeText={password => this.setState({ password })}/>
          </InputGroup>
          <View style={{flexDirection:'row', alignItems:'center', justifyContent:"center", flex:1, paddingTop: 10}}>
            {this.renderLoginButton()}
          </View>
          <Text style={styles.textError}>
            {this.state.error}
          </Text>
        </CardItem>
      </Card>
    );
  }

  renderSignUpForm(){
    return(
      <Card style={{margin: 5, backgroundColor:'rgba(52,52,52,0.8)'}}>
        <CardItem style={{flexDirection:'column', backgroundColor:'rgba(52,52,52,0.8)'}}>
          <InputGroup style={{flex:1}}>
              <Icon name='ios-person-outline' />
              <Input style={{color:"white"}} placeholder='Name' label='Name' value={this.state.name} onChangeText={name => this.setState({ name })}/>
          </InputGroup>
          <InputGroup style={{flex:1}}>
              <Icon name='ios-person' />
              <Input style={{color:"white"}} placeholder='Email' label='Email' value={this.state.email} onChangeText={email => this.setState({ email })}/>
          </InputGroup>
          <InputGroup >
              <Icon name='ios-key' />
              <Input style={{color:"white"}} secureTextEntry placeholder='Password' value={this.state.password} label='Password' onChangeText={password => this.setState({ password })}/>
          </InputGroup>
          <View style={{flexDirection:'row', alignItems:'center', justifyContent:"center", flex:1, paddingTop: 10}}>
            {this.renderSignUpButton()}
          </View>
          <Text style={{fontSize: 15,paddingTop:10, alignSelf: 'center',color: 'red'}}>
            {this.state.error}
          </Text>
        </CardItem>
      </Card>
    );
  }

  render() {

    return (
      <Image  source={require('./img/background.jpg')} style={{flex: 1, alignSelf: 'stretch',width: null}}>
      <Container style={{}}>
        <Content style={{ marginTop: 90}}>
        <Card style={{margin: 30, borderRadius: 20, backgroundColor:'rgba(52,52,52,0.8)'}}>
        <ScrollableTabView tabBarActiveTextColor="#f49b42" tabBarInactiveTextColor="white" tabBarUnderlineStyle={{backgroundColor:"#f49b42"}}>
          <View tabLabel='LOGIN' >
            {this.renderLoginForm()}
          </View>
          <View tabLabel='SIGNUP'>
            {this.renderSignUpForm()}
          </View>
        </ScrollableTabView>
        </Card>
        </Content>

      </Container>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f49b42',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  buttonStyle:{
    marginTop: 10,
    backgroundColor:"#f49b42",
    width: 220,
  },
  textError: {
    fontSize: 15,
    paddingTop:10,
    alignSelf: 'center',
    color: 'red'
  }
});
