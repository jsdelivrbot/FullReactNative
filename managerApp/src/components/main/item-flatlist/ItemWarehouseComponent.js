import React, { Component } from 'react'
import {
    Text,
    Right,
    ListItem,
    Button,
    Body,
  } from "native-base";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Color } from '../../../common/Color';
import { ConfigWarehouseScreen } from '../../../common/ScreenName';
export default class ItemWarehouseComponent extends Component {
    constructor(props){
      super(props);
    }
    // onChangeConfig(){
    //   this.props.navigation.navigate(ConfigWarehouseScreen);
    // }
    render() {
      const btnActive = <Button success style={{ height: 20 }}>
                          <Text style={{ fontSize: 7 }}>Active </Text>
                        </Button>
      const btnWaitActive = <Button warning style={{ height: 20 }}>
                              <Text style={{ fontSize: 7 }}>Active </Text>
                           </Button>
        return (
          <ListItem avatar>
               <Button icon transparent primary onPress = {this.props.onChangeConfig}>
                <Icon name='pencil' color={Color.smartlog} />
              </Button>
                <Body>
                  <Text >{` ${this.props.item.warehousename}`}</Text>
                </Body>
                <Right>             
                    { (this.props.item.hide == 0 ) ? btnActive : btnWaitActive}  
                </Right>
           </ListItem>
        );
    }
}