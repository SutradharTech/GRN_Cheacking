import { View, Text } from 'react-native'
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Transport1 from '../Transport/Transport1';
import TransportItems from '../Transport/TransportItems';

const Stack = createNativeStackNavigator();

const TransportStack = () => {
  return (
    <Stack.Navigator initialRouteName='Transport1'>

    <Stack.Screen name="Transport1" component={Transport1} options={{ headerShown: false, }} />
    <Stack.Screen name="TransportItems" component={TransportItems} options={{ headerShown: false}} />

  </Stack.Navigator>
  )
}

export default TransportStack