import React from 'react';
import { View, Image, Text, StyleSheet, Dimensions, ImageBackground, TextInput, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
const { width, height } = Dimensions.get('window');
const Bacground = require('../Assets/Images/dashboardTop.png');
const Logo = require('../Assets/Images/dashboardIcon.png');
const physics = require('../Assets/Images/physics.png');
const Chemistry = require('../Assets/Images/chemistry.png');
const maths = require('../Assets/Images/maths.png');
const hindi = require('../Assets/Images/hindi.png');
const botany = require('../Assets/Images/botany.png');
const zology = require('../Assets/Images/zology.png');
const english = require('../Assets/Images/english.png');
const dashboardBottom = require('../Assets/Images/dashboardBottom.png');
const Home = ({ navigation }) => {
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, backgroundColor: '#EFF8F9' }}>
            <View style={styles.Container}>
                <ImageBackground source={Bacground} style={styles.ImageBackground}>
                    <View style={styles.ImageContainer}>
                        <Image source={Logo} style={styles.ImageStyle} />
                        <Text style={styles.TextPrimary}>Goodmorning</Text>
                        <Text style={styles.textScondary}>Ananthu M Mohan</Text>
                    </View>
                    <View style={styles.ChildContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate('Success')}>
                            <View style={styles.ChildView}>
                                <Image source={physics} style={{ width: 127, height: 109 }} />
                                <Text style={styles.CTextP}>Physics</Text>
                                <Text style={styles.CTextS}>15 Chapters</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Success')}>
                            <View style={styles.ChildView}>
                                <Image source={Chemistry} style={{ width: 127, height: 109 }} />
                                <Text style={styles.CTextP}>Chemistry</Text>
                                <Text style={styles.CTextS}>15 Chapters</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
                <View style={styles.ChildViewS}>
                    <TouchableOpacity onPress={() => navigation.navigate('Success')}>
                        <View style={styles.ChildView}>
                            <Image source={maths} style={{ width: 127, height: 109 }} />
                            <Text style={styles.CTextP}>Mathematics</Text>
                            <Text style={styles.CTextS}>15 Chapters</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Success')}>
                        <View style={styles.ChildView}>
                            <Image source={hindi} style={{ width: 127, height: 109 }} />
                            <Text style={styles.CTextP}>Hindi</Text>
                            <Text style={styles.CTextS}>15 Chapters</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.ChildViewS}>
                    <TouchableOpacity onPress={() => navigation.navigate('Success')}>
                        <View style={styles.ChildView}>
                            <Image source={botany} style={{ width: 127, height: 109 }} />
                            <Text style={styles.CTextP}>Botony</Text>
                            <Text style={styles.CTextS}>15 Chapters</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Success')}>
                        <View style={styles.ChildView}>
                            <Image source={zology} style={{ width: 127, height: 109 }} />
                            <Text style={styles.CTextP}>Zoology</Text>
                            <Text style={styles.CTextS}>15 Chapters</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View>
                    <ImageBackground style={{ width: '100%', height: 250 }} source={dashboardBottom}>
                        <View style={{ position: 'absolute', margin: 10 }}>
                            <TouchableOpacity style={styles.ChildView}
                                onPress={() => navigation.navigate('Success')}>
                                <Image source={english} style={{ width: 127, height: 109 }} />
                                <Text style={styles.CTextP}>English</Text>
                                <Text style={styles.CTextS}>15 Chapters</Text>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </View>
            </View>
        </ScrollView>
    );
};

export default Home;
const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#EFF8F9'
    },
    ImageBackground: {
        width: '100%',
        height: 403,
    },
    ImageContainer: {
        position: 'absolute', padding: 15
    },
    ImageStyle: {
        width: 54.6,
        height: 54.6
    },
    TextPrimary: {
        fontFamily: 'SinkinSans-500Medium',
        fontSize: 10,
        color: '#FFF',
        marginTop: height * .1
    },
    textScondary: {
        fontFamily: 'SinkinSans-600SemiBold',
        fontSize: 16,
        color: '#FFF'
    },
    ChildContainer: {
        flexDirection: 'row',
        bottom: 0,
        position: 'absolute',
        padding: 10,
        width: '100%',
        justifyContent: 'space-between'
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
        color: '#858585'
    }
});