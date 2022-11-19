import React, {Component, useState} from 'react'
import {Picker} from '@react-native-picker/picker';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import DropDownPicker from 'react-native-dropdown-picker';

import {View, Image,Text, Dimensions, TextInput, Button, TouchableOpacity, ScrollView} from 'react-native'

let urls = "http://167.71.204.253/priok/pln/coolingsystem-minggu"

let tahun = "http://167.71.204.253/priok/pln/coolingsystem-year"

class Chart extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      dataEnergy: ["0.00"],
      chart: '',
      dataEnergyThn: ["0.00"]
    };
  }
  
  updateChart = (chart) => {
    this.setState({chart: chart})
  }
  
  async componentDidMount() {
    await Promise.all([
    fetch(urls).then(response => response.json()).then(data => this.setState({
      dataEnergy: data
    }),
    ),
    fetch(tahun).then(response => response.json()).then(dataThn => this.setState({
      dataEnergyThn: dataThn
    }))
    ])
  }
    // fetch(urls)
    // .then(rtaThnesponse => response.json())
    // .then(data => 
    //   this.setState({
    //     dataEnergy: data,
    //   }),
    //   )
    // }

    
    render() {
      let data = this.state.dataEnergy
      let dataThn = this.state.dataEnergyThn
      var energyS = new Array()
      var timeS = new Array()
      var energyT = new Array()

      for(var i in data){
        energyS.push(data[i]?.energy)
        timeS.push(data[i]?.time)
      }
      for(var t in dataThn){
        energyT.push(dataThn[t]?.energy)

      }
      console.log(energyT)
      console.log("ini tahun")
        
  return (
    <View>
      <View>
        <Picker selectedValue = {this.state.chart} onValueChange ={this.updateChart} style={{backgroundColor: 'blue' , borderRadius: 30}}>
          <Picker.item label="Cooling System" value="coolingsystem"></Picker.item>
          <Picker.item label="Surveillance" value="surveillance"></Picker.item>
          <Picker.item label="Accessories" value="accessories"></Picker.item>
        </Picker>
      </View>
      <View className='m-3 mx-0 mb-1'>
        <View className='m-3 '>
          <Text className='text-xl font-light text-black text-center' style={{fontFamily: 'Inter'}}>Energy Usage Last 7 Days (Kwh)</Text>
        </View>
        <View>
          <BarChart
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
      </View>
      <View className='m-3 mx-0 my-0'>
        <View className='m-3 '>
          <Text className='text-xl font-light text-black text-center' style={{fontFamily: 'Inter'}}>
            Energy Usage Last 1 year (Kwh)
            </Text>
        </View>
        <View>
          <BarChart
            data={{
              labels: [1,2,3,4,5,6,7,8,9,10,11,12],
              datasets: [
                {
                  data: energyT
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
      </View>
        
</View>

    );
  }
}

export default Chart

