import React,{Component} from 'react';
import {  } from 'react-native';
import {
  StyleSheet,
  Text,
  View, processColor
} from 'react-native';

import {BarChart} from 'react-native-charts-wrapper';
import { ColorsChart } from '../../../common/Color';

class BarchartComponent extends Component {

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
          values: [5, 40, 77, 81, 43],
          label: 'Company A',
          config: {
            drawValues: false,
            colors: [processColor(ColorsChart[0])],
          }
        }, {
          values: [40, 5, 50, 23, 79],
          label: 'Company B',
          config: {
            drawValues: false,
            colors: [processColor(ColorsChart[1])],
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
        valueFormatter: ['1990', '1991', '1992', '1993', '1994'],
        granularityEnabled: true,
        granularity: 1,
        axisMaximum: 5,
        axisMinimum: 0,
        centerAxisLabels: true
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

    this.setState({...this.state, highlights: [{x: 1, y:40}, {x: 2, y:50}]})
  }

  handleSelect(event) {
    let entry = event.nativeEvent
    if (entry == null) {
      this.setState({...this.state, selectedEntry: null})
    } else {
      this.setState({...this.state, selectedEntry: JSON.stringify(entry)})
    }

    console.log(event.nativeEvent)
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.container}>
          <BarChart
            style={styles.chart}
            xAxis={this.state.xAxis}
            data={this.state.data}
            legend={this.state.legend}
            drawValueAboveBar={false}
            animation={{ durationX: 2000 }}
            onSelect={this.handleSelect.bind(this)}
            onChange={(event) => console.log(event.nativeEvent)}
            highlights={this.state.highlights}
            marker={this.state.marker}
          />
        </View>
        <View style={styles.container}>
          <BarChart
            style={styles.chart}
            xAxis={this.state.xAxis}
            data={this.state.data}
            legend={this.state.legend}
            drawValueAboveBar={false}
            animation={{ durationX: 2000 }}
            onSelect={this.handleSelect.bind(this)}
            onChange={(event) => console.log(event.nativeEvent)}
            highlights={this.state.highlights}
            marker={this.state.marker}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  chart: {
    flex: 1
  }
});


export default BarchartComponent;
