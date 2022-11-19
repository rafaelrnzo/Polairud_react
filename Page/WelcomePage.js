import React, {Component, useEffect} from 'react'
import {ImageBackground, Text, View, StyleSheet, Button,TouchableOpacity} from 'react-native'
import { StackActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

const WelcomePage = () => {
  const navigation = useNavigation()
  return(
      <View style={styles.container}>
        <ImageBackground style={styles.image} source={require('../img/welcome.png')} resizeMode="cover"  >
          <View className=" flex-1 items-center"> 
              <View className="flex-1 justify-end mb-16">
                <View className="flex-row">
                  <TouchableOpacity onPress={() => navigation.dispatch(StackActions.replace('LoginPage'))}>
                    <View className="bg-blue-700 p-4 px-8 w-full rounded-l-xl">
                      <Text className="text-xl text-white">TJ Priok</Text>
                      
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => navigation.dispatch(StackActions.replace('LoginPage'))}>
                    <View className="bg-blue-600 p-4 px-8 w-full rounded-r-xl  ">
                      <Text className="text-xl text-white">Banten</Text>  
                    </View>
                  </TouchableOpacity>
                </View>
                
              </View>
          </View>
        </ImageBackground>
    </View>
    );
  }


const styles = StyleSheet.create({
 container: {
  flex: 1,
 },
  image: {
    flex: 1,
  }
})

export default WelcomePage;