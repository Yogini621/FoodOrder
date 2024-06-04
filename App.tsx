import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginPage from './FoodOrder/LoginPage'
import AdminPage from './FoodOrder/AdminPage'
import UserPage from './FoodOrder/UserPage'
import CartPage from './FoodOrder/CartPage'

const Stack = createNativeStackNavigator()

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="LoginPage"
            component={LoginPage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AdminPage"
            component={AdminPage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="UserPage"
            component={UserPage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CartPage"
            component={CartPage}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

