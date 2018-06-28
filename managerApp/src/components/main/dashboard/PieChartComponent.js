import React from 'react';
import {
  StyleSheet,
  processColor,
  Dimensions
} from 'react-native';

import {StackNavigator, SafeAreaView} from 'react-navigation';

import {PieChart} from 'react-native-charts-wrapper';
import { Container, Content, ListItem } from 'native-base';
import { ColorPieChart } from '../../../common/Color';

export default class PieChartComponent extends React.Component {

  constructor() {
    super();
    this.state = {
      legend: {
        enabled: true,
        textSize: 8,
        form: 'CIRCLE',
        position: 'BELOW_CHART_RIGHT',
        wordWrapEnabled: true
      },
      data: {
        dataSets: [{
          values: [{value: 20, label: 'Sandwiches'},
            {value: 20, label: 'Salads'},
            {value: 20, label: 'Soup'},
            {value: 20, label: 'Beverages'},
            {value: 20, label: 'Desserts'}],
          label: 'Pie dataset',
          config: {
            colors: ColorPieChart,
            valueTextSize: 20,
            valueTextColor: processColor('green'),
            sliceSpace: 5,
            selectionShift: 20
          }
        }],
      },
      highlights: [{x:2}],
      description: {
        text: 'This is Pie chart description',
        textSize: 15,
        textColor: processColor('darkgray'),

      }
    };
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
        <Container style={styles.container}>
          <PieChart
            style={styles.chart}
            logEnabled={true}
            chartBackgroundColor={processColor('white')}
            chartDescription={this.state.description}
            data={this.state.data}
            legend={this.state.legend}
            highlights={this.state.highlights}

            entryLabelColor={processColor('black')}
            entryLabelTextSize={20}
            drawEntryLabels={true}

            rotationEnabled={true}
            rotationAngle={45}
           usePercentValues={false}
           styledCenterText={{text:'Pie center text!', color: processColor('pink'), size: 20}}
           centerTextRadiusPercent={100}
           holeRadius={40}
           holeColor={processColor('#f0f0f0')}
            transparentCircleRadius={45}
            transparentCircleColor={processColor('#f0f0f088')}
            //maxAngle={350}
            onSelect={this.handleSelect.bind(this)}
            onChange={(event) => console.log(event.nativeEvent)}
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


