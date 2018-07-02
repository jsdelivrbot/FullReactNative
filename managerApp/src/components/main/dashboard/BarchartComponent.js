import React, {
  Component
} from 'react';
import {} from 'react-native';
import {
  StyleSheet,
  Dimensions,
  processColor
} from 'react-native';

import {
  BarChart
} from 'react-native-charts-wrapper';
import {
  ColorsChart
} from '../../../common/Color';
import {
  Container,
  Content,
  ListItem,
  Text
} from 'native-base';
export default class BarchartComponent extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      legend: {
        enabled: true,
        textSize: 10,
        form: "SQUARE",
        formSize: 5,
        xEntrySpace: 2,
        yEntrySpace: 2,
        wordWrapEnabled: true
      },
      data: {
        dataSets: [],
        config: {
          barWidth: 0,
          group: {
            fromX: 0,
            groupSpace: 0.1,
            barSpace: 0,
          },
        }
      },
      xAxis: {
        valueFormatter: [],
        granularityEnabled: true,
        granularity: 1,
        axisMaximum: 0,
        axisMinimum: 0,
        centerAxisLabels: true
      },
      yAxis : {
        granularityEnabled: true,
        // granularity: 10,
        // left: {
        //   granularityEnabled: true,
        //   granularity: 20
        // },
        // right: {
        //   granularityEnabled: true,
        //   granularity: 20
        // }
  
      },
      marker: {
        enabled: true,
        markerColor: processColor('#F0C0FF8C'),
        textColor: processColor('white'),
        markerFontSize: 14,
      },

    };
  }
  loadData(listData){
    let data = this.state.data
    let xAxis = this.state.xAxis
    data.dataSets = [];
    xAxis.valueFormatter = [];
    if (listData.length > 0 ){
      xAxis.axisMaximum = listData.length;
      let temp = Object.keys(listData[0]);
      if (temp.length > 0) {
        for(let i=0;i<temp.length;i++){
          if(i === 0) {
            xAxis.valueFormatter = listData.map(x => {
               return x[temp[0]].toString();
            })
          } else {
            data.dataSets.push({
              values: listData.map(x => {
                 return x[temp[i]];
              }),
              label: temp[i],
              config: {
                drawValues: false,
                colors: [processColor(ColorsChart[i-1])],
              }
            });
          }
        }
      }
      data.config.barWidth = (temp.length>1) ? (0.9/(temp.length-1)) : 0 
    }

    this.setState({
      data: data,
      xAxis: xAxis
    })
  }
  componentDidMount() {

    this.setState({ ...this.state,
      highlights: [{
        x: 1,
        y: 10
      }, {
        x: 2,
        y: 50
      }]
    })
  }

  handleSelect(event) {
    let entry = event.nativeEvent
    if (entry == null) {
      this.setState({ ...this.state,
        selectedEntry: null
      })
    } else {
      this.setState({ ...this.state,
        selectedEntry: JSON.stringify(entry)
      })
    }

    console.log(event.nativeEvent)
  }

  render() {
    if(this.state.data.dataSets.length >0) {
      // alert(JSON.stringify(this.props.totalCompany));
      return (
        <Container style={styles.container}>
            <Text>
              {` ${this.props.title}`}
            </Text>
            <BarChart
              style={styles.chart}
              xAxis={this.state.xAxis}
              yAxis={this.state.yAxis}
              data={this.state.data}
              legend={this.state.legend}
              drawValueAboveBar={true}
              animation={{ durationX: 2000 }}
              onSelect={this.handleSelect.bind(this)}
              onChange={(event) => console.log(event.nativeEvent)}
             // highlights={this.state.highlights}
              marker={this.state.marker}
              chartDescription={{text: ''}}
            />
          </Container>
  
      );
    }
    else {
      return null
    }
   
  }
}

const styles = StyleSheet.create({
  container: {
    height: 300
  },
  chart: {
    flex: 1
  }
});