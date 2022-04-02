import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Receive from '../Customer/Receive';
import Check from '../Customer/Check';

const Tab = createBottomTabNavigator();

const CustomerStack = () => {
  return (
    <Tab.Navigator initialRouteName='Receive'>

      {/* Receive Tab */}
      <Tab.Screen name="Receive" component={Receive}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell" color={color} size={size} />
          ),
        }} />

        {/* Check Tab */}
      <Tab.Screen name="Check" component={Check}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="check" color={color} size={size} />
          ),
        }} />

    </Tab.Navigator>
  )
}

export default CustomerStack