import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RevertedList from '../Dispatcher/Dispatcher Reverted/RevertedList';
import RevertedItems from '../Dispatcher/Dispatcher Reverted/RevertedItems';


const Stack = createNativeStackNavigator();

const DispatcherRevertedStack = () => {
  return (
    <Stack.Navigator>

        <Stack.Screen name="RevertedList" component={RevertedList} options={{ headerShown: true, title: 'Dispatcher Reverted' }} />
        <Stack.Screen name="RevertedItems" component={RevertedItems} options={{ headerShown: true, animation: 'slide_from_right',  headerStyle: { backgroundColor: '#fff' }, headerTintColor: 'black', }} />

      </Stack.Navigator>
  )
}

export default DispatcherRevertedStack