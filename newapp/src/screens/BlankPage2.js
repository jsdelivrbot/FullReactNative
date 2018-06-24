import React, { Component } from 'react'
import {View,StyleSheet } from 'react-native'
import { Container, Button, Text, Header, Left, Body, Title, Right, Icon } from 'native-base';
import {
    DrawerActions,
    NavigationActions
} from 'react-navigation';
export default class BlankPage2 extends Component {
    static navigationOptions = {
        header: null
      };
  render() {
    return (
      <Container >
         <Header  style= {styles.headerView}>
          <Left>
            <Button
              transparent
              onPress={() => {
                this.props.navigation.dispatch(
                  NavigationActions.RESET = {
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: "home" })]
                  }
                );
                this.props.navigation.goBack();
              }}
            >
              <Icon active name="power" />
            </Button>
          </Left>

          <Body>
            <Title>Home</Title>
          </Body>

          <Right>
            <Button
              transparent
              onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}
            >
              <Icon active name="menu" />
            </Button>
          </Right>
        </Header>
        <Text> BlankPage2</Text>
        <Button
              transparent
              onPress={() => this.props.navigation.goBack()}
            >
              <Icon active name="menu" />
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
    headerView: {
      height: 40,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: 'blue'
    },
  });
