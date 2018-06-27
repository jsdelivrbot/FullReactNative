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
          values: [200],
          label: 'Company A',
          config: {
            drawValues: false,
            colors: [processColor(ColorsChart[0])],
          }
        }, {
          values: [40],
          label: 'Company B',
          config: {
            drawValues: false,
            colors: [processColor(ColorsChart[1])],
          }
        }, ],
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
        valueFormatter: ['1990'],
        granularityEnabled: true,
        granularity: 1,
        axisMaximum: 1,
        axisMinimum: 0,
        centerAxisLabels: true
      },
      yAxis: {
        left: {
          drawLabels: true, //是否绘制左y轴数值
          drawAxisLine: true,
          drawGridLines: false,
          zeroLine: {
            enabled: true,
            lineWidth: 2
          },
          granularity: 1 //左y轴步进值
        },
        right: {
          enabled: true, //是否绘制右y轴数值
          granularity: 1 //右y轴步进值
        },
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
        y: 40
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
    return (
      <Container style={styles.container}>
          <BarChart
          
            style={styles.chart}
            xAxis={this.state.xAxis}
            yAxis={this.state.yAxis}
            data={this.state.data}
            legend={this.state.legend}
            drawValueAboveBar={false}
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
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('screen').width
  },
  chart: {
    flex: 1
  }
});