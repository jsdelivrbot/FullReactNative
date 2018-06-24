/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
} from 'react-native';
import { Root } from 'native-base';
import { RouterApp } from './routers/RouterApp';

export default class App extends Component {
  render() {
    return (
      <Root>
        <RouterApp/>
      </Root>
    );
  }
}


