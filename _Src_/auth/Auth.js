import { View, Text, Button } from 'react-native'
import React, { createContext } from 'react';
import { useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Grn_CheckingStack from '../navigation/Grn_CheckingStack';
import Grn_RackingStack from '../navigation/Grn_RackingStack';
import Grn_MakerStack from '../navigation/MakerStack';
import Grn_CheckerStack from '../navigation/CheckerStack';
import Grn_PackerStack from '../navigation/Grn_PackerStack';
import DispatcherStack from '../navigation/DispatcherStack';
import TransportStack from '../navigation/TransportStack';
import TransportFormStack from '../navigation/TransportFormStack';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CustomerStack from '../navigation/CustomerStack';
import MakerTab from '../navigation/MakerTab';
import Grn_accept from '../Accept_Grn/Grn_accept';
import PackerStack from '../navigation/Grn_PackerStack';

export const GRN = createContext();

function Accept_Grn({ navigation }) {
  return (
    <Grn_accept />
  )
}

function GRN_Check({ navigation }) {
  return (
    <Grn_CheckingStack />
  );
}

function Grn_Racking({ navigation }) {
  return (
    <Grn_RackingStack />
  );
}

function MakerFun({ navigation }) {
  return (
    <MakerTab />
  );
}

function CheckerFun({ navigation }) {
  return (
    <CheckerStack />
  )
}

function PackerFun({ navigation }) {
  return (
    <PackerStack />
  )
}

function Dispatcherfun({ navigation }) {
  return (
    <DispatcherStack />
  )
}

function Transportfun({ navigation }) {
  return (
    <TransportStack />
  )
}

function TransportFormfun({ navigation }) {
  return (
    <TransportFormStack />
  )
}

function CustomerFun({ navigation }) {

  return (
    <CustomerStack />
  )
}


const Drawer = createDrawerNavigator();

const Auth = () => {

  const [isLogin, setisLogin] = useState(false)
  return (

    <GRN.Provider value={{ isLogin: isLogin, setisLogin: setisLogin }} >
      <NavigationContainer >
        <Drawer.Navigator
          initialRouteName="GRN_Accept"
          screenOptions={{
            drawerActiveTintColor: 'orange',
          }}

        >

          {/*  Accept Grn  */}
          <Drawer.Screen name="Accept Grn" component={Accept_Grn}
            options={{
              headerShown: false,
              drawerIcon: ({ focused, size }) => (
                <FontAwesome
                  name="user-md"
                  size={size}
                  color={focused ? '#7cc' : '#ccc'}
                />
              ),
            }} />

          {/* Accept GRN */}
          <Drawer.Screen name="GRN Check" component={GRN_Check}
            options={{
              headerShown: false,
              drawerIcon: ({ focused, size }) => (
                <FontAwesome
                  name="user-md"
                  size={size}
                  color={focused ? '#7cc' : '#ccc'}
                />
              ),
            }} />

          {/*  Racking  */}
          <Drawer.Screen name="Grn Racking" component={Grn_Racking}
            options={{
              headerShown: false,
              drawerIcon: ({ focused, size }) => (
                <MaterialIcons
                  name="emoji-transportation"
                  size={size}
                  color={focused ? '#7cc' : '#ccc'}
                />
              ),
            }}
          />

          {/*  Maker  */}
          <Drawer.Screen name="Maker" component={MakerFun}
            options={{
              headerShown: false,
              drawerIcon: ({ focused, size }) => (
                <MaterialIcons
                  name="emoji-transportation"
                  size={size}
                  color={focused ? '#7cc' : '#ccc'}
                />
              ),
            }}
          />

          {/*  Checker  */}
          <Drawer.Screen name="Checker" component={CheckerFun}
            options={{
              drawerIcon: ({ focused, size }) => (
                <MaterialIcons
                  name="fact-check"
                  size={size}
                  color={focused ? '#7cc' : '#ccc'}
                />
              ),
            }}
          />

          {/*  Packer  */}
          <Drawer.Screen name="Packer" component={PackerFun}
            options={{
              drawerIcon: ({ focused, size }) => (
                <Feather
                  name="package"
                  size={size}
                  color={focused ? '#7cc' : '#ccc'}
                />
              ),
            }}
          />

          {/*  Dispatcher  */}
          <Drawer.Screen name="Dispatcher" component={Dispatcherfun}
            options={{
              drawerIcon: ({ focused, size }) => (
                <Feather
                  name="package"
                  size={size}
                  color={focused ? '#7cc' : '#ccc'}
                />
              ),
            }}
          />

          {/*  Transport  */}
          <Drawer.Screen name="Transport" component={Transportfun}
            options={{
              drawerIcon: ({ focused, size }) => (
                <MaterialCommunityIcons
                  name="truck-fast-outline"
                  size={size}
                  color={focused ? '#7cc' : '#ccc'}
                />
              ),
              // headerShown: false,
            }}
          />

          {/*  Customer  */}
          <Drawer.Screen name="Customer" component={CustomerFun}
            options={{
              drawerIcon: ({ focused, size }) => (
                <FontAwesome5
                  name="user-nurse"
                  size={size}
                  color={focused ? '#7cc' : '#ccc'}
                />
              ),
              headerStyle: { backgroundColor: 'orange' },
              headerTintColor: 'white',
              headerTitleAlign: 'center',
            }}

          />

          {/*  Transport Form  */}
          <Drawer.Screen name="Transport Form" component={TransportFormfun}
            options={{
              drawerIcon: ({ focused, size }) => (
                <MaterialCommunityIcons
                  name="truck-fast-outline"
                  size={size}
                  color={focused ? '#7cc' : '#ccc'}
                />
              ),
            }}
          />

        </Drawer.Navigator>
      </NavigationContainer>
    </GRN.Provider>
  )
}

export default Auth