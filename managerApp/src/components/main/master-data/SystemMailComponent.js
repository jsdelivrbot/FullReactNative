import React, { Component,PureComponent } from "react";
import { FlatList, StyleSheet, View ,RefreshControl,ScrollView} from "react-native";
import {
  Container,
  Spinner,
} from "native-base";
import HeaderComponent from "../HeaderComponent";
import { Color, ColorsChart } from "../../../common/Color";
import { sideMenuStyles } from "../../../common/Styles";
import { APIREQUEST } from "../../../services/ApiRequest";
import { AuthService } from "../../../services/AuthService";
import { Notifiy } from "../../../common/Notify";
import ItemWarehouseComponent from "../item-flatlist/ItemWarehouseComponent";

export default class SystemMailComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: false,
      isRefreshing: false
    };
  }
  componentWillMount(){
  }
  createDataTest (){
    let data = new Array();
    for(let i=0;i<10;i++){
      data.push({
        name: 'A ' +i ,
        email: `m${i}@gmail.com`
      })
    }
    return data;
  }
   handleRefresh(){
  }
  handleLoadMore(info){
    
    }

  componentDidUpdate(){
  }
  render() {
    return (
      <Container style= {{flex:1}}>
        <HeaderComponent {...this.props}/>
        <FlatList
          data={this.createDataTest()}
          keyExtractor = {(x,i) =>i.toString()}
       
          ListFooterComponent = { () =>
            this.state.isLoading 
            ? <Spinner  color = {ColorsChart[0]}></Spinner> 
            : null
          }
          renderItem={({ item, index }) => {
            return <ItemWarehouseComponent item={item} index={index} />;
          }}
          refreshControl = {
            <RefreshControl   
              refreshing = {this.state.isRefreshing}
              onRefresh = {this.handleRefresh.bind(this)}
              progressBackgroundColor = {Color.greenAlpha}
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

