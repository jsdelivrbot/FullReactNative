import React, { Component } from 'react'

import { ColorsChart,  } from '../../../common/Color';
import { Button, ListItem, Body, Right,Text, Left, Thumbnail } from 'native-base';

export default class ItemAvatarComponent extends Component {
    render() {
        const btnActive = <Button success style={{ height: 20 }}>
                              <Text style={{ fontSize: 7 }}>Active </Text>
                          </Button>
      const btnWaitActive = <Button warning style={{ height: 20 }}>
                          <Text style={{ fontSize: 7 }}>Active </Text>
                        </Button>
      const logoBadge = 'S';
      const rdColor = Math.floor(Math.random()*100) % ColorsChart.length;
  
      let cityname = this.props.item.cityname || '';
      return (
        <ListItem avatar>
              <Left>
                <Thumbnail source={{ uri: 'Image URL' }} />
              </Left>
              <Body>
                <Text>Kumar Pratik</Text>
                <Text note>Doing what you like will always keep you happy . .</Text>
              </Body>
              <Right style={{justifyContent:'center'}}>
              { (this.props.item.hide ==0 ) ? btnActive : btnWaitActive}
              </Right>
        </ListItem>
      );
    }
  }
  