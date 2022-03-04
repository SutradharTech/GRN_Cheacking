import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Transport from '../Transport/Transport'

const Stack = createNativeStackNavigator();

const TransportStack = () => {
  return (
    <Stack.Navigator>

        <Stack.Screen name="Transport" component={Transport} options={{ headerShown: false, }} />
        {/* <Stack.Screen name="Item_list1" component={Item_list1} options={{ headerShown: true, animation: 'slide_from_right', title: 'Item List', headerStyle: { backgroundColor: '#ffae42' }, headerTintColor: 'white', }} /> */}
        {/* <Stack.Screen name="Item_table1" component={Item_table1} options={{ headerShown: true, animation: 'slide_from_right', title: 'Item List', headerStyle: { backgroundColor: '#ffae42' }, headerTintColor: 'white', }} /> */}

      </Stack.Navigator>
  )
}

export default TransportStack

const styles = StyleSheet.create({})