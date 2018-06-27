
import React, { Component } from 'react'
import {View} from 'react-native'
import PropTypes from 'prop-types'
import { ColorsChart, Color } from '../../../../common/Color';
import { Button, ListItem, Badge, Body, Right,Text,Icon, Left } from 'native-base';

export default class ItemUserComponent extends Component {
    render() {
        const btnActive = <Button success style={{ height: 20 }}>
                              <Text style={{ fontSize: 7 }}>Active </Text>
                          </Button>
        const btnWaitActive = <Button warning style={{ height: 20 }}>
                          <Text style={{ fontSize: 7 }}>Active </Text>
                        </Button>
      const logoBadge = (this.props.item.fullname.length>0) ? this.props.item.fullname[0].toLocaleUpperCase(): 'S';
      const rdColor = Math.floor(Math.random()*100) % ColorsChart.length;
      return (
        <ListItem>
          <Badge style={{backgroundColor:ColorsChart[rdColor],alignSelf:'center'}}>
            <Text>{logoBadge}</Text>
          </Badge>
      
          <Body style={{marginLeft:10}}>
            <Text numberOfLines = {1}>
              <Icon
                style={{  color: Color.smartlog,fontSize:20}}
                name="person"
              />
              {` ${this.props.item.fullname}`}
            </Text>
            <Text numberOfLines = {1} note>
              <Icon style={{ color: Color.smartlog,fontSize:18 }} name="mail" />{" "}
              {`${this.props.item.email}`}
            </Text>
          </Body>
          <Right>
            { (this.props.item.status ==1 ) ? btnActive : btnWaitActive}
          </Right>
          <View style={{
            height: 1,
            backgroundColor:'white'                            
          }}>
             
          </View>
        </ListItem>
      );
    }
  }
  ItemUserComponent.defaultProps = {
  }
  ItemUserComponent.propTypes  = {
    item: PropTypes.object
  }