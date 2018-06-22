import React, {
  Component
} from 'react';
import {
  Platform,
  AsyncStorage,
  Image
} from 'react-native';
import {
  RouterStack
} from './RouterNavigation';
import {
  STRINGS
} from './common/Language';
import {
  Root
} from 'native-base';
import {
  Global
} from './common/Global';
import {
  keyStore, widthScreen
} from './common/Constraint';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
    STRINGS.setLanguage("en");
  }
  componentWillMount(){
  
  }
  render() {
    
    return ( 
      <Root>
        <RouterStack/> 
      </Root> 
    );
  }
}