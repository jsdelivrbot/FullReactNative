import React, { Component } from "react";
import { Image, Platform, StatusBar,Dimensions,StyleSheet,ImageBackground } from "react-native";
import {
  Container,
  Content,
  Text,
  Item,
  Input,
  Button,
  Icon,
  View,
  Left,
  Right,
  Toast
} from "native-base";
import commonColor from '../../../assets/themes/variables/commonColor';
const background = require("./images/shadow.png");
export default class TestLoginComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '', 
            password: '',
            touchedEmail: false,
            touchedPass: false
        };
    }
    validate(str){
        if(str != '' ){
            return false
        }
        return true
    }
  render() {
    return (
        <Container>
        <View style={styles.container}>
          <Content>
             <ImageBackground source={background} style={styles.shadow}>
              <View style={styles.bg}>
                <Item error ={this.validate(this.state.email) && this.state.touchedEmail }>
                    <Icon active name={"mail"} />
                    <Input 
                        onTouchCancel = {()=> alert('ok')}
                        
                        placeholder={"EMAIL"} 
                        onChangeText = {(text)=> alert('err')}
                    />
                </Item>
                { (this.validate(this.state.email) && this.state.touchedEmail ) &&
                    <Item style={{ borderColor: "transparent" }}>
                        <Icon active style={{ color: "red", marginTop: 5 }} name="bug" />
                        <Text style={{ fontSize: 15, color: "red" }}>{'error'}</Text>
                    </Item>
                }
                <Item error ={this.validate(this.state.password) && this.state.touchedPass }>
                    <Icon active name={"unlock"} />
                    <Input 
                        onTouchCancel = {()=> this.setState({
                            touchedPass: false
                        })}
                        placeholder={"EMAIL"} 
                        onChangeText = {(text)=> this.setState({ password: text,touchedPass: true})}
                        secureTextEntry = {true}
                    />
                </Item>
                { (this.validate(this.state.password) && this.state.touchedPass ) &&
                    <Item style={{ borderColor: "transparent" }}>
                        <Icon active style={{ color: "red", marginTop: 5 }} name="bug" />
                        <Text style={{ fontSize: 15, color: "red" }}>{'error'}</Text>
                    </Item>
                }
                <Button style={styles.btn}>
                  <Text>Login</Text>
                </Button>
              </View>
              </ImageBackground>
          </Content>
        </View>
      </Container>
    )
  }
}
const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FBFAFA',
  },
  shadow: {
    flex: 1,
    width: null,
    height: null,
  },
  bg: {
    flex: 1,
    marginTop: deviceHeight / 1.75,
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 30,
    bottom: 0,
  },
  input: {
    marginBottom: 20,
  },
  btn: {
    marginTop: 20,
    alignSelf: 'center',
  },
});
