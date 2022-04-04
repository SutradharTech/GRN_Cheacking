import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Grn_list from '../GRN_Check/Grn_list';
import Item_list from '../GRN_Check/Item_list';

const Stack = createNativeStackNavigator();

const Grn_CheckingStack = () => {
  return (
    <Stack.Navigator>

      {/* <Stack.Screen name="Login" component={Login} options={{ headerShown: false, }} /> */}
      <Stack.Screen name="Grn_list" component={Grn_list} options={{ headerShown: false, title: 'GRN Checking' }} />
      <Stack.Screen name="Item_list" component={Item_list} options={{ headerShown: false, animation: 'slide_from_right', title: 'Item List', headerStyle: { backgroundColor: '#ffae42' }, headerTintColor: 'white', }} />

    </Stack.Navigator>
  )
}

export default Grn_CheckingStack