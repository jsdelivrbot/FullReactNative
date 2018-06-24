import React, {
  Component
} from 'react';
import {
  STRINGS
} from './common/Language';
import {
  Root
} from 'native-base';

import { AppRouter } from './routers/AppRouter';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
    STRINGS.setLanguage("vn");
  }
  render() {
    
    return ( 
      <Root>
        <AppRouter /> 
      </Root> 
    );
  }
}