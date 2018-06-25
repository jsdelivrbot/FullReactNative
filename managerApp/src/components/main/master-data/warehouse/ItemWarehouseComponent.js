import React, { Component } from 'react'
import {
    Text,
    Right,
    ListItem,
    Button,
    Body,
  } from "native-base";
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Color } from '../../../../common/Color';
import { ConfigWarehouseScreen } from '../../../../common/ScreenName';
export default class ItemWarehouseComponent extends Component {
    constructor(props){
      super(props);
    }
    onEdit(){
      this.props.navigation.navigate(ConfigWarehouseScreen);
    }
    render() {
      const btnActive = <Button success style={{ height: 20 }}>
                          <Text style={{ fontSize: 7 }}>Active </Text>
                        </Button>
      const btnWaitActive = <Button warning style={{ height: 20 }}>
                              <Text style={{ fontSize: 7 }}>Active </Text>
                           </Button>
        return (
          <ListItem avatar
            onPress = {()=>this.props.navigation.navigate(ConfigWarehouseScreen)} 
          >
               <Button icon transparent primary onPress = { ()=>this.onEdit()}>
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
ItemWarehouseComponent.defaultProps = {
  selected: false
}
ItemWarehouseComponent.propTypes  = {
  item: PropTypes.object,
}