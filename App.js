/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {View} from 'react-native'; 
import Commodity from './src/Commodity.js';
import Test2 from './src/Test2.js';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Navigation } from './src/Navigation.js';
import Personal from './src/Personal.js';

const Stack = createStackNavigator();
export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{
    headerShown: false
  }}>
          <Stack.Screen name="Home" component={Commodity} />
          <Stack.Screen name="Personal" component={Personal} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
