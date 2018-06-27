import React,{Component} from "react";
import { AppRegistry, Image, TouchableOpacity } from "react-native";
import {
  Button,
  Text,
  Container,
  List,
  ListItem,
  Content,
  Icon
} from "native-base";
export default class BlankPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      list : []
    }
  }
  static navigationOptions = {
    header: null
  };
  componentDidMount (){
    this.setState({
      list : [
        'a',
        'b'
      ]
    })
  }
  render() {
    return (
      <Container>
        <Content>
  
          <List
            dataArray={this.state.list}
            renderRow={data => {
              return (
                <ListItem
                  button
                  onPress={() => this.props.navigation.navigate(data)}
                >
                  <Text>{data}</Text>
                </ListItem>
              );
            }}
          />
        </Content>
      </Container>
    )
  }
}