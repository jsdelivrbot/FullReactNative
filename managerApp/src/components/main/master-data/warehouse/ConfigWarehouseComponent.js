import React, { Component } from 'react';
import { View } from 'react-native';
import { Form, Item, Label, Input,IconNB, Fab, Button, Icon, Text, Container, CheckBox, Header, Left, Right, Body, Content } from 'native-base';
import { Color } from '../../../../common/Color';
import { STRINGS } from '../../../../common/Language';
import TestHeaderComponent from '../../test-component/TestHeaderComponent';


export default class ConfigWarehouseComponent extends Component {
  constructor(props){
      super(props);
      this.state = {
        active: true
      };
     // alert(JSON.stringify(this.props.navigation.goBack()));
  } 
  static navigationOptions = ({navigation}) => ({
    header: <TestHeaderComponent navigation={navigation}/>
  });
  render() {
    return (
        <Content style={{ flex: 1,margin:20 }} >
        <Form>
          <Item floatingLabel last >
            <Label style={{color:Color.smartlog}}>{STRINGS.CONFIGWAREHOUSE.company}</Label>
            <Input style/>
          </Item>
          <Item floatingLabel last>
            <Label style={{color:Color.smartlog}}>{STRINGS.CONFIGWAREHOUSE.warehouseCode}</Label>
            <Input  />
          </Item>
          <Item floatingLabel last>
            <Label style={{color:Color.smartlog}}>{STRINGS.CONFIGWAREHOUSE.warehouseName}</Label>
            <Input  />
          </Item>
          <Item floatingLabel last>
            <Label style={{color:Color.smartlog}}>{STRINGS.CONFIGWAREHOUSE.city}</Label>
            <Input  />
          </Item>
          <Item floatingLabel last>
            <Label style={{color:Color.smartlog}}>{STRINGS.CONFIGWAREHOUSE.district}</Label>
            <Input  />
          </Item>
          <Item floatingLabel last>
            <Label style={{color:Color.smartlog}}>{STRINGS.CONFIGWAREHOUSE.ward}</Label>
            <Input  />
          </Item>
          <Item floatingLabel last>
            <Label style={{color:Color.smartlog}}>{STRINGS.CONFIGWAREHOUSE.address}</Label>
            <Input  />
          </Item>
          <Item last style ={{height: 65}}>
            <CheckBox checked={false} />
          </Item>
          <Item style={{alignItems:'center',justifyContent:'center'}}>
            <Button full>
              <Icon name='add' />
              <Text> Add </Text>
            </Button>
          </Item>
          
        </Form>
      </Content>
    )
  }
}