import React, { Component } from 'react';
import { View } from 'react-native';
import { Form, Item, Label, Input,IconNB, Fab, Button, Icon, Text, Container } from 'native-base';
import { Color } from '../../../../common/Color';
import { optionHeaderHiden } from '../../../../RouterNavigation';


export default class ConfigWarehouseComponent extends Component {
  constructor(props){
      super(props);
      this.state = {
        active: true
      };
  } 
  render() {
    return (
        <Container style={{ flex: 1 }} >
        <Form>
          <Item floatingLabel last>
            <Label style={{color:Color.smartlog}}>Username</Label>
            <Input  />
          </Item>
          <Item floatingLabel last>
            <Label style={{color:Color.smartlog}}>Username</Label>
            <Input  />
          </Item>
          <Item floatingLabel last>
            <Label style={{color:Color.smartlog}}>Username</Label>
            <Input  />
          </Item>
          <Item floatingLabel last>
            <Label style={{color:Color.smartlog}}>Username</Label>
            <Input  />
          </Item>
          <Item floatingLabel last>
            <Label style={{color:Color.smartlog}}>Username</Label>
            <Input  />
          </Item>
          <Item floatingLabel last>
            <Label style={{color:Color.smartlog}}>Username</Label>
            <Input  />
          </Item>
          <Item floatingLabel last>
            <Label style={{color:Color.smartlog}}>Username</Label>
            <Input  />
          </Item>
          </Form>
      </Container>
    )
  }
}