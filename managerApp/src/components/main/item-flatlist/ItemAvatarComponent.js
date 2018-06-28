import React, { Component } from 'react'

import { ColorsChart,  } from '../../../common/Color';
import { Button, ListItem, Body, Right,Text, Left, Thumbnail, SwipeRow, Icon, View } from 'native-base';

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
        <SwipeRow
        style={{ backgroundColor: "#9370DB" }}
        leftOpenValue={75}
        rightOpenValue={-75}
        left={
          <Button success onPress={() => alert("Add")}>
            <Icon active name="add" style={{ color: "#FFF" }} />
          </Button>
        }
        right={
          <Button danger onPress={() => alert("Trash")}>
            <Icon active name="trash" />
          </Button>
        }
        body={
          <View style={{ paddingLeft: 20 }}>
            <Text style={{ color: "#FFF" }}>
              Swipe me to left and right
            </Text>
          </View>
        }
      />
      );
    }
  }
  