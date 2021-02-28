import React from 'react'
import { View, SafeAreaView } from 'react-native';
import MainNav from './src/Navigations/RootNavigation';
import { Provider } from 'react-redux';
import store from './src/Store/store'
export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <Provider store={store}>
            <MainNav />
          </Provider>
        </SafeAreaView>
      </View>
    );
  }
}