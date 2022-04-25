import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PackerReverted from '../Packer/Packer Reverted lIst/PackerReverted';
import PackerRevertedItems from '../Packer/Packer Reverted lIst/PackerRevertedItems';

const Stack = createNativeStackNavigator();

const PackerRevertStack = () => {
  return (
    <Stack.Navigator>

        <Stack.Screen name="PackerReverted" component={PackerReverted} options={{ headerShown: true, title: 'Packer Reverted' }} />
        <Stack.Screen name="PackerRevertedItems" component={PackerRevertedItems} options={{ headerShown: true, animation: 'slide_from_right', title: 'Item List', headerStyle: { backgroundColor: '#fff' }, headerTintColor: 'black', }} />

      </Stack.Navigator>
  )
}

export default PackerRevertStack