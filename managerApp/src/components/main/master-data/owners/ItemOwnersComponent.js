import React, { Component } from 'react'
import {
    Text,
    ListItem,
    Button,
    Body,
  } from "native-base";
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Color } from '../../../../common/Color';
import { ConfigWarehouseScreen } from '../../../../common/ScreenName';
export default class ItemOwnersComponent extends Component {
    constructor(props){
      super(props);
    }
    onEdit(){
      this.props.navigation.navigate(ConfigWarehouseScreen);
    }
    render() {
        return (
          <ListItem avatar
          >
              <Button icon transparent primary onPress = { ()=>this.onEdit.bind(this)}>
                <Icon name='pencil' color={Color.smartlog} />
              </Button>
              <Body style={{marginLeft:10}}>
                <Text style={{ fontSize: 15, marginLeft: 10 }}>
                    <Icon
                        style={{ fontSize: 15, color: Color.smartlog }}
                        name="compass"
                        />
                        {` ${this.props.item.company}`}
                </Text>
                <Text note style={{ fontSize: 10 }}>
                    <Icon 
                    style={{ fontSize: 10, color: Color.smartlog }} 
                    name="code-fork" 
                    />    
                    {`  ${this.props.item.warehousecode}`}
                </Text>
                <Text note style={{ fontSize: 10 }}>
                    <Icon 
                    style={{ fontSize: 10, color: Color.smartlog }} 
                    name="code-fork" 
                    />    
                    {`  ${this.props.item.storerkey}`}
                </Text>
            </Body>
           </ListItem>
        );
    }
}
ItemOwnersComponent.defaultProps = {
}
ItemOwnersComponent.propTypes  = {
  item: PropTypes.object,
}