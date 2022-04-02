import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Transport_form from '../Transport Form/Transport_form';

const Stack = createNativeStackNavigator();

const TransportFormStack = () => {
  return (
    <Stack.Navigator>

        <Stack.Screen name="Transport form" component={Transport_form} options={{ headerShown: false, }} />
        {/* <Stack.Screen name="Item_list1" component={Item_list1} options={{ headerShown: true, animation: 'slide_from_right', title: 'Item List', headerStyle: { backgroundColor: '#ffae42' }, headerTintColor: 'white', }} /> */}
        {/* <Stack.Screen name="Item_table1" component={Item_table1} options={{ headerShown: true, animation: 'slide_from_right', title: 'Item List', headerStyle: { backgroundColor: '#ffae42' }, headerTintColor: 'white', }} /> */}

      </Stack.Navigator>
  )
}

export default TransportFormStack

const styles = StyleSheet.create({})