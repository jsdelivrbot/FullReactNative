import React, { Component } from "react";
import { FlatList,RefreshControl,Alert} from "react-native";
import {
  Container,
  Spinner,
} from "native-base";
import HeaderComponent from "../../header/HeaderComponent";
import { Color, ColorsChart } from "../../../../common/Color";
import uuidv4 from 'uuid/v4';
import ItemAvatarComponent from "../../item-flatlist/ItemAvatarComponent";


export default class SystemMailComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.createDataTest(),
      isLoading: false,
      isRefreshing: false
    };
    this.listRef =[];
  }
  componentWillMount(){
  }
  createDataTest (){
    let data = new Array();
    for(let i=0;i<3;i++){
      data.push({
        name: 'A' +i ,
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
  onDelete(index){
    Alert.alert(
      'Alert',
      'Are you sure you want to delete ?',
      [                              
        {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Yes', onPress: () => {      
         this.state.data.splice(index,1);
          this.setState({
          })
        }},
      ],
      { cancelable: true }
    ); 
  }
  onEdit(){
    alert(JSON.stringify(this.listRef['A1'].props))
  }
  render() {
    return (
      <Container style= {{flex:1}}>
        <HeaderComponent {...this.props}/>
        <FlatList
          data={this.state.data}
          keyExtractor = {(x,i) =>x.name}
          ListFooterComponent = { () =>
            this.state.isLoading 
            ? <Spinner  color = {ColorsChart[0]}></Spinner> 
            : null
          }
          horizontal ={false}
          renderItem={({ item, index }) => {
            return <ItemAvatarComponent 
              ref = {ref => this.listRef[item.name] = ref} 
              {...this.props} 
              item={item} 
              index={index} 
              onDelete ={()=>this.onDelete(index)} 
              onEdit ={()=>this.onEdit(item)}/>;
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

