import React, { Component } from "react";
import { FlatList,RefreshControl,} from "react-native";
import {
  Container,
  Spinner,
} from "native-base";
import HeaderComponent from "../../header/HeaderComponent";
import { Color, ColorsChart } from "../../../../common/Color";
import ItemWarehouseComponent from "../warehouse/ItemWarehouseComponent";
import ItemAvatarComponent from "../../item-flatlist/ItemAvatarComponent";


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
    for(let i=0;i<30;i++){
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
            return <ItemAvatarComponent {...this.props} item={item} index={index} />;
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

