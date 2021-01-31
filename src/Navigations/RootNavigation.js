import React, { Component } from 'react';
import { View, Text } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import {
    createStackNavigator,
    CardStyleInterpolators,
} from '@react-navigation/stack';

// Custom Screens
import Login from '../Screens/LoginScreen';
import Home from '../Screens/HomeScreen';
import Success from '../Screens/SuccessScreen';
import Map from '../Screens/MapView';
const Stack = createStackNavigator();
const WrapperNavigations = (props) => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    gestureEnabled: true,
                    gestureDirection: 'horizontal',
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                }}
                initialRouteName="Login">
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{ headerShown: false, animationEnabled: false }}
                />
                <Stack.Screen
                    name="Success"
                    component={Success}
                    options={{ headerShown: false, animationEnabled: false }}
                />
                <Stack.Screen
                    name="Map"
                    component={Map}
                    options={{ headerShown: false, animationEnabled: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default WrapperNavigations;
