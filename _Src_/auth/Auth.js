import { View, Text, Button, } from 'react-native'
import React, { createContext, useContext } from 'react';
import { useState, useReducer, useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Grn_CheckingStack from '../navigation/Grn_CheckingStack';
import Grn_RackingStack from '../navigation/Grn_RackingStack';
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
import PackerStack from '../navigation/PackerStack';
import CheckerStack from '../navigation/CheckerStack';
import CheckerTab from '../navigation/CheckerTab';
import PackerTab from '../navigation/PackerTab';
import DispatcherTab from '../navigation/DispatcherTab';
import Login from '../login/Login';
import axios from 'axios';
import AppConstants from '../AppConstant';

export const Authcontext = createContext();

// GRN Accept
function Accept_Grn({ navigation }) {

  return (
    <Grn_accept />
  )
}

// GRN Check
function GRN_Check({ navigation }) {
  return (
    <Grn_CheckingStack />
  );
}

// GRN Rack
function Grn_Racking({ navigation }) {
  return (
    <Grn_RackingStack />
  );
}

// Maker
function MakerFun({ navigation }) {
  return (
    <MakerTab />
  );
}

// Checker
function CheckerFun({ navigation }) {
  return (
    <CheckerTab />
  )
}

// Packer
function PackerFun({ navigation }) {
  return (
    <PackerTab />
  )
}

// Dispatcher
function Dispatcherfun() {
  alert("funcall")
  return (
    <DispatcherTab />
  )
}

// Transport
function Transportfun({ navigation }) {
  return (
    <TransportStack />
  )
}

// Transport Form X
function TransportFormfun({ navigation }) {
  return (
    <TransportFormStack />
  )
}

// Customer X
function CustomerFun({ navigation }) {

  return (
    <CustomerStack />
  )
}


const Drawer = createDrawerNavigator();

function reducer(state, action) {
  let newState;
  switch (action.type) {

    case 'LOGINTYPE':

      return { ...state, userdata: action.userdata }
      break;

    default:
      throw new Error();
  }
  return newState;
}
const initialState = {
  counter: 0,
  userdata: null
};

const Auth = ({ navigation }) => {


  const [loginRes, setloginRes] = useState();
  const [isLogin, setisLogin] = useState(false)
  const [state, dispatch] = useReducer(reducer, initialState);

  // useEffect(() => {

  //   loginRes?.role[0] ? (dispatch(action)) : null

  // }, [loginRes])





  return (
    <>

      <Authcontext.Provider value={{ state: state, dispatch: dispatch }} >
        <NavigationContainer >


          {!state.userdata ? (

            <Login />

          ) : null}




          {state.userdata?.role.length > 1 ? (


            <>






            </>





          ) : (
            <>

              {state.userdata?.role[0] == "Maker" ? (

                <MakerTab />

              ) : null}


              {state.userdata?.role[0] == "Checker" ? (

                <CheckerTab />

              ) : null}


              {state.userdata?.role[0] == "Packer" ? (

                <PackerTab />

              ) : null}

              {state.userdata?.role[0] == "Dispatcher" ? (

                <DispatcherTab />

              ) : null}



            </>


          )}

















        </NavigationContainer>

      </Authcontext.Provider>
    </>

    // <NavigationContainer >

    //   <Drawer.Navigator
    //     initialRouteName="GRN_Accept"
    //     screenOptions={{
    //       drawerActiveTintColor: 'orange',
    //     }}

    //   >

    //     {/*  Accept Grn  */}
    //     <Drawer.Screen name="Accept Grn" component={Accept_Grn}
    //       options={{
    //         headerShown: true,
    //         drawerIcon: ({ focused, size }) => (
    //           <FontAwesome
    //             name="user-md"
    //             size={size}
    //             color={focused ? '#7cc' : '#ccc'}
    //           />
    //         ),
    //       }} />

    //     {/* Check GRN */}
    //     <Drawer.Screen name="GRN Check" component={GRN_Check}
    //       options={{
    //         headerShown: true,
    //         drawerIcon: ({ focused, size }) => (
    //           <FontAwesome
    //             name="user-md"
    //             size={size}
    //             color={focused ? '#7cc' : '#ccc'}
    //           />
    //         ),
    //       }} />

    //     {/*  Racking  */}
    //     <Drawer.Screen name="Grn Racking" component={Grn_Racking}
    //       options={{
    //         headerShown: true,
    //         drawerIcon: ({ focused, size }) => (
    //           <MaterialIcons
    //             name="emoji-transportation"
    //             size={size}
    //             color={focused ? '#7cc' : '#ccc'}
    //           />
    //         ),
    //       }}
    //     />

    //     {/*  Maker  */}
    //     <Drawer.Screen name="Maker" component={MakerFun}
    //       options={{
    //         headerShown: true,
    //         drawerIcon: ({ focused, size }) => (
    //           <MaterialIcons
    //             name="emoji-transportation"
    //             size={size}
    //             color={focused ? '#7cc' : '#ccc'}
    //           />
    //         ),
    //       }}
    //     />

    //     {/* Checker */}
    //     <Drawer.Screen name="Checker" component={CheckerFun}
    //       options={{
    //         headerShown: true,
    //         drawerIcon: ({ focused, size }) => (
    //           <MaterialIcons
    //             name="emoji-transportation"
    //             size={size}
    //             color={focused ? '#7cc' : '#ccc'}
    //           />
    //         ),
    //       }}
    //     />

    //       {/* Checker 
    //     // <Drawer.Screen name="Checker" component={CheckerFun}
    //     //   options={{
    //     //     drawerIcon: ({ focused, size }) => (
    //     //       <MaterialIcons
    //     //         name="fact-check"
    //     //         size={size}
    //     //         color={focused ? '#7cc' : '#ccc'}
    //     //       />
    //     //     ),
    //     //   }}
    //     // /> */}

    //     {/*  Packer  */}
    //      <Drawer.Screen name="Packer" component={PackerFun}
    //       options={{
    //         drawerIcon: ({ focused, size }) => (
    //           <Feather
    //             name="package"
    //             size={size}
    //             color={focused ? '#7cc' : '#ccc'}
    //           />
    //         ),
    //       }}
    //     />

    //     {/*  Dispatcher  */}
    //     <Drawer.Screen name="Dispatcher" component={Dispatcherfun}
    //       options={{
    //         drawerIcon: ({ focused, size }) => (
    //           <Feather
    //             name="package"
    //             size={size}
    //             color={focused ? '#7cc' : '#ccc'}
    //           />
    //         ),
    //       }}
    //     />

    //     {/*  Transport  */}
    //     <Drawer.Screen name="Transport" component={Transportfun}
    //       options={{
    //         drawerIcon: ({ focused, size }) => (
    //           <MaterialCommunityIcons
    //             name="truck-fast-outline"
    //             size={size}
    //             color={focused ? '#7cc' : '#ccc'}
    //           />
    //         ),
    //         // headerShown: false,
    //       }}
    //     />

    //     {/*  Customer  */}
    //     <Drawer.Screen name="Customer" component={CustomerFun}
    //       options={{
    //         drawerIcon: ({ focused, size }) => (
    //           <FontAwesome5
    //             name="user-nurse"
    //             size={size}
    //             color={focused ? '#7cc' : '#ccc'}
    //           />
    //         ),
    //         headerStyle: { backgroundColor: 'orange' },
    //         headerTintColor: 'white',
    //         headerTitleAlign: 'center',
    //       }}

    //     />

    //     {/*  Transport Form  */}
    //     <Drawer.Screen name="Transport Form" component={TransportFormfun}
    //       options={{
    //         drawerIcon: ({ focused, size }) => (
    //           <MaterialCommunityIcons
    //             name="truck-fast-outline"
    //             size={size}
    //             color={focused ? '#7cc' : '#ccc'}
    //           />
    //         ),
    //       }}
    //     />

    //   </Drawer.Navigator>
    // </NavigationContainer>
    // </GRN.Provider>

  )
}

export default Auth