import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Commodity from './Commodity.js';
import Personal from './Personal.js';

const Stack = createStackNavigator();
export default class Navigation extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Commodity} />
          <Stack.Screen name="Personal" component={Personal} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
