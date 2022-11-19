import { Pressable, SafeAreaView, Text, View, Switch, Button} from 'react-native';
import React, { useState, Component, useEffect } from 'react';
import init from 'react_native_mqtt';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout } from '../Page/HomePage';
import { Connect } from './Connect';

class ButtonDc extends Connect {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {
    return (
      <View className='px-10 mt-48'>
         {
          this.state.status === 'connected' ?
          <View>
              <Button
              type='solid'
              title='Logout'
              onPress={() => {
                  logout()
                client.disconnect();
                this.setState({ status: 'disconnected', subscribedTopic: 'pzem2/pln/1' });
              }}/>
              
          </View>
          :
          <View>
          </View>
  }
      </View>
    );
  }
}

export default ButtonDc;