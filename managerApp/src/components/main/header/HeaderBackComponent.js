import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import {
    DrawerActions,
    NavigationActions
} from 'react-navigation';
import { Icon, Header, Left, Right, Button, Body,Text} from 'native-base';
import { styles } from '../../../common/Styles';
import { STRINGS } from '../../../common/Language';

export default class HeaderBackComponent extends Component {
    constructor(props){
        super(props);
    }
   render() { 
        return (
            <Header style={styles.headerView}>
                <Left>
                    <Button transparent onPress={() => this.props.navigation.goBack()}>
                      <Icon ios='ios-arrow-back' android="md-arrow-back" />
                    </Button>
                </Left>
                 <Body>
                    <Text>{ this.props.title }</Text>
                </Body>
                <Right>
                    <Button transparent onPress = {this.props.onChangeLanguage} >
                        <Text>{STRINGS.getLanguage()}</Text>
                    </Button>
                </Right>
             </Header>
        );
    }
}

HeaderBackComponent.defaultProps = {
    title: ''
}
HeaderBackComponent.propType = {
    title : PropTypes.string,
    onChangeLanguage: PropTypes.func,
}