import React, { Component } from 'react'
import { View,StyleSheet } from 'react-native'
import { Container, Button, Text } from 'native-base';
import { DashboardScreen, WarehouseScreen } from '../../../common/ScreenName';

export default class SideMenu extends Component {
  constructor(props){
    super(props);
    alert(JSON.stringify(this.props.navigation))
  }
  render() {
    return (
        <Container style = {styles.container}>
        <Button success onPress={() => this.props.navigation.navigate(DashboardScreen) }>
            <Text> BTN 1</Text>
        </Button>
        <Button success onPress={() => this.props.navigation.navigate(WarehouseScreen) }>
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
