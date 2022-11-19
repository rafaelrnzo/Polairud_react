import { StyleSheet, Text, View, Image, Animated , Dimensions} from 'react-native'
import React,{useRef, useState} from 'react'
import GensetPage from '../Page/GensetPage'
import HomePage from '../Page/HomePage'
import PlnPage from '../Page/PlnPage'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const Tab = createBottomTabNavigator();

export default function BottomTab(){
  
  // let [energy_svl, set_energy_svl] = useState('0.00')
  // let [voltage_svl, set_voltage_svl] = useState('0.00')
  // let [current_svl, set_current_svl] = useState('0.00')
  // let [freq_svl, set_freq_svl] = useState('0.00')
  // let [energy_cs, set_energy_cs] = useState('0.00')
  // let [voltage_cs, set_voltage_cs] = useState('0.00')
  // let [current_cs, set_current_cs] = useState('0.00')
  // let [freq_cs, set_freq_cs] = useState('0.00')
  // let [energy_acs, set_energy_acs] = useState('0.00')
  // let [voltage_acs, set_voltage_acs] = useState('0.00')
  // let [current_acs, set_current_acs] = useState('0.00')
  // let [freq_acs, set_freq_acs] = useState('0.00')

  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  return(
    <>
      <Tab.Navigator 
      screenOptions={{ 
        headerShown: false, 
        tabBarShowLabel: false,
        activeColor: "green",
        initialRouteName: "HomePage",
        tabBarOptions: { showIcon: true, },
        tabBarStyle: {
          activeTintColor: '#0091EA',
          inactiveTintColor: 'gray',
          height: 70 ,
          borderRadiusTo: 30,
          backgroundColor: 'white',
        } 
      }}
      >
        <Tab.Screen name="HomePage" component={HomePage} 
        options={{
          tabBarIcon: ({focused})=> (
             <View>
              <Image 
                source={require('../img/home.png')}
                resizeMode="contain"
                style={{
                  tintColor: focused ? 'blue' : 'gray',
                  width: 30,
                  height: 30,
                }}
              />
             </View> 
          ),
        }}listeners={({navigation,route}) => ({
          tabPress: e => {
            Animated.spring(tabOffsetValue,{
              toValue: getWidth() * - 0.001,
              useNativeDriver: true
            }).start();
          }
        })}
        />
        <Tab.Screen name="ProfilePage" component={PlnPage} 
        options={{
          tabBarIcon: ({focused})=> (
             <View>
              <Image 
                source={require('../img/flash.png')}
                resizeMode="contain"
                style={{
                  tintColor: focused ? 'blue' : 'gray',
                  width: 30,
                  height: 30,
                }}
              />
             </View> 
          ),
        }}listeners={({navigation,route}) => ({
          tabPress: e => {
            navigation.navigate({
              name: 'ProfilePage',
            })
            Animated.spring(tabOffsetValue,{
              toValue: getWidth() * 2,
              useNativeDriver: true
            }).start();
          }
        })}
        />
        <Tab.Screen name="DetailPage" component={GensetPage} 
        options={{
          tabBarIcon: ({focused})=> (
             <View>
              <Image 
                source={require('../img/generator.png')}
                resizeMode="contain"
                style={{
                  tintColor: focused ? 'blue' : 'gray',
                  width: 40,
                  height: 30,
                }}
              />
             </View> 
          ),
        }}listeners={({navigation,route}) => ({
          tabPress: e => {
            Animated.spring(tabOffsetValue,{
              toValue: getWidth() * 3.9,
              useNativeDriver: true
            }).start();
          }
        })}
        />
      </Tab.Navigator>
      <Animated.View style={{
        width: getWidth(),
        height: 3,
        backgroundColor: 'blue',
        position: 'absolute',
        bottom: 65,
        left: 32,
        transform: [
          { translateX: tabOffsetValue,}
        ]
        
      }} >

      </Animated.View>
    </>
  )
}
  
function getWidth(){
  let width = Dimensions.get('window').width

  width = width - 60

  return width / 5
}