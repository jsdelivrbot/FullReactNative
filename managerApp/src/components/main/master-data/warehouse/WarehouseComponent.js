import React, { Component } from "react";
import { FlatList, View ,RefreshControl,} from "react-native";
import {
  Container,
  Spinner,
  List,
  Fab,
  Icon,
} from "native-base";
import { APIREQUEST } from "../../../../services/ApiRequest";

import { ConfigWarehouseScreen } from "../../../../common/ScreenName";
import { ColorsChart } from "../../../../common/Color";
import ItemWarehouseComponent from "./ItemWarehouseComponent";
import HeaderComponent from "../../header/HeaderComponent";
export default class WarehouseComponent extends Component {
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
  static navigationOptions = {
    header: null
  };
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
      APIREQUEST.listWarehouse(skip,limit).then(data => {
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
    if(this.state.data.length == this.state.total) {
        return
    }
    this.setState({
      isLoading: true,
      skip: this.state.skip + this.state.limit
    }, () => {
        let {skip,limit } = this.state
       APIREQUEST.listWarehouse(skip,limit).then(data => {
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
            return <ItemWarehouseComponent 
                        item={item} 
                        index={index} 
                        {...this.props}
                        />;
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
        <Fab 
            direction="up"
            containerStyle={{ }}
            style={{ backgroundColor: '#5067FF' }}
            position="bottomRight"
            onPress={() => this.props.navigation.navigate(ConfigWarehouseScreen)}>
            <Icon name="add" />
        </Fab>
      </Container>   
    );
  }
}
