import React from 'react';
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
const { width, height } = Dimensions.get('window');
const Icon = require('../Assets/Images/sucessIcon.png');
const SucessScreen = () => {
    return (
        <View style={styles.Container}>
            <Image source={Icon} style={styles.ImageStyle} />
            <View style={styles.TextContainer}>
                <Text style={styles.TextPrimary}>Success!</Text>
                <Text style={styles.textScondary}>Your account has been Created</Text>
            </View>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#02D384', '#00B7C9']} style={styles.linearGradient}>
                <Text style={styles.buttonText}>
                    Login your Account
        </Text>
            </LinearGradient>
        </View>
    );
};

export default SucessScreen;
const styles = StyleSheet.create({
    Container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    ImageStyle: {
        width: 150,
        height: 150
    },
    TextContainer: {
        marginTop: height * .03,
        alignItems: 'center'
    },
    TextPrimary: {
        fontFamily: 'SinkinSans-400Regular',
        fontSize: 22,
        color: '#474747'
    },
    textScondary: {
        fontFamily: 'SinkinSans-400Regular',
        fontSize: 14,
        color: '#858585',
        marginTop: height * .01
    },
    linearGradient: {
        width: 279,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: height * .25,
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