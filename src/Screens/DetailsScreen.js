import React from 'react';
import { View, Image, Text, StyleSheet, Dimensions, ImageBackground, TextInput, ScrollView, ToastAndroid } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
const { width, height } = Dimensions.get('window');
const Bacground = require('../Assets/Images/header.png');
import AsyncStorage from '@react-native-community/async-storage';
import IonIcon from 'react-native-vector-icons/Ionicons';
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
    }
    render() {
        return (
            <View style={styles.Container}>
                <ImageBackground source={Bacground} style={styles.ImageBackground}>
                    <View style={styles.HeaderStyle}>
                        <View style={styles.ChildContainer}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("Dashboard")}>
                                <IonIcon name="arrow-back" size={25} color="#FFF" />
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '90%', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={styles.HeaderText}>
                                View Image </Text>
                        </View>
                    </View>
                </ImageBackground>
                <View style={{ width: 200, height: 200, marginTop: 10, alignSelf: "center" }}>
                    <Image source={{ uri: this.props.route.params.image }}
                        style={{ height: 200, width: 200, backgroundColor: 'lightgray' }}
                    />
                </View>
                <View style={{ alignItems: 'center', marginTop: 15 }}>
                    <Text style={[styles.textScondary]}>{this.props.route.params.name}</Text>
                    <Text style={[styles.textScondary]}>{this.props.route.params.location}</Text>
                </View>
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
        height: 60,
        alignItems: 'center',
        justifyContent: 'center'
    },
    HeaderStyle: {
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10
    },
    ChildContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '10%'
    },
    textScondary: {
        fontFamily: 'SinkinSans-400Regular',
        color: '#858585',
        fontSize: 15,
        padding: 10,
        alignItems: 'center'
    },
    HeaderText: {
        fontSize: 16,
        fontFamily: 'SinkinSans-600SemiBold',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
});