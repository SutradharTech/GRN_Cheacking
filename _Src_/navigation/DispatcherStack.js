import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dispatcher from '../Dispatcher/Dispatcher';
import DispatcherItem from '../Dispatcher/Dispatchertem';

const Stack = createNativeStackNavigator();

const DispatcherStack = () => {
  return (
    <Stack.Navigator>

        <Stack.Screen name="Dispatcher" component={Dispatcher} options={{ headerShown: false, }} />
        <Stack.Screen name="DispatcherItem" component={DispatcherItem} options={{ headerShown: false, animation: 'slide_from_right',  headerStyle: { backgroundColor: '#ffae42' }, headerTintColor: 'white', }} />

      </Stack.Navigator>
  )
}

export default DispatcherStack