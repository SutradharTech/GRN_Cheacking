import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dispatcher from '../Dispatcher/Dispatcher Bill/Dispatcher';
import DispatcherItem from '../Dispatcher/Dispatcher Bill/Dispatchertem';


const Stack = createNativeStackNavigator();

const DispatcherStack = () => {
  return (
    <Stack.Navigator>

        <Stack.Screen name="Dispatcher" component={Dispatcher} options={{ headerShown: true, title: 'Dispatcher' }} />
        <Stack.Screen name="DispatcherItem" component={DispatcherItem} options={{ headerShown: true, animation: 'slide_from_right',  headerStyle: { backgroundColor: '#fff' }, headerTintColor: 'black', }} />

      </Stack.Navigator>
  )
}

export default DispatcherStack