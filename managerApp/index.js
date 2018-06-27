import { AppRegistry } from 'react-native';
import App from './src/App';
import Test2Component from './src/components/main/test-component/Test2Component';
import ConfigWarehouseComponent from './src/components/main/master-data/warehouse/ConfigWarehouseComponent';
import TestListComponent from './src/components/main/test-component/TestListComponent';
import TestLoginComponent from './src/components/main/test-component/TestLoginComponent';
import RNChart from './src/components/main/test-component/RNChart';

console.disableYellowBox = true;
AppRegistry.registerComponent('managerApp', () => App);
