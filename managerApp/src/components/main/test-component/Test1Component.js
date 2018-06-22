import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';

const style = {
  justifyContent: 'center',
  alignItems: 'center',
  height: 100,
  margin: 25,
  borderWidth: 1,
  borderColor: 'black',
};
 
const Card = props => (
  <View style={style}>
    {props.children}
  </View>
);

const longList = (new Array(100)).fill('').map((v, i) => `${i}`);

class ScrollToExample extends Component {
  componentDidMount() {
    this.list.scrollToIndex({ index: this.props.scrollToIndex || 0 });
  }

  getItemLayout = (data, index) => (
    { length: 150, offset: 150 * index, index }
  );

  render() {
    return (
      <FlatList
        onScroll={(e) => { console.log('onScroll', e.nativeEvent); }}
        style={{ flex: 1 }}
        ref={(ref) => { this.list = ref; }}
        {...this.props}
        keyExtractor={item => item}
        getItemLayout={this.getItemLayout}
        renderItem={({ item }) => (
          <Card><Text>{item}</Text></Card>
        )}
      />
    );
  }
}

export default class Test1Component extends Component {
    render(){
        return (
            <ScrollToExample
              data={longList}
              scrollToIndex={50}
            />
          );
    }
} 