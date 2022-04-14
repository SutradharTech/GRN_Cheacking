import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import CheckerStack from './CheckerStack';
import MakerResendBill from '../Grn_Checker/Reverted list/MakerResendBill';
import ChckerRevertedStack from './CheckerRevertedStack';

const Tab = createBottomTabNavigator();

const CheckerTab = () => {
    return (
        <Tab.Navigator initialRouteName='CheckerStack'>

            {/* Checker bills */}
            <Tab.Screen name="Checker Bill" component={CheckerStack}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="bell" color={color} size={size} />
                    ),
                }} />

            {/* CheckerReverted bills Tab */}
            <Tab.Screen name="Checker Reverted List" component={ChckerRevertedStack}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="check" color={color} size={size} />
                    ),
                }} />

        </Tab.Navigator>
    )
}

export default CheckerTab