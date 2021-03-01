import React from 'react';
import { View, Dimensions, } from 'react-native';
const { width, height } = Dimensions.get('window')
import AsyncStorage from '@react-native-community/async-storage';
export default class App extends React.Component {
  async componentDidMount() {
    try {
      await AsyncStorage.clear()
      console.log('Storage successfully cleared!')
      this.props.navigation.navigate('Login');
    } catch (e) {
      console.log('Failed to clear the async storage.')
    }
  }

  render() {
    return (
      <View>

      </View>
    );
  }
}