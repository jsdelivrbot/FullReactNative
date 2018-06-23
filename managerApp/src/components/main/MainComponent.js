import React, { Component } from 'react';
import { RouterMenu } from '../../RouterNavigation';
import { Root } from 'native-base';

class MainComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (  
           <RouterMenu screenProps = {this.props}/>               
        );
    }
}

export default MainComponent;