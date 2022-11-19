import { Pressable, SafeAreaView, Text, View, Switch,StyleSheet,Image,ImageBackground,TouchableOpacity,Button, TouchableOpacityBase} from 'react-native';
import React, { useState, Component, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import init from 'react_native_mqtt';
import { authentication } from '../firebase/firebase-config';
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native"
// import { useNavigation } from '@react-navigation/native';

// const navigation = useNavigation();

signOut = () => {
  authentication
  .signOut()
  .then(() => {
    navigation.replace('WelcomePage')
  })
  .catch(error => alert("Meninggalkan Page ini?"))
}

init({
  size: 10000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  sync : {}
});

const options = {
  host: '167.71.204.253', // Host IP MQTT
  port: 9001, // Port Websocket
  path: 'pzem2', // Topic MQTT
  id: 'id_' + parseInt(Math.random()*100000), // Client ID MQTT
};

client = new Paho.MQTT.Client(options.host, options.port, options.path);

export default class HomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            valueStatus: '0',
            topic_banten_satu: 'pzem2/pln/1',
            topic_banten_dua: 'pzem2/pln/2',
            topic_banten_tiga: 'pzem2/pln/3',
            energy_svl: ["0.00"],
            voltage_svl: ["0.00"],
            current_svl: ["0.00"],
            freq_svl: ["0.00"],
            energy_cs: ["0.00"],
            voltage_cs: ["0.00"],
            current_cs: ["0.00"],
            freq_cs: ["0.00"],
            energy_acs: ["0.00"],
            voltage_acs: ["0.00"],
            current_acs: ["0.00"],
            freq_acs: ["0.00"],
            message: '',
            messageList: [],
            status: '',
            username_mqtt: 'tjpriok',
            password_mqtt: 'admin.admin',
        }
        client.onConnectionLost = this.onConnectionLost;
        client.onMessageArrived = this.onMessageArrived;
    }

    componentDidMount() {
        this.connect();
    }
    
    _sendMessage(messages, topics) {
        var message = new Paho.MQTT.Message(messages);
        message.destinationName = topics;
        client.send(message);
    }

    onConnect = () => {
        console.log('onConnect');
        this.setState({ status: 'connected' });
        client.subscribe(this.state.topic_banten_satu, { qos: 0 });
        client.subscribe(this.state.topic_banten_dua, { qos: 0 });
        client.subscribe(this.state.topic_banten_tiga, { qos: 0 });

    }
     
    onFailure = (err) => {
        console.log('Connect failed!');
        console.log(err);
        this.setState({ status: 'failed' });
    }
    
    connect = () => {
        this.setState(
            { status: 'Sedang koneksi Ke MQTT' },
            () => {
                client.connect({
                    onSuccess: this.onConnect,
                    userName: this.state.username_mqtt,
                    password: this.state.password_mqtt,
                    useSSL: false,
                    timeout: 3,
                    onFailure: this.onFailure
                });
            }
        );
    }

    onConnectionLost=(responseObject)=>{
        if (responseObject.errorCode !== 0) {
            console.log('Koneksi Lost: ' + responseObject.errorMessage);
        }
    }

    startInterval = () => {
        counter = 0;
        interval1 = setInterval(() => {
        counter++
        // console.log(counter)
        if (counter == 30){
          clearInterval(interval1)
          counter = 0;
        } else if(counter > 30){
          return "0.00"
        }
      }, 1000);
    }

    onMessageArrived = (message)=> {
      if (message.destinationName == "pzem2/pln/3") {
        let data = JSON.parse(message.payloadString)
        this.setState({ energy_svl: data["E"]})
        this.setState({ voltage_svl: data["V"]})
        this.setState({ current_svl: data["C"]})
        this.setState({ freq_svl: data["F"]})
        clearInterval(this.startInterval)
        this.startInterval()

      }else if (message.destinationName == "pzem2/pln/1") {
        let data = JSON.parse(message.payloadString)
        this.setState({ energy_cs: data["E"]})
        this.setState({ voltage_cs: data["V"]})
        this.setState({ current_cs: data["C"]})
        this.setState({ freq_cs: data["F"]})
      }else if(message.destinationName == "pzem2/pln/2"){
        let data = JSON.parse(message.payloadString)
        this.setState({ energy_acs: data["E"]})
        this.setState({ voltage_acs: data["V"]})
        this.setState({ current_acs: data["C"]})
        this.setState({ freq_acs: data["F"]})
      } 
    }

    render() {
        return (
          <SafeAreaView className=" p-2.5 bg-slate-100" style={styles.font}>
          <View className="bg-blue-600 m-3 p-4 rounded-2xl flex-row justify-between items-center" style={styles.shadowB}>
            <Text className="text-black" style={styles.font}>Energy In Use</Text>
            <View className='flex-row gap-3 items-center'>
              <Text className="text-black" style={styles.font}>20/11/2022</Text>
              {
                this.state.status === 'connected' ? 
                <TouchableOpacity
                  onPress={() => {
                    signOut();
                    client.disconnect();
                    this.setState({status: 'disconnect', subscribedTopic: 'pzem2'})
                  }}>
                    <Image source={require('../img/exit.png')} className="w-6 h-6"/>

                </TouchableOpacity>
                :
                <View>

                </View>
              }
            </View>
          </View>
          <View className="border-2 border-gray-300 m-4 mt-1 p-24 rounded-2xl"></View>
          
          {/* surveilance */}
          <View className="w-full">
            <View className="bg-blue-700 m-3 mt-1 p-6 px-8  rounded-2xl flex-row justify-around " style={styles.shadowB}>
              <View className="">
                <Image source={require('../img/radar.png')}/>
              </View>
              <View className="text-center items-center m-1" >
                <Text className="text-xl text-white" style={styles.font}>SURVEILANCE</Text>
                <Text className="text-lg text-white" style={styles.font}>{this.state.energy_svl} Kwh</Text>
                <View className="border-white border w-full m-2" style={styles.font}></View>
                <View>
                <View className="flex-row gap-1 m-0.5">
                      <Text className="text-white" style={styles.font}>{this.state.voltage_svl} V</Text>
                      <Text className="text-white" style={styles.font}>{this.state.current_svl} A</Text>
                      <Text className="text-white" style={styles.font}>{this.state.freq_svl} Hz</Text>
                    </View>
                </View>
              </View>
            </View>
    
            <View className="flex-row justify-evenly w-full p-2 ">
              {/* ac */}
              <View className="bg-blue-700 m-1 mx-2 p-1 pb-8 rounded-2xl items-center  w-1/2" style={styles.shadowB}>
                <View>
                  <Image className="" source={require('../img/ac.png')}/>
                </View>
                <View className="items-center mt-3">
                  <Text className="relative text-l text-white" style={styles.font}>COOLING SYSTEM</Text>
                  <Text className="relative text-l text-white" style={styles.font}>{this.state.energy_cs} Kwh</Text>
                    <View className="border-white border w-full px-14 m-2"></View>
                    <View className="flex-row gap-2 m-0.5">
                      <Text className="text-white text-xs" style={styles.font}>{this.state.voltage_cs} V</Text>
                      <Text className="text-white text-xs" style={styles.font}>{this.state.current_cs} A</Text>
                      <Text className="text-white text-xs" style={styles.font}>{this.state.freq_cs} Hz</Text>
                    </View>
                </View> 
              </View>
    
              {/* bulb */} 
              <View className="bg-blue-700 p-2 pb-8 rounded-2xl items-center m-1 mx-2 w-1/2" style={styles.shadowB}>
                <View>
                  <Image className="" source={require('../img/bulbOff.png')}/>
                </View>
                <View className="items-center mt-5 ">
                  <Text className="relative text-l text-white" style={styles.font}>ACCESSORIES</Text>
                  <Text className="relative text-l text-white" style={styles.font}>{this.state.energy_acs} Kwh</Text>
                    <View className="border-white border w-full px-14 m-2"></View>
                    <View className="flex-row gap-2 m-0.5 ">
                      <Text className="text-white text-xs" style={styles.font}>{this.state.voltage_acs} V</Text>
                      <Text className="text-white text-xs" style={styles.font}>{this.state.current_acs} A</Text>
                      <Text className="text-white text-xs" style={styles.font}>{this.state.freq_acs} Hz</Text>
                    </View>
                </View> 
              </View>
            </View>
          </View>
            {/* <BottomTab/> */}
        </SafeAreaView>
            
        );
    }
}

const styles = StyleSheet.create({
  font:{
    fontFamily: 'Inter'
  },
    shadow: {
        elevation: 10,
    },
    shadowB: {
      shadowColor: "#2e56e4",
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity:  0.23,
      shadowRadius: 11.27,
      elevation: 14
    }
})