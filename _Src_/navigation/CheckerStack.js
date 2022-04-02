import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Checker from '../Grn_Checker/Checker';
import ItemList from '../Grn_Checker/ItemList';

const Stack = createNativeStackNavigator();

const CheckerStack = () => {
  return (
    <Stack.Navigator>

        <Stack.Screen name="Checker" component={Checker} options={{ headerShown: false, }} />
        <Stack.Screen name="ItemList" component={ItemList} options={{ headerShown: false, animation: 'slide_from_right', title: 'Item List', headerStyle: { backgroundColor: '#ffae42' }, headerTintColor: 'white', }} />

      </Stack.Navigator>
  )
}

export default CheckerStack