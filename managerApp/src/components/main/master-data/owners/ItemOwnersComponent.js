import React, { Component } from 'react'
import {
    Text,
    ListItem,
    Button,
    Body,
    Left,
    Right,
    Badge,
  } from "native-base";
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Color, ColorsChart } from '../../../../common/Color';
import { ConfigWarehouseScreen } from '../../../../common/ScreenName';
export default class ItemOwnersComponent extends Component {
    constructor(props){
      super(props);
    }
    onEdit(){
      this.props.navigation.navigate(ConfigWarehouseScreen);
    }
    render() {
        const logoBadge = (this.props.item.company.length>0) ? this.props.item.company[0].toLocaleUpperCase(): 'S';
        const rdColor = Math.floor(Math.random()*100) % ColorsChart.length;
        return (
          <ListItem >
               <Badge style={{backgroundColor:ColorsChart[rdColor]}}>
                    <Text>{logoBadge}</Text>
                </Badge>
              
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
              
            </Body>
            <Right>
            <Button icon transparent primary style={{ height: 20 }} onPress = { ()=>this.onEdit()}>
                <Icon name='pencil' color={Color.smartlog} style={{ fontSize: 20,marginRight:10 }} />
            </Button>   
            </Right>
         
           </ListItem>
        );
    }
}
ItemOwnersComponent.defaultProps = {
}
ItemOwnersComponent.propTypes  = {
  item: PropTypes.object,
}