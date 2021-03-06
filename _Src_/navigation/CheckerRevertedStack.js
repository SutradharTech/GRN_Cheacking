import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MakerResendBill from '../Grn_Checker/Reverted list/MakerResendBill';
import ResendItems from '../Grn_Checker/Reverted list/ResendItems';

const Stack = createNativeStackNavigator();

const ChckerRevertedStack = () => {
  return (
    <Stack.Navigator>

        <Stack.Screen name="MakerResendBill" component={MakerResendBill} options={{ headerShown: false, }} />
        <Stack.Screen name="ResendItems" component={ResendItems} options={{ headerShown: false, animation: 'slide_from_right', title: 'Item List', headerStyle: { backgroundColor: '#ffae42' }, headerTintColor: 'white', }} />

      </Stack.Navigator>
  )
}

export default ChckerRevertedStack