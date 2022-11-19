import React, {Component} from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
import { StackActions } from '@react-navigation/native';
import HomePage from '../Page/HomePage';
import { authentication } from '../firebase/firebase-config'
import { useNavigation } from '@react-navigation/native';
import { isSigned } from '../Page/LoginPage'
import { user } from '../Page/LoginPage'

class SplashScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    componentDidMount() {
        const unsubscribe = authentication.onAuthStateChanged(user => {
        if(user){
                this.props.navigation.dispatch(StackActions.replace('BottomTab'))
        } else if(user = false){
            this.props.navigation.dispatch(StackActions.replace('WelcomePage'))
        } else {    
            setTimeout(function() {
                this.props.navigation.dispatch(StackActions.replace('WelcomePage'))
            }.bind(this),3000) 
        }
    })
    return unsubscribe
}




    render() {
        return (
            <View style={styles.container} >
                <ImageBackground style={styles.image} source={require('../img/polairud2.png')} resizeMode="cover" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
        image: {
    flex: 1
        },
})



export default SplashScreen;
