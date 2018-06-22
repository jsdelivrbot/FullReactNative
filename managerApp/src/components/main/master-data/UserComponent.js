import React, { Component,PureComponent } from "react";
import { FlatList, StyleSheet, View ,RefreshControl,ScrollView} from "react-native";
import {
  Container,
  Text,
  Content,
  Icon,
  Left,
  Card,
  CardItem,
  CardSwiper,
  Right,
  Badge,
  CheckBox,
  ListItem,
  Button,
  Body,
  Spinner,
  List,
} from "native-base";
import HeaderComponent from "../HeaderComponent";
import { Color, ColorsChart } from "../../../common/Color";
import { sideMenuStyles } from "../../../common/Styles";
import { APIREQUEST } from "../../../services/ApiRequest";
import { AuthService } from "../../../services/AuthService";
import { Notifiy } from "../../../common/Notify";
import ItemUserComponent from "../item-flatlist/ItemUserComponent";
export default class UserComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: false,
      isRefreshing: false,
      skip: 0,
      limit: 12,
      total: 0,
    };
  }
  componentWillMount(){
    this.handleRefresh();
  }
   handleRefresh(){
    this.setState({
      isRefreshing:  true,
      skip: 0
    },  () => {
       let {skip,limit } = this.state
       console.log(skip)
      APIREQUEST.listUser(skip,limit).then(data => {
        console.log(data)
        if(data.res.length >0 ){
          
          this.setState({
            data: data.res,
            total: data.total,
            isRefreshing:  false
          })
        }else {
            this.setState({
              isRefreshing:false
              })
        }
      }).catch(err => {
        console.log(JSON.stringify(err));
        this.setState({
          isRefreshing:  false
        });
       
      })
    });
  }
  handleLoadMore(info){
    
    console.log('handleLoadMore');
    console.log(this.state.data.length)
    if(this.state.data.length == this.state.total) {
        return
    }
    this.setState({
      isLoading: true,
      skip: this.state.skip + this.state.limit
    }, () => {
        let {skip,limit } = this.state
        console.log(skip)
       APIREQUEST.listUser(skip,limit).then(data => {
        if(data.res.length > 0) {
            this.setState({
                data: this.state.data.concat(data.res),
                isLoading:false
              })
        } else {
            this.setState({
                isLoading:false
            })
        }
        
      }).catch(err => {
        //Notifiy.warning(JSON.stringify(err));
        this.setState({
          isLoading: false
        });
       
      })
    });
    }

  componentDidUpdate(){
    //Notifiy.warning(JSON.stringify('componentDidUpdate'));
  }
  render() {
    return (
      <Container style= {{flex:1}}>
        <HeaderComponent {...this.props}/>
        <FlatList
          data={this.state.data}
          keyExtractor = {(x,i) =>i.toString()}
       
          ListFooterComponent = { () =>
            this.state.isLoading 
            ? <Spinner  color = {ColorsChart[0]}></Spinner> 
            : null
          }
          renderItem={({ item, index }) => {
            return <ItemUserComponent item={item} index={index} />;
          }}
          refreshControl = {
            <RefreshControl   
              refreshing = {this.state.isRefreshing}
              onRefresh = {this.handleRefresh.bind(this)}
              //progressBackgroundColor = {Color.greenAlpha}
              colors = {ColorsChart}
            />
          }
          onEndReached={ (info)=>this.handleLoadMore(info)}
          onEndReachedThreshold={0.2}
        />
      </Container>
        
    );
  }
}

