import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Grn_list1 from '../GRN_Racking/Grn_list1';
import Item_list1 from '../GRN_Racking/Item List1';
import Item_table1 from '../GRN_Racking/Item_table1';

const Stack = createNativeStackNavigator();

const Grn_RackingStack = () => {
  return (
    <Stack.Navigator>

        <Stack.Screen name="Grn_list1" component={Grn_list1} options={{ headerShown: false, }} />
        <Stack.Screen name="Item_list1" component={Item_list1} options={{ headerShown: true, animation: 'slide_from_right', title: 'Item List', headerStyle: { backgroundColor: '#ffae42' }, headerTintColor: 'white', }} />
        <Stack.Screen name="Item_table1" component={Item_table1} options={{ headerShown: true, animation: 'slide_from_right', title: 'Item List', headerStyle: { backgroundColor: '#ffae42' }, headerTintColor: 'white', }} />

      </Stack.Navigator>
  )
}

export default Grn_RackingStack