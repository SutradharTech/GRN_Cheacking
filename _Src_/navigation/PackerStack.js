import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PackerList from '../Packer/Packer Bill/PackerList';
import ListItem from '../Packer/Packer Bill/ListItem';


const Stack = createNativeStackNavigator();

const PackerStack = () => {
  return (
    <Stack.Navigator>

        <Stack.Screen name="PackerList" component={PackerList} options={{ headerShown: false, }} />
        <Stack.Screen name="ListItem" component={ListItem} options={{ headerShown: false, animation: 'slide_from_right', title: 'Item List', headerStyle: { backgroundColor: '#ffae42' }, headerTintColor: 'white', }} />

      </Stack.Navigator>
  )
}

export default PackerStack