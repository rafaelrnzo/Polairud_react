import { Pressable, SafeAreaView, Text, View, Switch, Button} from 'react-native';
import React, { useState, Component, useEffect } from 'react';
import init from 'react_native_mqtt';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout } from '../Page/HomePage';
import { login } from '../Page/LoginPage';
import { useNavigation } from '@react-navigation/native' 

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
  id: 'id_' + parseInt(Math.random()*100000) // Client ID MQTT
};

client = new Paho.MQTT.Client(options.host, options.port, options.path);


export class Connect extends Component {
    constructor() {
        super()
        this.state = {
            topic_banten_satu: 'pzem2/pln/1',
            topic_banten_dua: 'pzem2/pln/2',
            topic_banten_tiga: 'pzem2/pln/3',
            energy_surveillance: '',
            message: '',
            messageList: [],
            status: '',
            username_mqtt: 'tjpriok',
            password_mqtt: 'admin.admin',
            classButton: 'bg-blue-500 p-4 rounded-lg mt-3',
        }
        client.onConnectionLost = this.onConnectionLost;
        client.onMessageArrived = this.onMessageArrived;
    }
    // componentDidMount() {
    //     this.connect();
    // }
    
    clickState = () => {
        if( this.state.valueStatus == '0' ) {
            this.setState({
                valueStatus: '1',
                textButton: 'OFF',
                classButton: 'bg-red-500 p-4 rounded-lg mt-3'
            })
            this._sendMessage("1", this.state.topic_banten_dua)
        } else {
            this.setState({
                valueStatus: '0',
                textButton: 'ON',
                classButton: 'bg-blue-500 p-4 rounded-lg mt-3'
            })
            this._sendMessage("0", this.state.topic_banten_dua)
        }
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

    unSubscribeTopic = () => {
        client.unsubscribe(this.state.subscribedTopic);
        this.setState({ subscribedTopic: 'pzem2/pln/1' });
      }

    onConnectionLost=(responseObject)=>{
        if (responseObject.errorCode !== 0) {
            console.log('Koneksi Lost: ' + responseObject.errorMessage);
        }
    }

    onMessageArrived = (message)=> {
        console.log('Pesan diterima dari MQTT:' + message.destinationName + message.payloadString);
        newmessageList = this.state.messageList;
        newmessageList.unshift(message.payloadString);
        var data = JSON.parse(message.payloadString)
        energySurveillance = this.state.energy_surveillance;
        energySurveillance.unshift(data["E"])
        
        console.log(data["E"])
        this.setState({ messageList: newmessageList });

        var E = data["E"]
        var W = data["W"]
        var P = data["P"]
        console.log("E")
        
    }

    disconnect() {
        console.log("client is disconnecting..");
        this.client.disconnect();
   }

    render() {
        return (
            <SafeAreaView className=" m-1 " style={styles.font}>
      <View className="bg-blue-400 m-3 p-4 rounded-2xl flex-row justify-between">
      {/* <Button title="sign out" onPress={logout}/> */}
        <Text className="text-black" style={styles.font}>Energy In Use</Text>
        <Text className="text-black" style={styles.font}>20/11/2022</Text>
      </View>
      <View className="border-2 border-gray-300 m-4 mt-1 p-24 rounded-2xl"></View>
      {/* surveilance */}
      <View className="w-full">
        <View className="bg-blue-700 m-4 mt-1 p-6 rounded-2xl flex-row justify-around " style={styles.shadow}>
          <View className="">
            <Image source={require('../img/radar.png')}/>
          </View>
          <View className="text-center items-center m-1" >
            <Text className="text-xl text-white" style={styles.font}>SURVEILANCE</Text>
            <Text className="text-lg text-white" style={styles.font}>0.00 Kwh</Text>
            <View className="border-white border w-full m-2" style={styles.font}></View>
            <View>
              <View className="flex-row gap-2 ">
                <Text className="text-white" style={styles.font}>
                  {/* <Connect/> */}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* ac */}
        <View className="flex-row justify-evenly ">
          <View className="bg-blue-700 m-1 p-2 pb-8 rounded-2xl items-center" style={styles.shadow}>
            <View>
              <Image className="" source={require('../img/ac.png')}/>
            </View>
            <View className="items-center mt-3">
              <Text className="relative text-lg text-white" style={styles.font}>COOLING SYSTEM</Text>
              <Text className="relative text-base text-white" style={styles.font}>0.00 Kwh</Text>
                <View className="border-white border w-full px-14 m-2"></View>
                <View className="flex-row gap-2 m-0.5">
                  <Text className="text-white" style={styles.font}>0.00 W</Text>
                  <Text className="text-white" style={styles.font}>0.00 A</Text>
                  <Text className="text-white" style={styles.font}>0.00 Hz</Text>
                </View>
            </View> 
          </View>

          {/* bulb */} 
          <View className="bg-blue-700 p-2 pb-8 rounded-2xl items-center m-1" style={styles.shadow}>
            <View>
              <Image className="" source={require('../img/bulbOff.png')}/>
            </View>
            <View className="items-center mt-5 ">
              <Text className="relative text-lg text-white" style={styles.font}>LAMP</Text>
              <Text className="relative text-base text-white" style={styles.font}>0.00 Kwh</Text>
                <View className="border-white border w-full px-14 m-2"></View>
                <View className="flex-row gap-2 m-0.5">
                  <Text className="text-white" style={styles.font}>0.00 W</Text>
                  <Text className="text-white" style={styles.font}>0.00 A</Text>
                  <Text className="text-white" style={styles.font}>0.00 Hz</Text>
                </View>
            </View> 
          </View>
        </View>
      </View>
      <View>
      </View>
        {/* <BottomTab/> */}
    </SafeAreaView>
             
        );
    }
}

// export default ButtonDc = () => {
//     <>
//      {
//         this.useState.status === 'connected' ?
//         <View>
//             <Button
//             type='solid'
//             title='Logout'
//             onPress={() => {
                // logout()
//               client.disconnect();
//               this.setState({ status: 'disconnected', subscribedTopic: 'pzem2/pln/1' });
//             }}/>
            
//         </View>
//         :
//         <View>
//         </View>
//     }
//     </>
   
// }