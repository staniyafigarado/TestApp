import React from 'react';
import { View, Image, Text, StyleSheet, Dimensions, ImageBackground, TextInput, ScrollView, ToastAndroid } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
const { width, height } = Dimensions.get('window');
const Bacground = require('../Assets/Images/header.png');
import AsyncStorage from '@react-native-community/async-storage';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { addItem } from '../Store/action';
class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: ''
        };
    }
    render() {
        console.log('PROP in REDUX', this.props.itemList);
        const itemList = this.props.itemList;
        return (
            <View style={styles.Container}>

                <ImageBackground source={Bacground} style={styles.ImageBackground}>
                    <View style={styles.HeaderStyle}>
                        <View style={styles.ChildContainer}>
                            <TouchableOpacity onPress={() => { this.props.navigation.toggleDrawer(); }}>
                                <IonIcon name="menu-outline" size={25} color="#FFF" />
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '80%', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={styles.HeaderText}>
                                Dashboard </Text>
                        </View>
                        <View style={styles.ChildContainer}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("AddImage")}>
                                <IonIcon name="add-circle-outline" size={25} color="#FFF" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
                <ScrollView showsHorizontalScrollIndicator={false}>
                    {
                        itemList == "" ? <View style={{ alignItems: 'center', marginTop: 50 }}>
                            <Text style={styles.textScondary}>Image list is empty</Text>
                        </View> : <View style={{ padding: 10, alignItems: 'center' }}>
                                <FlatList
                                    data={itemList}
                                    numColumns={2}
                                    renderItem={({ item }) => {
                                        return (
                                            <TouchableOpacity activeOpacity={.7} style={{ padding: 10 }}
                                                onPress={() =>
                                                    this.props.navigation.navigate('DetailsScreen', {
                                                        image: item.image,
                                                        name: item.name,
                                                        location: item.location
                                                    })
                                                }  >
                                                <View style={{ alignItems: 'center', marginTop: 10, elevation: 3, backgroundColor: 'white', width: 150, height: 180, borderRadius: 10, justifyContent: 'center', }}>
                                                    <Image source={{ uri: item.image }}
                                                        style={{ width: 100, height: 100, borderRadius: 10, backgroundColor: 'pink' }}></Image>
                                                    <Text style={{ marginTop: 7 }}>{item.name}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        )
                                    }
                                    }
                                />
                            </View>
                    }

                </ScrollView>
            </View>
        );
    }
}
const mapStateToProps = (state) => {
    console.log('PROP in REDUX', state.itemList);
    return {
        itemList: state.itemList,
    };
};
const mapDispatchToProps = {
    addItem,
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
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
});