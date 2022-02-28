import { View, Text, Button } from 'react-native'
import React, { createContext } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Grn_AcceptStack from '../navigation/Grn_AcceptStack';
import Grn_RackingStack from '../navigation/Grn_RackingStack';
import Grn_MakerStack from '../navigation/Grn_MakerStack';
import { useState } from 'react';

export const GRN = createContext();



function GRN_Accept({ navigation }) {
  return (
    <Grn_AcceptStack />
  );
}

function Grn_Racking({ navigation }) {
  return (
    <Grn_RackingStack />
  );
}

function GRN_Maker({ navigation }) {
  return (
    <Grn_MakerStack />
  );
}

const Drawer = createDrawerNavigator();

const Auth = () => {

  const [isLogin, setisLogin] = useState(false)
  return (

    <GRN.Provider value={{isLogin: isLogin, setisLogin: setisLogin }} >
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="GRN_Accept">
          <Drawer.Screen name="GRN Accept" component={GRN_Accept} />

          <Drawer.Screen name="Grn Racking" component={Grn_Racking} />
          <Drawer.Screen name="GRN_Maker" component={GRN_Maker} />

        </Drawer.Navigator>
      </NavigationContainer>
    </GRN.Provider>
  )
}

export default Auth