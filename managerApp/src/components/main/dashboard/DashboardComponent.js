import React, { Component } from 'react';
import { BackHandler } from 'react-native'
import { Container, Button, Text, Content} from "native-base";
import BarchartComponent from './BarchartComponent';
import HeaderComponent from '../header/HeaderComponent';
import PieChartComponent from './PieChartComponent';
import { APIREQUEST } from '../../../services/ApiRequest';
import { Global } from '../../../common/Global';

export default class DashboardComponent extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            data: [],
            isLoading: false,
            isRefreshing: false,
        }
    }
    componentDidMount(){
        this.handleRefresh();
    }
    handleRefresh(){
        this.setState({
          isRefreshing:  true,
          skip: 0
        },  () => {
          APIREQUEST.totalByCompany().then(data => {
            if(data.res.length >0 ){ 
            
              let arr = data.res.map(item => {
                return {
                    totalOwner: item.totalowner,
                    totalUser : item.totaluser,
                    totalWarehouse: item.totalwarehouse,
                    year: item.year
                }
              })
              alert(JSON.stringify(arr))
              this.setState({
                data: arr,
                isRefreshing:  false
              })
            }else {
                this.setState({
                  isRefreshing:false
                  })
            }
          }).catch(err => {
            alert(JSON.stringify(err))
            Global.handerError(err,this.props.navigation)
            this.setState({
              isRefreshing:  false
            });
           
          })
        });
      }
    render() {
        
        return (
            <Content >
                <HeaderComponent {...this.props}/>
                {/* <Button onPress = {()=>this.props.navigation.navigate('Test')}>
                    <Text>
                        Test
                    </Text>
                </Button> */}
         
     
                <BarchartComponent totalCompany = {this.state.data[0]}/>
            
                <PieChartComponent />
                
            </Content>
        );
    }
}