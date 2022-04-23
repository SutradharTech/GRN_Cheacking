import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RevertedList from '../GRN_Maker/Reverted Bills/RevertedList';
import RevertedItems from '../GRN_Maker/Reverted Bills/RevertedItems';

const Stack = createNativeStackNavigator();

const MakerRevertStack = () => {
  return (
    <Stack.Navigator initialRouteName='RevertedList' >

        <Stack.Screen name="RevertedList" component={RevertedList} options={{ headerShown: true, title: 'Maker Reverted' }} />
        <Stack.Screen name="RevertedItems" component={RevertedItems} options={{ headerShown: true, animation: 'slide_from_right',  headerStyle: { backgroundColor: '#fff' }, headerTintColor: 'black',}} />

      </Stack.Navigator>
  )
}

export default MakerRevertStack