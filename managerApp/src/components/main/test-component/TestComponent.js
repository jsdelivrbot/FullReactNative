import React, { Component } from 'react';
import { StyleSheet, Text, FlatList, View,Dimensions } from 'react-native';
import _ from 'lodash'; // 4.17.4

const NUM_DATA = 11;

export default class TestComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: null
    }
  }

  componentWillMount() {
    console.log('hey')
    this.setState({data: this.getData(NUM_DATA, 0)})
  }
  
  getData = (num, skip) => {
    const start = skip
    const end = skip + num
    console.log('start: ', start)
    console.log('end: ', end)
    return _.range(start, end).map((x, i) => ({id: i, title: 'List Item ' + i}))
  }

  _renderItem({item}) {
    return (
      <View style={styles.rowContainer}>
        <Text>{item.title}</Text>
      </View>
    )
  }

  onEndReached(info){
    console.log('onEndReached()', this.state.data)
    console.log(`Info: ${JSON.stringify(info)}`)
    console.log(`Height: ${Dimensions.get('screen').height}`)
    if(info.distanceFromEnd < 0 )  {
        return
    }
    let data = this.state.data
    let newData = data.concat(this.getData(NUM_DATA, data.length ))
    this.setState({data: newData})
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>FlatList (Vertical)</Text>
        <FlatList
          data={this.state.data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this._renderItem}
          initialNumToRender = {this.state.data.length-1}
          refreshing = {false}
          onEndReached={ (info)=>this.onEndReached(info)}
          onEndReachedThreshold={0.5}
        />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    paddingTop: 20
  },
  title: {
    color: '#000',
    fontSize: 18,
    padding: 20
  },
  rowContainer: {
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    padding: 20
  }
})