// Item List Page

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-shadow-cards';
import { Divider, Provider } from 'react-native-paper';
import axios from 'axios';
import AppConstants from '../AppConstant';
import ItemSearchField1 from './ItemSearchField1';

import { Picker } from '@react-native-community/picker';

import DropDown from 'react-native-paper-dropdown'

const Item_list1 = ({ route, navigation }) => {

    const [list, setlist] = useState([]);
    const [showDropD, setShowDropD] = useState(false)
    const [selectedindex, setselectedindex] = useState()
    const [LocationData, setLocationData] = useState()
    const [Disable, setDisable] = useState(true)
    const [showDropDown, setShowDropDown] = useState(false);
    const [warehouseList, setwarehouseList] = useState([])
    const [selectedWarehouseRecno, setSelectedWarehouseRecno] = useState();

    const { item: i, GrnCall } = route.params;

    useEffect(() => {
        var ab = i.map((item, index) => {

            return { ...item }
        })
        // console.log('ab==>', ab)
        setlist(ab)

        Warehouse_data()
        LocationCall()

    }, [])


    useEffect(() => {

        LocationCall()

    }, [selectedWarehouseRecno])


    console.log('list==>', list)

    async function Warehouse_data() {
        const response = await axios.post(AppConstants.APIurl1 + '/filterwarehouse/', { "domainrecno": 508 })
        console.log('respo==', response.data)

        setwarehouseList(response.data.Message)
    }
    // console.log("warehouseList====>", warehouseList)


    async function LocationCall() {
        const respo = await axios.post(`${AppConstants.APIurl}/filterlocationmaster/`, { "warehouserecno": selectedWarehouseRecno })
        // console.log('respo===', respo.data)
        setLocationData(respo.data.Message)

    }
    console.log('Location===', LocationData)


    async function Postdomainitemlocation(item) {

        console.log('item------------>', item)
        let postData = {
            "itemrecno": item.itemrecno,
            "locationrecno": item.locationcode,
            "domainrecno": 508,                                     // needs to be change 
            "itembatchno": item.itembatchno,
            "qty": item.qty,
            "active": true,                                         // needs to be change
        }

        const respo = await axios.post(`${AppConstants.APIurl}/domainitemlocation/`, { postData })

        console.log('Response----------->', respo.data)

    }

    // Screen_render Return

    const Screen2_render2 = ({ item, index }) => {


        function setitemfun(selectedlocation) {
            // Set Locationcode and Locationname by Selecting in Searchable DropDown
            console.log("get item:", selectedlocation)
            setlist(p => {
                var newdata = p
                newdata[selectedindex].locationdescn = selectedlocation.descn
                newdata[selectedindex].locationcode = selectedlocation.locationCode
                // newdata[selectedindex].warehouse = selectedlocation.warehouserecno

                return [...newdata]
            })
        }

        function addItemfun(setItem) {
            // Add Locationcode and Locationname by Manually in Searchable DropDown
            console.log('ccc==', setItem)
            setDisable(true)
            setlist(m => {
                var updatedata = m
                updatedata[selectedindex].locationdescn = setItem.selectedItem.descn
                updatedata[selectedindex].locationcode = setItem.selectedItem.locationCode

                console.log("updatedata'''''''''''''''", updatedata)

                return [...updatedata]
            })
        };

        function Location(locnCode, locnname) {
            // Concatinate the Locationcode and Locationname
            let ans = locnCode + '-' + locnname;

            return ans
        }

        return (
            <Provider >
                <View style={{ flex: 1, backgroundColor: 'ghostwhite', margin: 5, }}>

                    <ItemSearchField1
                        array={LocationData}
                        setItem={setitemfun}
                        showDropD={showDropD}
                        setShowDropD={setShowDropD}
                        addHandler={addItemfun}
                        Disable={Disable}
                        setDisable={setDisable}

                    />

                    <Card style={styles.Body_Main_Card}>

                        {/* Item Name */}

                        <View style={styles.card_view}>
                            <View style={{ flex: 2, }}>
                                <View style={styles.Text_1}>
                                    <Text style={styles.Heder_Text}>{item.shortdescn}</Text>
                                </View>
                            </View>
                        </View>

                        <Divider />

                        {/* Item details */}

                        <View style={{ flex: 0.6, flexDirection: 'row', }}>
                            <View style={styles.Text_1}>
                                <Text style={{ ...styles.content_text, fontWeight: '500', marginTop: '0%' }}>Qty:</Text>
                            </View>

                            <View style={styles.Text_1}>
                                <Text style={{ ...styles.content_text, color: 'black', fontWeight: '500' }}>{item.qty}</Text>
                            </View>

                            <View style={styles.Text_1}>
                                <Text style={{ ...styles.content_text, fontWeight: '500', marginTop: '0%' }}>Item batch:</Text>
                            </View>

                            <View style={styles.Text_1}>
                                <Text style={{ ...styles.content_text, color: 'black', fontWeight: '500' }}>{item.itembatchno}</Text>
                            </View>
                        </View>

                        {/*  WareHouse DropDown   */}

                        <View style={{ ...styles.card_view, justifyContent: 'space-around' }}>

                            <View style={{ flex: 0.6, flexDirection: 'row' }}>
                                <View style={styles.Text_1}>
                                    <Text style={{ ...styles.content_text, fontWeight: '500', marginTop: '00%' }}>WareHouse:</Text>
                                </View>
                            </View>


                            <View style={{ flex: 0.7 }}>

                                <Picker
                                    selectedValue={item.Warehouse}
                                    
                                    onValueChange={(itemValue) => {

                                        setSelectedWarehouseRecno(itemValue.recno)
                                        console.log('------', selectedWarehouseRecno)
                                        setlist(p => {
                                            var newdata = p
                                            newdata[index].Warehouse = itemValue
                                            console.log("newdata", newdata)

                                            return [...newdata]
                                        })
                                    }
                                    }
                                // mode='dropdown'
                                >
                                    {/* <Picker.Item label={"select warehouse"} value={"564556"} /> */}
                                    <Picker.Item label={"Scientific "} value={"564556"} />
                                    {
                                        warehouseList.map(item => {

                                            return (
                                                <Picker.Item label={item.descn} value={item} />
                                            )
                                        })
                                    }

                                </Picker>

                            </View>
                        </View>

                        {/*  Loaction Search And Add Field */}

                        <View style={{ ...styles.card_view, justifyContent: 'space-around' }}>

                            <View style={{ flex: 0.6, flexDirection: 'row' }}>
                                <View style={styles.Text_1}>
                                    <Text style={styles.Heder_Sub_Text}>Location: </Text>
                                </View>
                                <View style={styles.Text_1}>
                                    <Text style={{ ...styles.Heder_Sub_Text, color: 'black', fontWeight: '500' }}>
                                        {Location(item.locationdescn, item.locationcode)}
                                    </Text>
                                </View>
                            </View>

                            <View style={{ flex: 0.3, }}>
                                <View style={styles.Text_1}>

                                    <TouchableOpacity style={{ backgroundColor: '#ffae42', height: 30, justifyContent: 'center', borderRadius: 5 }}
                                        onPress={() => {

                                            setselectedindex(index)
                                            setShowDropD(!showDropD)
                                            setDisable(true)
                                        }}
                                    >
                                        <Text style={{ textAlign: 'center', fontSize: 18, color: 'ghostwhite' }}>Search</Text>
                                    </TouchableOpacity>

                                </View>
                            </View>

                        </View>

                    </Card >
                </View >
            </Provider>
        )

    }

    return (
        <View style={styles.Main_Body}>

            <View style={styles.Body_Container}>

                <View style={{}}>
                    <Text style={{ ...styles.Heder_Text, fontSize: 18 }}>Items</Text>
                </View>
                <TouchableOpacity
                    style={{ backgroundColor: '#ffae42', width: '30%', height: 35, justifyContent: 'space-around', alignItems: 'center', borderRadius: 5 }}
                    onPress={() => {

                        list.map((item, index) => {
                            Postdomainitemlocation(item)
                        })
                        GrnCall();
                        // navigation.navigate('Item_table1', { list })
                        navigation.navigate('Grn_list1');
                    }}
                >
                    <Text style={{ color: 'white', fontSize: 20 }}>Done</Text>
                </TouchableOpacity>

            </View>

            <Divider />

            <View style={{ flex: 1 }}>

                <FlatList
                    data={list}
                    renderItem={Screen2_render2}
                    keyExtractor={(item, index) => item.shortguid}

                />

            </View>

        </View>
    )
}


export default Item_list1

const styles = StyleSheet.create({
    Main_Body: {
        flex: 1,
        // backgroundColor: '#ffaaff',
        backgroundColor: 'ghostwhite'
    },
    Body_Container: {
        flexDirection: "row",
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 60,
        // padding: 5,
        // margin: 15,
        // backgroundColor: 'white'

    },
    Text_1: {
        flex: 1.2,
        justifyContent: 'center',
        padding: '2%'
        // alignItems: 'center',
        // backgroundColor:'blue'
    },
    Text_2: {
        flex: 0.4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    Text_3: {
        flex: 0.4,
        justifyContent: 'center',
        alignItems: 'center',
    },

    Heder_Text: {
        color: "black",
        fontSize: 15,
        fontWeight: '500',
        // fontFamily: 'monospace'
    },
    Heder_Sub_Text: {
        color: "grey",
        fontSize: 15,
        fontWeight: '700',
        // fontFamily: 'monospace'
    },
    Body_Main_Card: {
        width: '98%',
        height: '100%',
        backgroundColor: 'white',
        borderRadius: 20,
        // margin:5,
        marginHorizontal: 5,

    },
    card_view: {
        flex: 1,
        flexDirection: 'row',
        padding: '2%'
    },
    input: {
        height: 40,
        width: 80,
        backgroundColor: 'greywhite',
        fontSize: 14,
        textAlign: 'right'
        // marginLeft: 90 
    },

})

