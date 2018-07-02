import React, { Component } from 'react';
import { BackHandler } from 'react-native'
import { Container, Button, Text, Content } from "native-base";
import BarchartComponent from './BarchartComponent';
import HeaderComponent from '../header/HeaderComponent';
import PieChartComponent from './PieChartComponent';
import { APIREQUEST } from '../../../services/ApiRequest';
import { Global } from '../../../common/Global';

export default class DashboardComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
        }
        this.component = [];
    }
     componentDidMount() {
         this.loadData();
    }
    loadData() {
        // this.loadActivityInYear();
        // this.loadTrackDeleted();
        APIREQUEST.totalpickdetail().then(data => {
            // alert(JSON.stringify(data))
        }).catch(err => alert(JSON.stringify(err)));
    }
    loadActivityInYear(){
        APIREQUEST.totalByCompany().then(data => {
            if (data.res.length > 0) {
                this.component['ACTIVITY_IN_YEAR'].loadData(data.res);
            } 
        }).catch(err => {
            alert(JSON.stringify(err))
           // Global.handerError(err, this.props.navigation)
        })
    }
    loadTrackDeleted(){
        APIREQUEST.trackDelete().then(data => {
            if (data.res.length > 0) {
                this.component['TRACK_DELETED'].loadData(data.res);
            } 
        }).catch(err => {
            alert(JSON.stringify(err))
            //Global.handerError(err, this.props.navigation)
        })
    }
    render() {

        return (
            <Content >
                <HeaderComponent {...this.props} />
                {/* <Button onPress = {()=>this.props.navigation.navigate('Test')}>
                    <Text>
                        Test
                    </Text>
                </Button> */}


                <BarchartComponent ref={ref => this.component['ACTIVITY_IN_YEAR'] = ref} title = {'ACTIVITY IN YEAR'}/>
                <BarchartComponent ref={ref => this.component['TRACK_DELETED'] = ref} title = {'TRACK DELETED'}/>

            </Content>
        );
    }
}