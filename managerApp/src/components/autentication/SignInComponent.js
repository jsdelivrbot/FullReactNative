import React, { Component } from "react";
import { TouchableOpacity, Alert,AsyncStorage,Image } from "react-native";
import { styles, sideMenuStyles } from "../../common/Styles";
import { STRINGS } from "../../common/Language";
import { Container, Item, Input,Text, Spinner, Content, View } from "native-base";
import { MainScreen, MenuScreen } from "../../common/ScreenName";
import { AuthService } from "../../services/AuthService";
import { ColorsChart, Color } from "../../common/Color";
import { Notifiy } from "../../common/Notify";
import { widthScreen, keyStore } from "../../common/Constraint";
import { Global } from "../../common/Global";
import { ApiService } from "../../services/ApiService";
const authService = new AuthService();
class SignInComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isLoading: false,
      firstLoading: true,
    }; 
  }
  componentWillMount(){  
    ApiService.timeoutRequest(AsyncStorage.getItem(keyStore),5000).then(data => {
  
      if(data !=null) {
        
        Global.userInfo = JSON.parse(data)
        this.props.navigation.navigate(MainScreen);
      }
      this.setState({
        firstLoading: false
      })
    }).catch(_ => {
      Global.userInfo =null
      this.setState({
        firstLoading: false
      })
    });
  }
   onSignIn() {
    this.setState({
      isLoading: true
    })
    const { username, password } = this.state;
      authService.signIn(username,password).then( async data => { 
      Global.userInfo = data.res;
      ApiService.timeoutRequest( AsyncStorage.setItem(keyStore,JSON.stringify(data.res)),5000);
      this.props.navigation.navigate(MainScreen);
      this.setState({
        isLoading: false
      })
    }).catch(err => {
      Notifiy.warning(STRINGS.SIGNIN.messageLogin);
      this.setState({
        isLoading: false
      })
    })
  }
  onForgotPassword() {
    Alert.alert(STRINGS.SIGNIN.fogotPassword);
  }
  render() {
    const { inputStyle, bigButton, buttonText, container, itemCenter } = styles;
    const { username, password } = this.state;
    const { logo } = sideMenuStyles;
    if(this.state.firstLoading) {
      return(
        <Container style={{ alignItems: "center",justifyContent:'center', flex: 1,backgroundColor:Color.white }}>
          <Image style = {{width:widthScreen}}
            style={logo}
            source={{
              uri:
                "http://intralogistica-italia.com/wp-content/uploads/2018/01/EXP_SMARTLOG.png"
            }}
          />
        </Container>
      )
    }
    return (
      <Container style={container}>
        { this.state.isLoading && 
          <Container style={{flex:1,justifyContent:'center',position:'absolute',zIndex:1,backgroundColor:Color.backGroundAlpha06,width: widthScreen}}>
           <Spinner color={ColorsChart[0]} />
          </Container>
        }
        <Item rounded  style={inputStyle}>
          <Input 
          placeholder = {STRINGS.SIGNIN.placeholderUsername}
          value={username}
          onChangeText={text => this.setState({ username: text })}
          />
        </Item>
        <Item rounded style={inputStyle}>
          <Input 
           placeholder={STRINGS.SIGNIN.placeholderPassword}
           value={password}
           onChangeText={text => this.setState({ password: text })}
           secureTextEntry
          />
        </Item>
        <TouchableOpacity
          style={itemCenter}
          onPress={this.onForgotPassword.bind(this)}
        >
          <Text style={buttonText}>{STRINGS.SIGNIN.fogotPassword}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={bigButton} onPress={this.onSignIn.bind(this)}>
          <Text style={buttonText}>{STRINGS.SIGNIN.signIn}</Text>
        </TouchableOpacity>
      </Container>
    );
  }
}

export default SignInComponent;
