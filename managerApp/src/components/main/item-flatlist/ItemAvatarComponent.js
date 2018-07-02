import React, { Component } from 'react'
import { Alert } from 'react-native'
import { ColorsChart,  } from '../../../common/Color';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, ListItem, Body, Right,Text, Left, Thumbnail, SwipeRow, View } from 'native-base';

export default class ItemAvatarComponent extends Component {
    render() {
      return (
        <SwipeRow
        style={{ backgroundColor: "#9370DB" }}
        swipeToOpenPercent= {false}
        leftOpenValue={75}
        rightOpenValue={-75}
        left={
          <Button success onPress={this.props.onEdit}>
            <Icon active name="pencil" style={{ color: "#FFF",fontSize:20  }} />
          </Button>
        }
        right={
          <Button danger onPress={this.props.onDelete}>
            <Icon active name="trash" style={{ color: "#FFF",fontSize:20 }}/>
          </Button>
        }
        body={
          <View style={{ paddingLeft: 20 }}>
            <Text style={{ color: "#FFF" }}>
              {this.props.item.name}
            </Text>
          </View>
        }
      />
      );
    }
  }
  