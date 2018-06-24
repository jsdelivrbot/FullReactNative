import React, { Component } from 'react';
import { View } from 'react-native';
import {
    DrawerActions,
    NavigationActions
} from 'react-navigation';
import { Icon, Header, Left, Right, Button, Body,Text} from 'native-base';
import { styles } from '../../../common/Styles';

export default class TestHeaderComponent extends Component {
   render() { 
        return (
            <Header style={styles.headerView}>
                <Left>
                    <Button transparent onPress={() => this.props.navigation.goBack()}>
                      <Icon ios='ios-arrow-back' android="md-arrow-back" />
                    </Button>
                </Left>
                 <Body>
                    <Text> Add or Edit</Text>
                </Body>
                <Right>
                </Right>
             </Header>
        );
    }
}