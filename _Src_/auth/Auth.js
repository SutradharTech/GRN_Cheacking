import { View, Text, Button } from 'react-native'
import React, { createContext } from 'react';
import { useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Grn_AcceptStack from '../navigation/Grn_AcceptStack';
import Grn_RackingStack from '../navigation/Grn_RackingStack';
import Grn_MakerStack from '../navigation/Grn_MakerStack';
import Grn_CheckerStack from '../navigation/Grn_CheckerStack';
import Grn_PackerStack from '../navigation/Grn_PackerStack';
import TransportStack from '../navigation/TransportStack';

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

function Grn_Checker({navigation}) {
  return (
    <Grn_CheckerStack />
  )
}

function Grn_Packer({navigation}) {
  return (
    <Grn_PackerStack />
  )
}

function Transportfun({navigation}) {
  return (
    <TransportStack />
  )
}

const Drawer = createDrawerNavigator();

const Auth = () => {

  const [isLogin, setisLogin] = useState(false)
  return (

    <GRN.Provider value={{isLogin: isLogin, setisLogin: setisLogin }} >
      <NavigationContainer >
        <Drawer.Navigator initialRouteName="GRN_Accept">
          
          <Drawer.Screen name="GRN Accept" component={GRN_Accept} />
          <Drawer.Screen name="Grn Racking" component={Grn_Racking} />
          <Drawer.Screen name="Maker" component={GRN_Maker} />
          <Drawer.Screen name="Checker" component={Grn_Checker} />
          <Drawer.Screen name="Packer" component={Grn_Packer} />
          <Drawer.Screen name="Transport" component={Transportfun} />

        </Drawer.Navigator>
      </NavigationContainer>
    </GRN.Provider>
  )
}

export default Auth