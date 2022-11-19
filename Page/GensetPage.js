import React, {Component} from 'react'
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import {View, Image,Text, Dimensions, TextInput, Button, TouchableOpacity, ScrollView} from 'react-native'

let urls = "http://167.71.204.253/priok/pln/coolingsystem-minggu"

export default class GensetPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataEnergy: []
    };
  }

componentDidMount() {
  fetch(urls)
  .then(response => response.json())
  .then(data =>
    this.setState({
      dataEnergy: data
    }),
    )
}

  render() {
    let data = this.state.dataEnergy
    let energyS = new Array()
    let timeS = new Array()
    for(var i in data){
      energyS.push(data[i]?.energy)
      timeS.push(data[i]?.time)
    }
    console.log(energyS)
    return (
    
      <View>
  <LineChart
    data={{
      labels: timeS,
      datasets: [
        {
          data: energyS
        }
      ]
    }}
    width={Dimensions.get("screen").width/1.089} // from react-native
    height={Dimensions.get("screen").height/4}
    // yAxisLabel="$"
    // yAxisSuffix="k"
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "blue",
      backgroundGradientFrom: "white",
      backgroundGradientTo: "white",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(0, 0, 139, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(0, 0, 139, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "blue",
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16,
    }}
  />
</View>

    );
  }
}


