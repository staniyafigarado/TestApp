import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, Dimensions, ImageBackground, TextInput, ScrollView, ToastAndroid } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
const { width, height } = Dimensions.get('window');
const Bacground = require('../Assets/Images/header.png');
const Add = require('../Assets/Images/add.jpg');
import AsyncStorage from '@react-native-community/async-storage';
import IonIcon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import { addItem } from '../Store/action';
import Geocoder from 'react-native-geocoder';
class AddImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avatarSource: null,
            name: '',
            location: '', region: {
                latitude: 24.92009056750823,
                longitude: 67.1012272143364,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1
            },
            locationChoosen: false, currentAddress: '', location: false
        };
        this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
    }
    toggle() {
        this.setState({ location: !this.state.location })
    }
    findCoordinates = () => {
        navigator.geolocation = require('@react-native-community/geolocation');
        navigator.geolocation.getCurrentPosition(pos => {
            // alert("Select location and go back to see the changed location")
            // this.map.animateToRegion({
            //     ...this.state.region,
            //     latitude: pos.coords.latitude,
            //     longitude: pos.coords.longitude
            // })
            this.setState({
                region: {
                    ...this.state.region,
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude
                },
                locationChoosen: true,
                location: true
            })
            this.getAddress(pos.coords.latitude, pos.coords.longitude)
        },
            err => {
                console.log(err);
                alert("something went wrong")
            })
    };
    getAddress = async (lat, lng) => {
        const MY_KEY = 'AIzaSyCB43lge3C9uOUNpxXNBNMpq4POi1CFrME';
        await Geocoder.fallbackToGoogle(MY_KEY);
        try {
            let res = await Geocoder.geocodePosition({ lat, lng })
            let addr = (res[0].formattedAddress)
            this.setState({
                currentAddress: addr
            })
            console.log(this.state.currentAddress)
            // AsyncStorage.setItem('location', this.state.currentAddress);
        } catch (error) {
            alert(error)
        }

    }
    selectPhotoTapped() {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true,
            },
        };



        ImagePicker.showImagePicker(options, response => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                let source = { uri: response.uri };

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: response.uri,
                });
            }
        });
    }

    //   image rendering
    renderFileData() {
        if (this.state.avatarSource) {
            return <View>
                <Image
                    source={{ uri: this.state.avatarSource }}
                    style={{ height: 200, width: 200 }}
                />
            </View>

        }

        else {
            return <View>
                <Image
                    source={Add}
                    style={{ height: 200, width: 200 }}
                />
            </View>
        }
    }
    Additem = () => {
        this.props.addItem({ name: this.state.name, location: this.state.currentAddress, image: this.state.avatarSource });
        this.props.navigation.goBack();
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
                                Add Image </Text>
                        </View>
                    </View>
                </ImageBackground>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ width: 200, height: 200, marginTop: 10, alignSelf: "center" }}>
                        <TouchableOpacity onPress={() => this.selectPhotoTapped()}>
                            {this.renderFileData()}
                        </TouchableOpacity>
                    </View>
                    <View style={{ alignItems: 'center', marginTop: 15 }}>
                        <View style={styles.TextInputView}>
                            <TextInput placeholder={"Name"}
                                onChangeText={name => this.setState({ name })}
                                style={[styles.textScondary, { fontSize: 13, padding: 10, alignItems: 'center', color: '#808080' }]} />
                        </View>
                        <TouchableOpacity onPress={() => this.toggle()}>
                            <View style={styles.TextInputView}>
                                {/* <TextInput placeholder={"Current location"}
                                onChangeText={location => this.setState({ location })}
                                style={[styles.textScondary, { fontSize: 13, padding: 10, alignItems: 'center' }]} /> */}
                                {
                                    this.state.location == true ? <Text style={[styles.textScondary, { fontSize: 13, padding: 10, alignItems: 'center', color: '#808080', lineHeight: 15 }]}>{this.state.currentAddress}</Text> : <TextInput placeholder={"Current location"}
                                        onChangeText={currentAddress => this.setState({ currentAddress })}
                                        style={[styles.textScondary, { fontSize: 13, padding: 10, alignItems: 'center' }]} />
                                }

                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.findCoordinates()} style={{ marginTop: 5, flexDirection: 'row' }}>
                            <IonIcon name="location" size={20} />
                            <Text style={[styles.textScondary, { fontSize: 13, padding: 10, alignItems: 'center', color: '#808080', lineHeight: 15, marginLeft: 5 }]}>Choose current location</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{}} onPress={() => this.Additem()}>
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#5D55B4', '#9E9ACC']} style={styles.linearGradient}>
                                <Text style={styles.buttonText}>
                                    Add
            </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }
}
const mapStateToProps = (state) => {
    console.log('PROP in REDUX', state);
    return {
        itemList: state.itemList,
    };
};
const mapDispatchToProps = {
    addItem,
};
export default connect(mapStateToProps, mapDispatchToProps)(AddImage);
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
        color: '#858585', fontSize: 18
    },
    HeaderText: {
        fontSize: 16,
        fontFamily: 'SinkinSans-600SemiBold',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
    textScondary: {
        fontFamily: 'SinkinSans-400Regular',
        color: '#858585'
    },
    TextInputView: {
        width: 279,
        height: 50,
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