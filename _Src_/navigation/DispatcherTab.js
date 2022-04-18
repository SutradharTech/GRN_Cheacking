import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import DispatcherStack from './DispatcherStack';
import DispatcherRevertedStack from './DispatcherRevertedStack';


const Tab = createBottomTabNavigator();

const DispatcherTab = () => {
    return (
        <Tab.Navigator initialRouteName='MakerStack'>

            {/* Maker bills */}
            <Tab.Screen name="Dispatcher Bill" component={DispatcherStack}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="bell" color={color} size={size} />
                    ),
                }} />

            {/* DispatcherRevertedStack stack */}
            <Tab.Screen name="Reverted List" component={DispatcherRevertedStack}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="check" color={color} size={size} />
                    ),
                }} />

        </Tab.Navigator>
    )
}

export default DispatcherTab