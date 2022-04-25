import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Checker from '../Grn_Checker/Checker Bill/Checker'
import ItemList from '../Grn_Checker/Checker Bill/ItemList';

const Stack = createNativeStackNavigator();

const CheckerStack = () => {
  return (
    <Stack.Navigator>

        <Stack.Screen name="Checker" component={Checker} options={{ headerShown: true, title: 'Checker' }} />
        <Stack.Screen name="ItemList" component={ItemList} options={{ headerShown: true, animation: 'slide_from_right', title: 'Item List', headerStyle: { backgroundColor: '#fff' }, headerTintColor: 'black', }} />

      </Stack.Navigator>
  )
}

export default CheckerStack