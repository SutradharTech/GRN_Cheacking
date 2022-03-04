import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Packer from '../Grn_Packer/Packer';
import ListItem from '../Grn_Packer/ListItem';

const Stack = createNativeStackNavigator();

const Grn_CheckerStack = () => {
  return (
    <Stack.Navigator>

        <Stack.Screen name="Packer" component={Packer} options={{ headerShown: false, }} />
        <Stack.Screen name="ListItem" component={ListItem} options={{ headerShown: false, animation: 'slide_from_right', title: 'Item List', headerStyle: { backgroundColor: '#ffae42' }, headerTintColor: 'white', }} />

      </Stack.Navigator>
  )
}

export default Grn_CheckerStack