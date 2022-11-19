import * as React from 'react';
import { Component } from 'react';
import HomePage from './Page/HomePage'
import PlnPage from './Page/PlnPage'
import BottomTab from './Widget/BottomTab'
import WelcomePage from './Page/WelcomePage'
import SplashScreen from './Widget/SplashScreen'
import LoginPage from './Page/LoginPage';
import gensetPage from './Page/GensetPage'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator()
// const Tab = createBottomTabNavisgator()

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <NavigationContainer>
      <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{headerShown: false}}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="WelcomePage" component={WelcomePage} />
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="DetailsPage" component={gensetPage} />
        <Stack.Screen name="ProfilePage" component={PlnPage} />
        <Stack.Screen name="BottomTab" component={BottomTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
  }
}

export default App;