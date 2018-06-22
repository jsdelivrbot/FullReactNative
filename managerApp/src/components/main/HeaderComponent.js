import React, { Component } from 'react';
import { View,TouchableHighlight,Image,StyleSheet } from 'react-native';
import {
    DrawerActions
} from 'react-navigation';
import { Icon} from 'native-base';
import { styles } from '../../common/Styles';
export default class HeaderComponent extends Component {
    constructor(props){
        super(props);
     
    }
   render() {
    return (<View style={styles.headerView}>  
            <TouchableHighlight style={{ marginLeft: 10}}
                onPress={() => this.props.navigation.dispatch(DrawerActions.toggleDrawer())}>
                <Icon ios='ios-menu' android="md-menu" style={styles.iconMenu}/>
            </TouchableHighlight>
        </View>);
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