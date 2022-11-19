import React,{ Component, useState, useEffect, } from 'react';
import {View,Text,StyleSheet,ImageBackground,TouchableOpacity,Button, Image,KeyboardAvoidingView,TextInput} from 'react-native';
import { StackActions } from '@react-navigation/native';
import { authentication } from '../firebase/firebase-config'
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';

const LoginPage = () => {
  const [isSigned, setIsSigned] = useState(false);

  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('')

  const navigation = useNavigation()

   useEffect(() => {
    const unsubscribe = authentication.onAuthStateChanged(user => {
      if (user) {
        navigation.replace("BottomTab")
      }
    })
    return unsubscribe
  }, [])

  const signUser = () => {
    signInWithEmailAndPassword(authentication, email, password)
    .then(userCredentials => {
      const user = userCredentials.user
    })
    // Note: buat if else alert (kapan2 aja)  
    // if(email = false, password = false){
    //   alert("Password and Email is Incorrect")
    // }
    .catch(error => alert("Email and Password is incorrect!"))
  }

  return (

    <View className="flex-1">
      <View className="flex-1 ">
        <TouchableOpacity onPress={() => navigation.dispatch(StackActions.replace('WelcomePage'))}>
          <View className="m-4 flex-row">
            <Image source={require('../img/back.png')} className="h-8 w-8 self-center"/>
            <Text className="self-center text-xl" style={{fontFamily: 'inter'}}>Back</Text>
          </View>
        </TouchableOpacity>
        
      </View>
      <KeyboardAvoidingView className="flex-grow justify-evenly items-start ">
        <View className=" w-full gap-4 ">
          <View className="self-center">
            <Text style={styles.fontAquire} className="text-4xl text-blue-700 ">POLAIRUD</Text>
          </View>
          <View className="self-center">
            <Text style={{fontFamily: 'inter'}} className="text-xl text-blue-700 ">Welcome to Dashboard Banten</Text>
          </View>
        </View>
        <View className="items-center w-full justify-evenly flex ">
          <View className="bg-white border-2 border-blue-700 m-2 rounded-2xl p-1 flex-row ">
            <Image source={require('../img/user.png')} className="w-6 h-6 self-center m-1"/>
            <TextInput placeholder="email" value={email} onChangeText={text=>setEmail (text)} className="w-72" />
          </View>
          <View className="bg-white border-2 border-blue-700 m-4 rounded-2xl p-1 flex-row">
            <Image source={require('../img/lock.png')} className="w-6 h-6 self-center m-1"/>
            <TextInput placeholder="password" value={password} onChangeText={text=>setPassword (text)} secureTextEntry={true} className="w-72" style={{fontFamily: 'inter'}} />
          </View>
        </View>
        
        <View className="self-center">
          {/* <Button title="sign in" onPress={signUser}/> */}
          <TouchableOpacity className="bg-blue-700 p-3 px-24 rounded-full" onPress={signUser}>
            <View className="">
              <Text className="text-2xl text-white">Login</Text>
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      <View className="flex-1"></View>

    </View>
  )
}

export default LoginPage

const styles = StyleSheet.create({
  fontAquire: {
    fontFamily: 'aquire'
  }
})