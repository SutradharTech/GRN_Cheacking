import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Maker from '../GRN_Maker/Maker';
import ShowItem from '../GRN_Maker/ShowItem';

const Stack = createNativeStackNavigator();

const Grn_MakerStack = () => {
  return (
    <Stack.Navigator>

        <Stack.Screen name="Maker" component={Maker} options={{ headerShown: false, }} />
        <Stack.Screen name="ShowItem" component={ShowItem} options={{ headerShown: false, animation: 'slide_from_right', title: 'Item List', headerStyle: { backgroundColor: '#ffae42' }, headerTintColor: 'white', }} />

      </Stack.Navigator>
  )
}

export default Grn_MakerStack