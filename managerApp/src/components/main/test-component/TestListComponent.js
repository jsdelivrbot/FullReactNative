import React, { Component } from "react";
import { FlatList,View ,RefreshControl} from "react-native";
import {
  Container,
  Spinner,
  Fab,
  Icon,
} from "native-base";
import { APIREQUEST } from "../../../services/ApiRequest";
import ItemUserComponent from "../master-data/user/ItemUserComponent";
import { ColorsChart } from "../../../common/Color";


export default class TestListComponent extends Component {
  constructor(props) {
    super(props);
      this.data = [];
      this.isLoading = false;
      this.Refreshing= false;
      this.skip =0;
      this.limit = 12;
      this.total = 0;
  }
  componentWillMount(){
    this.handleRefresh();
  }
   handleRefresh(){
        this.isRefreshing=  true
      APIREQUEST.listUser(this.skip,this.limit).then(data => {
        console.log(data)
        if(data.res.length >0 ){
          
            this.data = data.res;
            this.total = data.total;
            this.isRefreshing=  false
        }else {
            this.isRefreshing=  false
        }
      }).catch(err => {
        this.isRefreshing=  false   
      })
  }
  handleLoadMore(info){
    
    if(this.data.length == this.total) {
        return
    }

      this.isLoading = true;
      this.skip=  this.skip + this.limit;
       APIREQUEST.listUser(this.skip,this.limit).then(data => {
        if(data.res.length > 0) {
                this.data= this.data.concat(data.res);
                this.isLoading = false;

        } else {
            this.isLoading=false
        }
        
      }).catch(err => {   
          this.isLoading= false
       
      })
    }

  componentDidUpdate(){
    //Notifiy.warning(JSON.stringify('componentDidUpdate'));
  }
  render() {
    return (
      <Container style= {{flex:1}}>
        <FlatList
          data={this.data}
          keyExtractor = {(x,i) =>i.toString()}
       
          ListFooterComponent = { () =>
            this.isLoading 
            ? <Spinner  color = {ColorsChart[0]}></Spinner> 
            : null
          }
          renderItem={({ item, index }) => {
            return <ItemUserComponent item={item} index={index} />;
          }}
          refreshControl = {
            <RefreshControl   
              refreshing = {this.isRefreshing}
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
            onPress={() => alert('ok')}>
            <Icon name="add" />
        </Fab>
      </Container>
        
    );
  }
}

