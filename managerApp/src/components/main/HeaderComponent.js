import React, { Component } from 'react';
import { View } from 'react-native';
import {
    DrawerActions,
    NavigationActions
} from 'react-navigation';
import { Icon, Header, Left, Right, Button} from 'native-base';
import { styles } from '../../common/Styles';
export default class HeaderComponent extends Component {
    constructor(props){
        super(props);
    }
   render() {
        return (
            <Header style={styles.headerView}>
                <Left>
                    <Button transparent onPress={() => alert(JSON.stringify(this.props.screenProps.navigation))}>
                    <Icon name='arrow-back' />
                    </Button>
                </Left>
                <Right>
                    <Button transparent onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}>
                    <Icon ios='ios-menu' android="md-menu" style={styles.iconMenu}/>
                    </Button>
                </Right>
            </Header>
        );
    }
}

// render() {
//     return (<View style={styles.headerView}>  
//         <TouchableHighlight style={{ marginLeft: 10}}
//             onPress={() => this.props.navigation.openDrawer()}>
//             <Icon ios='ios-menu' android="md-menu" style={styles.iconMenu}/>
//         </TouchableHighlight>
//     </View>);
// }