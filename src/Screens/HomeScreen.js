import React from 'react';
import {
    View, Image, Text, StyleSheet, Dimensions, ImageBackground, TextInput, ScrollView, FlatList,
    ActivityIndicator, Modal, ToastAndroid, Button
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
const { width, height } = Dimensions.get('window');
const Bacground = require('../Assets/Images/dashboardTop.png');
const Logo = require('../Assets/Images/dashboardIcon.png');
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Geocoder from 'react-native-geocoder';
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [], avatarSource: null, selectedItem: '', isSelected: false, location: '', isloading: true, selectedLocation: '',
            isVisible: false, region: {
                latitude: 24.92009056750823,
                longitude: 67.1012272143364,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1
            },
            locationChoosen: false,
            marginBottom: 1,
            currentAddress: '',
            location: ''
        };
        this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
    }
    componentDidMount = async () => {
        this.handleLocation();
        setTimeout(() => this.setState({ marginBottom: 0 }), 100)
        this.getData();
    }
    handleLocation = () => {
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
                locationChoosen: true
            })
            // this.getAddress(pos.coords.latitude, pos.coords.longitude)
        },
            err => {
                console.log(err);
                alert("something went wrong")
            }
        )
    }

    getAddress = async (lat, lng) => {
        const MY_KEY = 'AIzaSyCB43lge3C9uOUNpxXNBNMpq4POi1CFrME';
        await Geocoder.fallbackToGoogle(MY_KEY);
        try {
            let res = await Geocoder.geocodePosition({ lat, lng })
            let addr = (res[0].formattedAddress)
            this.setState({
                currentAddress: addr
            })
            AsyncStorage.setItem('location', this.state.currentAddress);
        } catch (error) {
            alert(error)
        }

    }

    onRegionChange = (region) => {
        this.getAddress(region.latitude, region.longitude)
        ToastAndroid.show(JSON.stringify(this.state.currentAddress), ToastAndroid.SHORT)
        // alert(JSON.stringify(this.state.currentAddress))
        this.setState({ region });
        console.log(this.state.region)
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
                this.setState({
                    avatarSource: source,
                });
            }
        });
    }

    getData() {
        var requestOptions = {
            method: 'GET'
        };
        fetch("https://reqres.in/api/users?page=2", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result.data)
                AsyncStorage.getItem('location').then((value) => this.setState({ 'location': value }))

                this.setState({ dataSource: result.data, isloading: false })
            })
            .catch(error => console.log('error', error));
    }

    map = () => {
        this.setState({ isVisible: false })
    }

    _choosen(item) {
        this.setState({ selectedItem: item });
        this.selectPhotoTapped();
    }
    _locationchoosen(item) {
        this.setState({ selectedLocation: item });
        // await AsyncStorage.setItem('itemLocation', JSON.stringify(item));
        // alert(this.state.itemLocation)
        // this.props.navigation.navigate("Map");
        this.setState({ isVisible: true })
    }
    render() {
        if (this.state.isloading) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator color={"#26CCD8"} size={'large'} />
                </View>
            );
        }
        return (
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, backgroundColor: '#EFF8F9', height: '100%' }}>
                <View style={styles.Container}>
                    <ImageBackground source={Bacground} style={styles.ImageBackground}>
                        <View style={styles.ImageContainer}>
                            <Image source={Logo} style={styles.ImageStyle} />
                        </View>
                    </ImageBackground>
                    <View style={{ height: '100%', top: -height * .2, alignItems: 'center' }}>
                        <FlatList
                            data={this.state.dataSource}
                            renderItem={({ item }) => {
                                const isSelected = (this.state.selectedItem === item);
                                const isLocation = (this.state.selectedLocation === item);
                                const source = isSelected ? <Image source={this.state.avatarSource} style={styles.ImageStyle} /> : <Image source={{ uri: item.avatar }} style={styles.ImageStyle} />;
                                const location = isLocation ? <Text style={[styles.CTextP, { fontSize: 12, color: '#26CCD8', textAlign: 'center' }]}>{this.state.currentAddress}</Text> : <Text style={[styles.CTextP, { fontSize: 12, color: '#26CCD8', textAlign: 'center' }]}>Kochi</Text>
                                return (
                                    <View style={{ flexDirection: 'row', width: width * .95, height: height * .2, backgroundColor: 'white', borderRadius: 20, elevation: 1, padding: 15, marginTop: 10 }}>

                                        <View style={{ alignItems: 'center', justifyContent: 'center', width: '25%' }}>
                                            {
                                                source
                                            }
                                            <TouchableOpacity onPress={() => this._choosen(item)} style={{ alignItems: 'center' }}>
                                                <Icon name="cloud-upload" size={20} color="rgb(211,211,211)" />
                                                <Text style={styles.TextPrimary}>Change Avatar</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{}}>
                                            <View style={{ width: '60%', justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={styles.CTextP}>{item.first_name} {item.last_name}</Text>
                                                <Text style={styles.CTextS}>{item.email}</Text>
                                            </View>

                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <View style={{ width: '60%' }}>
                                                    {
                                                        location
                                                    }
                                                </View>
                                                <View style={{ width: '30%', alignItems: 'center' }}>
                                                    <TouchableOpacity style={{ alignItems: 'center', width: '50%' }} onPress={() => this._locationchoosen(item)}>
                                                        <IonIcon name="location" size={18} color="rgb(211,211,211)" />
                                                        <Text style={[styles.CTextS, { textAlign: 'center' }]}>Change</Text>
                                                        <Text style={[styles.CTextS, { textAlign: 'center' }]}>Location</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                        {
                                            this.state.isVisible == true ? <Modal onRequestClose={() => this.map()}>
                                                <View style={{ flex: 1 }}>
                                                    <MapView
                                                        style={styles.mapStyle}
                                                        showsUserLocation={false}
                                                        zoomEnabled={true}
                                                        zoomControlEnabled={true}
                                                        initialRegion={this.state.region}
                                                        onRegionChangeComplete={this.onRegionChange}
                                                        ref={ref => this.map = ref}>
                                                        <Marker
                                                            coordinate={this.state.region}
                                                        />
                                                    </MapView>
                                                    <Button style={[styles.textInputLogin, { alignItems: 'center', }]} title="CLOSE" onPress={() => { this.setState({ isVisible: !this.state.isVisible }) }} />
                                                </View>
                                            </Modal> : null
                                        }
                                    </View>
                                )
                            }
                            }
                            keyExtractor={item => item.id}
                        />
                    </View>
                </View>

            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#EFF8F9',
    },
    ImageBackground: {
        width: '100%',
        height: 250,
    },
    ImageContainer: {
        position: 'absolute', padding: 15
    },
    ImageStyle: {
        width: 54.6,
        height: 54.6,
        borderRadius: 15
    },
    TextPrimary: {
        fontFamily: 'SinkinSans-500Medium',
        fontSize: 10,
        color: 'gray', textAlign: 'center'
    },
    textScondary: {
        fontFamily: 'SinkinSans-600SemiBold',
        fontSize: 16,
        color: '#FFF'
    },
    ChildContainer: {
        position: 'absolute',
        padding: 10,
        width: '100%',
        justifyContent: 'space-between',
        marginTop: height * .15, height: '100%'

    },
    ChildView: {
        width: 161,
        height: 185,
        borderRadius: 20,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-start'
    },
    ChildViewS: {
        flexDirection: 'row',
        padding: 10,
        width: '100%',
        justifyContent: 'space-between'
    },
    CTextP: {
        fontFamily: 'SinkinSans-500Medium',
        fontSize: 13,
        marginTop: 5,
        color: '#5E5E5E'
    },
    CTextS: {
        fontFamily: 'SinkinSans-400Regular',
        fontSize: 10,
        color: '#858585',
        marginTop: 5
    },
    mapStyle: {
        width: '100%', height: height * .9
    },
    linearGradient: {
        width: 279,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
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