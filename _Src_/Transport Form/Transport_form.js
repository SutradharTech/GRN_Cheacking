import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react';
// import TransportDropdown from './DropdownCompo/TransportDropdown';
// import SupplierDropdown from './DropdownCompo/SupplierDropdown';
import { Card, Divider, TextInput } from 'react-native-paper';
import { Picker } from '@react-native-community/picker';
import {AppConstants} from '../AppConstant';
import moment from 'moment';
import AppFunction from '../AppFunction';

const Transport_form = () => {

    const [SelectedBox, setSelectedBox] = useState([]);

    var TransportList = [
        { name: 'A', value: 1 },
        { name: 'B', value: 2 },
        { name: 'C', value: 3 },
        { name: 'D', value: 4 },
        { name: 'E', value: 5 },
    ];

    var SupplierList = [
        { name: 'F', value: 10 },
        { name: 'G', value: 20 },
        { name: 'H', value: 30 },
        { name: 'I', value: 40 },
        { name: 'J', value: 50 },
    ];

    var packingTypeList = [
        { name: 'Box', value: 0 },
        { name: 'Carton', value: 1 },
        { name: 'Strips', value: 2 },
        { name: 'Bags', value: 3 },
        // { name: '', value: 2 },
        // { name: 'Shrink', value: 2 },
    ]

    return (
        <KeyboardAvoidingView style={{ flex: 1,}} >
            <Text style={{ fontSize: 20, fontWeight: '700', alignSelf: 'center', marginVertical: '4%' }}>Transport Receipt</Text>

            <View style={{ justifyContent: 'space-between', flex: 1,}} >

                <View style={{ flexDirection: 'row', backgroundColor: 'grey', justifyContent: 'space-around', }}>
                    <Text style={{ color: 'white', fontSize: 15 }}>Time : {AppFunction.getTime().dispTime} </Text>
                    <Text style={{ color: 'white', fontSize: 15 }}>Date : {AppFunction.getToday().dispDate}</Text>
                </View>

                {/* Import Supplier and Transport Dropdown */}
                {/* <View style={{ flexDirection: 'row', }}>
                    <TransportDropdown TransportList={TransportList} />
                    <SupplierDropdown SupplierList={SupplierList} />
                </View> */}

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                    <Text style={{ fontSize: 16 }}>Bill No : </Text>
                    <TextInput
                        style={{ height: 35, width: '70%' }}
                        theme={{
                            colors: {
                                primary: 'orange'
                            }
                        }}
                        keyboardType='numeric'
                    />
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>

                    <Text style={{ fontSize: 16 }}>Receipt No : </Text>
                    <TextInput
                        style={{ height: 35, width: '43%' }}
                        theme={{
                            colors: {
                                primary: 'orange'
                            }
                        }}
                        keyboardType='numeric'
                    />
                </View>

                {/* Pack type Dropdown and Qty */}
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', }}>

                    <View style={{ flex: 0.2, }}>
                        <Text style={{ fontSize: 16, textAlign: 'right', color: 'black' }}>No of </Text>
                    </View>

                    <View style={{ flex: 0.55 }}>

                        <Picker
                            selectedValue={SelectedBox}
                            style={{ width: '100%' }}
                            onValueChange={(packTypeValue) => {

                                setSelectedBox(packTypeValue.name)
                                // console.log('------>',SelectedWarehouse.value)
                                // setApiData(p => {
                                //     var newdata = p
                                //     newdata[index].Warehouse = itemValue
                                //     console.log("newdata", newdata)

                                //     return [...newdata]
                                // })
                            }
                            }
                        // mode='dropdown' 
                        >
                            <Picker.Item label={"package Type"} value={"564556"} />

                            {
                                packingTypeList.map(type => {

                                    return (
                                        <Picker.Item label={type.name} value={type} />
                                    )
                                })
                            }

                        </Picker>
                    </View>
                    <View style={{ flex: 0.3, alignItems: 'center' }}>
                        <TextInput
                            style={{ height: 35, width: '80%', }}
                            theme={{
                                colors: {
                                    primary: 'orange'
                                }
                            }}
                            keyboardType='numeric'
                        />
                    </View>
                </View>

                <View style={styles.rows1}>

                    <Card style={{ flex: 1, marginHorizontal: '3%', alignItems: 'center',borderRadius: 15}}>
                        <View style={{justifyContent: 'space-evenly', alignItems: 'center',flex: 1}}>
                            <Text style={{ ...styles.content_text, fontWeight: '600', color: 'grey' }}>Receipt Date</Text>
                            <Text style={{ ...styles.content_text, fontWeight: '500' }}>12/10/2020</Text>
                        </View>
                    </Card>

                    <Card style={{ flex: 1, marginHorizontal: '3%', alignItems: 'center',borderRadius: 15 }}>
                        <View style={{justifyContent: 'space-evenly', alignItems: 'center',flex: 1}}>
                            <Text style={{ ...styles.content_text, fontWeight: '600', color: 'grey' }}>Receive Date</Text>
                            <Text style={{ ...styles.content_text, fontWeight: '500' }}>12/10/2020</Text>
                        </View>
                    </Card>

                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                    <Text style={{ fontSize: 15 }} >Receipt Amount :</Text>
                    <TextInput
                        style={{ height: 35, width: '40%', }}
                        theme={{
                            colors: {
                                primary: 'orange'
                            }
                        }}
                        keyboardType='numeric'
                    />
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                    <Text style={{ fontSize: 15 }} >Other Expences :</Text>
                    <TextInput
                        style={{ height: 35, width: '40%', }}
                        theme={{
                            colors: {
                                primary: 'orange'
                            }
                        }}
                        keyboardType='numeric'
                    />
                </View>

                <Divider />

                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '5%' }}>
                    <Text style={{ fontSize: 17, marginRight: '5%', fontWeight: '600' }}>Total :</Text>

                    <Text style={{ fontSize: 16, marginRight: '15%' }}>3000</Text>
                </View>

            </View>

        </KeyboardAvoidingView>
    )
}

export default Transport_form

const styles = StyleSheet.create({

    rows1: {
        flexDirection: "row",
        flex: 0.3,
        justifyContent: 'space-evenly',
        marginVertical: '2%',

    },
    content_text: {
        fontSize: 15,
        color: 'black',
        marginLeft: '2%',
        marginVertical: '1%'
    },
    TextInputStyle: {
        backgroundColor: 'ghostwhite'
    }

})