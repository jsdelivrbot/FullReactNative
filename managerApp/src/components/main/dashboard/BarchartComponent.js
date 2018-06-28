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
  ListItem
} from 'native-base';
export default class BarchartComponent extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
      legend: {
        enabled: true,
        textSize: 14,
        form: "SQUARE",
        formSize: 14,
        xEntrySpace: 2,
        yEntrySpace: 2,
        wordWrapEnabled: true
      },
      data: {
        dataSets: [{
          values: [28],
          label: 'totalowner',
          config: {
            drawValues: false,
            colors: [processColor(ColorsChart[0])],
          }
        }, {
          values: [0],
          label: 'totaluser',
          config: {
            drawValues: false,
            colors: [processColor(ColorsChart[1])],
          }
        }, 
        {
          values: [0],
          label: 'totalwarehouse',
          config: {
            drawValues: false,
            colors: [processColor(ColorsChart[2])],
          }
        }, 
      ],
        config: {
          barWidth: 0.2,
          group: {
            fromX: 0,
            groupSpace: 0.1,
            barSpace: 0.1,
          },
        }
      },
      xAxis: {
        valueFormatter: ['2018'],
        granularityEnabled: true,
        granularity: 1,
        axisMaximum: 1,
        axisMinimum: 0,
        centerAxisLabels: true
      },
      yAxis : {
        left: {
          granularityEnabled: true,
          granularity: 20
        },
        right: {
          granularityEnabled: true,
          granularity: 20
        }
  
      },
      marker: {
        enabled: true,
        markerColor: processColor('#F0C0FF8C'),
        textColor: processColor('white'),
        markerFontSize: 14,
      },

    };
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
    if(this.props.totalCompany) {
      alert(JSON.stringify(this.props.totalCompany));
      return (
        <Container style={styles.container}>
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
              highlights={this.state.highlights}
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
    height: Dimensions.get('screen').width
  },
  chart: {
    flex: 1
  }
});