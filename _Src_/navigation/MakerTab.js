import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MakerStack from './MakerStack';
import MakerRevertStack from './MakerRevertStack'

const Tab = createBottomTabNavigator();

const MakerTab = () => {
    return (
        <Tab.Navigator initialRouteName='MakerStack'>

            {/* Maker bills */}
            <Tab.Screen name="Maker Bill" component={MakerStack}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="bell" color={color} size={size} />
                    ),
                }} />

            {/* Check Tab */}
            <Tab.Screen name="Reverted List" component={MakerRevertStack}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="check" color={color} size={size} />
                    ),
                }} />

        </Tab.Navigator>
    )
}

export default MakerTab