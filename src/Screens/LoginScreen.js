import React from 'react';
import { View, Image, Text, StyleSheet, Dimensions, ImageBackground, TextInput, ScrollView, ToastAndroid } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
const { width, height } = Dimensions.get('window');
const Bacground = require('../Assets/Images/header.png');
import AsyncStorage from '@react-native-community/async-storage';
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
    }
    insertData() {
        if (this.state.email == 'test@gmail.com' && this.state.password == 123456) {
            ToastAndroid.show("Success", ToastAndroid.SHORT);
            this.props.navigation.navigate("Dashboard");
            AsyncStorage.setItem('email', 'test@gamil.com')
            AsyncStorage.setItem('password', '123456')
        }
        else {
            ToastAndroid.show("Something went wrong", ToastAndroid.SHORT);
        }
    }
    render() {
        return (
            <View style={styles.Container}>
                <ScrollView showsHorizontalScrollIndicator={false}>
                    <ImageBackground source={Bacground} style={styles.ImageBackground}>
                    </ImageBackground>
                    <View style={styles.ChildContainer}>
                        <Text style={styles.TextPrimary}>Welcome Back</Text>
                        <Text style={[styles.textScondary, { fontSize: 12, color: '#858585' }]}>Login to your Account</Text>
                        <View style={styles.TextInputView}>
                            <TextInput placeholder={"Email"}
                                keyboardType={'email-address'}
                                onChangeText={email => this.setState({ email })}
                                style={[styles.textScondary, { fontSize: 13, padding: 10, alignItems: 'center' }]} />
                        </View>
                        <View style={styles.TextInputView}>
                            <TextInput placeholder={"password"}
                                maxLength={10}
                                onChangeText={password => this.setState({ password })}
                                style={[styles.textScondary, { fontSize: 13, padding: 10, alignItems: 'center' }]} />
                        </View>
                        <TouchableOpacity style={{}} onPress={() => this.insertData()}>
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#5D55B4', '#9E9ACC']} style={styles.linearGradient}>
                                <Text style={styles.buttonText}>
                                    Login
            </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },
    ImageBackground: {
        width: '100%',
        height: 250,
        alignItems: 'center',
        justifyContent: 'center'
    },
    ImageContainer: {
        position: 'absolute',
        bottom: -height * .05
    },
    ImageStyle: {
        width: 84,
        height: 84
    },
    ChildContainer: {
        alignItems: 'center',
        marginTop: height * .07
    },
    TextContainer: {
        alignItems: 'center'
    },
    TextPrimary: {
        fontFamily: 'SinkinSans-700Bold',
        fontSize: 18,
        color: '#474747'
    },
    textScondary: {
        fontFamily: 'SinkinSans-400Regular',
        color: '#858585'
    },
    TextInputView: {
        width: 279,
        height: 45,
        borderWidth: 1,
        borderColor: '#D4D4D4',
        borderRadius: 6,
        marginTop: height * .03
    },
    linearGradient: {
        width: 279,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: height * .03,
        borderRadius: 6
    },
    buttonText: {
        fontSize: 14,
        fontFamily: 'SinkinSans-600SemiBold',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
});