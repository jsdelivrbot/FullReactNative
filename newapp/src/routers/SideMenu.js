import React, { Component } from 'react'
import { View,StyleSheet } from 'react-native'
import { Container, Button, Text } from 'native-base';

export default class SideMenu extends Component {
  render() {
    return (
        <Container style = {styles.container}>
        <Button success onPress={() => this.props.navigation.navigate('home') }>
            <Text> BTN 1</Text>
        </Button>
        <Button success onPress={() => this.props.navigation.navigate('blankPage2') }>
            <Text> BTN 2</Text>
        </Button>
      </Container>
    )
  }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
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
