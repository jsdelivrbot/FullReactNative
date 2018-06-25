import React, { Component } from 'react';
import { View } from 'react-native';
import { Form, Item, Label, Input,IconNB, Fab, Button, Icon, Text, Container, CheckBox, Header, Left, Right, Body, Content, StyleProvider } from 'native-base';
import { Color } from '../../../../common/Color';
import { STRINGS } from '../../../../common/Language';
import getTheme from '../../../../assets/native-base-theme/components';
import material from '../../../../assets/native-base-theme/variables/material';
import HeaderBackComponent from '../../header/HeaderBackComponent';


export default class ConfigWarehouseComponent extends Component {
  constructor(props){
      super(props);
      this.state = {
        active: true
      };
     // alert(JSON.stringify(this.props.navigation.goBack()));
  } 
 
  onChangeLanguage(){   
    let keyLangue =STRINGS.getLanguage();
       if(keyLangue === 'en') {
         keyLangue ='vn'
       } else {
         keyLangue = 'en'
       }
      STRINGS.setLanguage(keyLangue);
      this.setState({});
  }
  static navigationOptions = ({navigation}) => ({
    header: null
  });
  render() {
    return (
      <StyleProvider style={getTheme(material)}>
          <Content style={{ flex: 1 }} >
          <HeaderBackComponent title = {'Add'} navigation={this.props.navigation} onChangeLanguage = {this.onChangeLanguage.bind(this)}/>
         <Form style={{margin: 20}}>
          <Item  floatingLabel last >
            <Label style={{color:Color.smartlog}}>{STRINGS.CONFIGWAREHOUSE.company}</Label>
            <Input style={{fontSize:12}}/>
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
         
          
        </Form>
      </Content>
      </StyleProvider>
    )
  }
}