import React, { useState, useContext } from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Pressable } from 'react-native'
import { TextInput, Divider, } from 'react-native-paper'
import { Card } from 'react-native-shadow-cards';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios'
// import { GRN } from '../Nav';
// import { useAuth } from '../frameWork/Auth/Auth';
// import AppFunctions from '../AppFunctions';
// import AppConstants from '../AppConstants';
// import { useTogglePasswordVisibility } from './entities/useTogglePasswordVisibility';
// Code Start From Here --->
const Login = ({ navigation }) => {

    const { isLogin, setisLogin } = useContext(GRN)

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    // Login Api Call -->
    async function submithandler() {
        setisLogin(true);
        console.log("_______________", isLogin)
    }
    return (
        <View style={styles.main}>
            <Card style={styles.card}>
                <Text style={styles.Text_Title}>Login</Text>
                <Divider height={5} width="100%" />
                {/* Text Inpute */}
                <ScrollView>
                    <View style={styles.textInput_view}>
                        <TextInput
                            maxLength={10}
                            mode='flat'
                            style={styles.Inputtext}
                            placeholder='Mobile Number'
                            keyboardType='numeric'
                            theme={{
                                colors: {
                                    primary: 'dodgerblue' // Outline color here
                                }
                            }}
                            onChangeText={(userName) => setUserName(userName)}
                            right={<TextInput.Icon name="account" color='orange' />}
                        />
                    </View>
                    <View style={{ flex: 1, marginVertical: '5%', flexDirection: "row" }}>
                        <View style={{ flex: 1, justifyContent: 'center', width: '100%' }}>
                            <TextInput
                                mode='flat'
                                style={styles.Inputtext}
                                placeholder='Enter password'
                                // secureTextEntry={passwordVisibility}
                                value={password}
                                enablesReturnKeyAutomatically
                                autoCapitalize='none'
                                autoCorrect={false}
                                theme={{
                                    colors: {
                                        primary: 'dodgerblue' // Outline color here
                                    }
                                }}
                                onChangeText={(password) => setPassword(password)}
                            />
                        </View>
                        <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
                            <Pressable >
                                <MaterialCommunityIcons size={25} color='dodgerblue' />
                            </Pressable>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('ChangePassWord')}>
                        <Text style={{ color: 'orange', textAlign: 'right', marginTop: '3%' }}>Forgotten Password?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button_view}
                        onPress={() => navigation.navigate('Grn_list')}>
                        <View style={styles.button} >
                            <Text style={styles.Button_Text}>Log in</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ flex: 1, height: 1, backgroundColor: 'orange' }} />
                        <View>
                            <Text style={{ width: 50, textAlign: 'center' }}>or</Text>
                        </View>
                        <View style={{ flex: 1, height: 1, backgroundColor: 'orange' }} />
                    </View>
                    {/* Don't have an account? & Sign up - Button */}
                    <View style={{ marginVertical: 30, alignItems: 'center', flexDirection: 'row' }}>
                        <View style={{ flex: 0.8, }}>
                            <Text style={{ fontSize: 16, color: 'grey', textAlign: 'right' }}>Don't have an account?</Text>
                        </View>
                        {/* <View style={{ flex: 0.4, }}>
                            <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
                                <Text style={{ fontSize: 17, color: 'dodgerblue', marginLeft: 10 }}>Sign up</Text>
                            </TouchableOpacity>
                        </View> */}
                    </View>
                </ScrollView>
            </Card>
        </View>
    )
}
export default Login;
// Style Css --->
const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EEEEEE',
    },
    card: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    Text_Title: {
        fontSize: 25,
        marginTop: 10,
        marginBottom: 10
    },
    textInput_view: {
        marginTop: "10%",
    },
    Inputtext: {
        height: 40,
        backgroundColor: 'white'
    },
    button_view: {
        flex: 1,
        marginVertical: 35,
        alignItems: 'center',
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 40,
        backgroundColor: 'orange',
        height: 45,
        width: '100%',
        borderRadius: 5,
        flexDirection: 'row',
    },
    Button_Text: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
        textAlign: 'center'
    },
})