import React, { Component } from 'react';
import { ImageBackground, StatusBar, View, Dimensions, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
const { width, height } = Dimensions.get('window')
export default class Splash extends Component {
    constructor() {
        super();
        this.state = {
            isVisible: true, email: ''
        }
    }
    Hide_Splash_Screen = () => {
        this.setState({
            isVisible: false
        });
    }
    componentDidMount = async () => {
        var that = this;
        // const data = await AsyncStorage.getItem('loginDetails');
        // console.log(data)
        await AsyncStorage.getItem('email').then((value) => this.setState({ 'email': value }))
        console.log(this.state.email)
        if (this.state.email !== null) {
            this.props.navigation.navigate('Dashboard')
        }
        else {
            this.props.navigation.navigate('Login');
        }
        setTimeout(function () {
            that.Hide_Splash_Screen();
        }, 3000);
    }
    render() {
        return (
            <View style={styles.Container}>
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#5D55B4', '#9E9ACC']} style={styles.linearGradient}>
                    <Text style={styles.buttonText}>
                        Logo
</Text>
                </LinearGradient>
            </View>
        );
    }
};
const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },
    linearGradient: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 23,
        fontFamily: 'SinkinSans-600SemiBold',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
});