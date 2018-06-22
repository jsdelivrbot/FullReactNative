import React, { Component } from "react";
import { Image,Dimensions,TouchableOpacity } from 'react-native';
import { Container, Text,  Header, 
    Content, Card,Button,
    CardItem,Left,Right,Icon, Thumbnail,Separator,ListItem,List
} from "native-base";
import { Color } from "../../../common/Color";
import HeaderComponent from "../HeaderComponent";
import BaseComponent from "../../BaseComponent";
export default class MasterDataComponent extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      check: true
    };
  }
  componentDidMount(){
    this.outSession();
  }
  render() {
    const screenWidth = Dimensions.get('screen').width;
    const imgWidth = screenWidth * 0.5
    return (
      <Container>
        <HeaderComponent {...this.props} />
        <Content style ={{marginLeft:20,marginRight:20}}>
           {
             this.state.check &&  (<Container style={{height:60}}>

             </Container>)
           }
          <TouchableOpacity onPress = {()=>this.setState({ check: !this.state.check})}>
          <Container style={{flexDirection:'row',flex:1,height:60}}>
                <Card style={{flex:1,margin:20}}>
                  <CardItem style={{backgroundColor:Color.appAlpha}}>
                  <Icon style={{color: Color.white}} active name="mail" />
                     <Text>System Mail</Text>
                  </CardItem>
                </Card>
                <Card style={{flex:1,margin:20}}>
                  <CardItem style={{backgroundColor:Color.appAlpha}}>
                  <Icon style={{color: Color.white}} active name="person" />
                     <Text>System User</Text>
                  </CardItem>
                </Card>   
          </Container>
          </TouchableOpacity>
          <Container style={{flexDirection:'row',flex:1,height:60}}>
                <Card style={{flex:1,margin:20}} >
                  <CardItem style={{backgroundColor:Color.appAlpha}}>
                  <Icon style={{color: Color.white}} active name="mail" />
                     <Text>System Mail</Text>
                  </CardItem>
                </Card>
                <Card style={{flex:1,margin:20}}>
                  <CardItem style={{backgroundColor:Color.appAlpha}}>
                  <Icon style={{color: Color.white}} active name="person" />
                     <Text>System User</Text>
                  </CardItem>
                </Card>   
          </Container>
        </Content>
      </Container>
    );
  }
}
