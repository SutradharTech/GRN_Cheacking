import { View, Text,Button } from 'react-native'
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Grn_AcceptStack from '../navigation/Grn_AcceptStack';
import Grn_RackingStack from '../navigation/Grn_RackingStack';



function GRN_Accept({ navigation }) {
    return (
        <Grn_AcceptStack />
    );
  }
  
  // function Grn_Racking({ navigation }) {
  //   return (
  //     <Grn_RackingStack />
  //   );
  // }
  
  const Drawer = createDrawerNavigator();

const Auth = () => {
  return (


    <NavigationContainer>
    <Drawer.Navigator initialRouteName="GRN_Accept">
      <Drawer.Screen name="GRN Accept" component={GRN_Accept} />

      {/* <Drawer.Screen name="Grn Racking" component={Grn_Racking} /> */}
    </Drawer.Navigator>
  </NavigationContainer>
  )
}

export default Auth