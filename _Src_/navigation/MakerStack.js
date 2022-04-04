import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Maker from '../GRN_Maker/Maker Bills/Maker';
import ShowItem from '../GRN_Maker/Maker Bills/ShowItem';

const Stack = createNativeStackNavigator();

const MakerStack = () => {
  return (
    <Stack.Navigator>

        <Stack.Screen name="Maker" component={Maker} options={{ headerShown: false, }} />
        <Stack.Screen name="ShowItem" component={ShowItem} options={{ headerShown: false, animation: 'slide_from_right', title: 'Item List', headerStyle: { backgroundColor: 'white' }, headerTintColor: 'black', }} />

      </Stack.Navigator>
  )
}

export default MakerStack