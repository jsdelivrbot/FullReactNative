import React, { Component } from 'react'
import {  View,StyleSheet} from 'react-native'
import { Button, Text, Container } from 'native-base';

export default class Login extends Component {
  render() {
    return (
      <Container style = {styles.container}>
        <Button onPress = {()=>this.props.navigation.navigate('drawer')}>
          <Text> Go to Main</Text>
        </Button>
      </Container>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
});