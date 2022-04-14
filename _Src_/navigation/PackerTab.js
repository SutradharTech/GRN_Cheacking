import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import PackerStack from './PackerStack';
import PackerRevertStack from './PackerRevertStack';


const Tab = createBottomTabNavigator();

const PackerTab = () => {
    return (
        <Tab.Navigator initialRouteName='MakerStack'>

            {/* Maker bills */}
            <Tab.Screen name="Packer Bill" component={PackerStack}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="bell" color={color} size={size} />
                    ),
                }} />

            {/* Check Tab */}
            <Tab.Screen name="Reverted List" component={PackerRevertStack}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="check" color={color} size={size} />
                    ),
                }} />

        </Tab.Navigator>
    )
}

export default PackerTab