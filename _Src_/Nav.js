import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Grn_list from './Grn_list'
import Item_list from './Item_list';


const Stack = createNativeStackNavigator();

const Nav = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name="Grn_list" component={Grn_list} options={{ headerShown: false, }} />
        <Stack.Screen name="Item_list" component={Item_list} options={{ headerShown: true, animation: 'slide_from_right', title: 'Item List', headerStyle: { backgroundColor: '#ffae42' }, headerTintColor: 'white', }} />

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Nav
