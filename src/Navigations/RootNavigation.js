import React, { Component } from 'react';
import { View, Text } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import {
    createStackNavigator,
    CardStyleInterpolators,
} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
// Custom Screens
import Login from '../Screens/LoginScreen';
import Dashboard from '../Screens/Dashboard';
import AddImage from '../Screens/AddImage';
import DetailsScreen from '../Screens/DetailsScreen';
import Splash from '../Screens/Splash';
import LogOut from '../Screens/logOut';
import Home from '../Screens/Home';
const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Dashboard" component={Dashboard} />
            <Drawer.Screen name="Logout" component={LogOut} />
        </Drawer.Navigator>
    );
}

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
                initialRouteName="Splash">
                <Stack.Screen
                    name="Dashboard"
                    component={DrawerNavigator}
                    options={{ headerShown: false, animationEnabled: false }}
                />
                <Stack.Screen
                    name="Splash"
                    component={Splash}
                    options={{ headerShown: false, animationEnabled: false }}
                />
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="AddImage"
                    component={AddImage}
                    options={{ headerShown: false, animationEnabled: false }}
                />
                <Stack.Screen
                    name="DetailsScreen"
                    component={DetailsScreen}
                    options={{ headerShown: false, animationEnabled: false }}
                />
                <Stack.Screen
                    name="LogOut"
                    component={LogOut}
                    options={{ headerShown: false, animationEnabled: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default WrapperNavigations;
