import React, { Component } from 'react';
import { Container} from "native-base";
import BarchartComponent from './BarchartComponent';
import HeaderComponent from '../HeaderComponent';
export default class DashboardComponent extends Component {
  
    render() {
        return (
            <Container>
                <HeaderComponent {...this.props}/>
                <BarchartComponent/>
            </Container>
        );
    }
}