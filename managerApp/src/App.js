import React, {
  Component
} from 'react';
import {
  STRINGS
} from './common/Language';
import {
  Root,
  StyleProvider
} from 'native-base';
import getTheme from './assets/themes/components';
import material from './assets/themes/variables/material';
import { AppRouter } from './routers/AppRouter';
import { Global } from './common/Global';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
    STRINGS.setLanguage("en");
  }
  render() {
    
    return ( 
      <StyleProvider style={getTheme(material)}>
        <Root>
          <AppRouter /> 
        </Root> 
      </StyleProvider>
    );
  }
}