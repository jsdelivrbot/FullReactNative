import React, { Component } from "react";
import { Image, AsyncStorage } from "react-native";
import { NavigationActions, DrawerActions } from 'react-navigation';
import {
  Text,
  Container,
  Button,
  Content,
  Icon,
  List,
  ListItem,
  Left,
  Right,
  CardItem
} from "native-base";
import { MasterDataScreen, DashboardScreen, SystemMailScreen, SignInScreen, UserScreen, WarehouseScreen, OWnersScreen } from "../../common/ScreenName";
import { sideMenuStyles } from "../../common/Styles";
import { STRINGS } from "../../common/Language";
import { Color } from "../../common/Color";
import { Global } from "../../common/Global";
import { Notifiy } from "../../common/Notify";
export default class SideMenuComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datas: [
        {
          name: STRINGS.SIDEMENU.dashboard,
          route: DashboardScreen,
          icon: "phone-portrait",
          isShow: false
        },
        {
          name: STRINGS.SIDEMENU.masterData,
          icon: "grid",
          isShow: true,
          dataChildren: [
            {
              name: STRINGS.SIDEMENU.systemMail,
              route: SystemMailScreen,
              icon: "mail",
            },
            {
              name: STRINGS.SIDEMENU.user,
              route: UserScreen,
              icon: "person",
            },
            {
              name: STRINGS.SIDEMENU.warehouse,
              route: WarehouseScreen,
              icon: "home",
            },
            {
              name: STRINGS.SIDEMENU.owners,
              route: OWnersScreen,
              icon: "person",
            },
          ]
        },
        {
          name: STRINGS.SIDEMENU.security,
          icon: "lock", 
          isShow: true,
          dataChildren: [
            
          ]
        },
      ]
    };
  }
  onConfigItem(index) {
    this.state.datas[index].isShow = !this.state.datas[index].isShow;
    this.setState({
      datas: this.state.datas
    });
    this.onChangeScreen(this.state.datas[index].route);
  }
  onSignOut(){
    Global.userInfo = null;
    AsyncStorage.clear().then(() => {
         this.props.navigation.navigate(SignInScreen);
         //this.props.navigation.dispatch(NavigationActions.popToTop());
      }).catch(_ => {
    });
  }
  onChangeScreen(route) {
    const { navigate } = this.props.navigation;
    if (route) {
     
      this.props.navigation.dispatch(DrawerActions.toggleDrawer())
      navigate(route);
    }
  }
  render() {
    const { logo, content } = sideMenuStyles;
    const userName = (Global.userInfo)? Global.userInfo.token.uid : ' ';
    return (
      <Container style={{ flex: 1 }}>
        <Container style={{ alignItems: "center", flex: 20 }}>
          <Image
            style={logo}
            source={{
              uri:
                "http://intralogistica-italia.com/wp-content/uploads/2018/01/EXP_SMARTLOG.png"
            }}
          />
        </Container>
        <Container style={{ flex: 70 }}>
          <Content bounces={false} style={content}>
            <List
              dataArray={this.state.datas}
              renderRow={(data, _, index) => (
                <Content>
                  <ListItem onPress={this.onConfigItem.bind(this, index)}>
                    <Left>
                      <Icon
                        active
                        name={data.icon}
                        style={{ color: Color.smartlog, fontSize: 20, width: 26 }}
                      />
                      <Text style={sideMenuStyles.text}>{data.name}</Text>
                    </Left>
                  </ListItem>
                   <ItemMenuComponent data = {data} {...this.props}/>
                </Content>
              )}
            />
          </Content>
        </Container>
        <Container style={{flex:10}}>
           <CardItem>
              <Icon active  name="person" style={{ color: Color.smartlog, fontSize: 20, width: 26 }} />
              <Text style={{  fontSize: 15 }}> {userName}</Text>
              <Right>
                <Button danger style={{ height: 20 }} onPress = { this.onSignOut.bind(this)}>
                  <Text style={{ fontSize: 10 }}>Logout </Text>
                </Button>
              </Right>
             </CardItem>
        </Container>
      </Container>
    );
  }
}
class ItemMenuComponent extends Component {
  onChangeScreen(route){
    const { navigate } = this.props.navigation;  
    if (route) {
      this.props.navigation.dispatch(DrawerActions.toggleDrawer())
      navigate(route);
    }
  }
  render(){
    if(this.props.data.isShow){
      return (
        <List
        dataArray={this.props.data.dataChildren}
        renderRow={res => (
          <ListItem
            style={{ marginLeft: 30 }}
            onPress={ () => this.onChangeScreen(res.route)}
          >
            <Left>
              <Icon
                active
                name={res.icon}
                style={{ color: Color.smartlog, fontSize: 14 }}
              />
              <Text style={{ fontSize: 12 }}>{res.name}</Text>
            </Left>
          </ListItem>
        )}
      />
      )
    } else {
      return  null
    }
  }
}