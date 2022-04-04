import React, { useEffect, useState,  } from 'react'
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, FlatList, StatusBar, KeyboardAvoidingView, RefreshControl, } from 'react-native'
import { Divider, Searchbar, Provider } from 'react-native-paper'
import { Card } from 'react-native-shadow-cards'
import axios from 'axios'
import ModalDropdown from 'react-native-modal-dropdown';
// import { Picker } from '@react-native-community/picker';
import AppConstants from '../AppConstant'
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Grn_list1 = ({ navigation }) => {

    // API Call

    const [ApiData, setApiData] = useState([])
    const [searchBill, setSearchBill] = React.useState('');
    const [masterDataSource, setMasterDataSource] = useState([])
    const [isPressed, setisPressed] = useState(false)
    const [refreshing, setrefreshing] = useState(false);

    useEffect(() => {
        GrnCall()
    }, [])

    async function GrnCall() {
        
        setrefreshing(true);

        let senddataapi = {
            "domainrecno": 508, 
            "status": 'R'
        }        
        
        // const res = await axios.post('https://dev.sutradhar.tech/bcore/api/v1/racking/', { "domainrecno": 508,"fromdate": 20211001,"today": 15112021 });

        const res = await axios.post(AppConstants.APIurl1 +'/filtergrn/', senddataapi)
        console.log('racking data', res.data)
        setApiData(res.data.Message);
        setMasterDataSource(res.data.Message);

        var add = ApiData.map((item, index) => {
            return { ...item }
        })
        // console.log('add==>', add)

        setrefreshing(false);
    }
    console.log("ApiData", ApiData)

    // Finish Api Api_call

    const searchFilterFunction = (text) => {
        // Search function to search GRN bill number in GRN list
        if (text) {
            const newData = masterDataSource.filter(
                function (item) {
                    const itemDataTitle = (item.billno)
                        ? (item.billno.toUpperCase())
                        : ''.toUpperCase();

                    const textData = text.toUpperCase();
                    return itemDataTitle.indexOf(textData) > -1;
                });

            setApiData(newData);
            setSearchBill(text);
        } else {
            setApiData(masterDataSource);
            setSearchBill(text);
        }
    };

    const Render1 = ({ item, index }) => {

        const showDate = (ab) => {

            let x = ab;
            let y = x.toString();
            let dt = y.slice(6, 8) + '/' + y.slice(4, 6) + '/' + y.slice(0, 4);

            return dt
        }

        function showTime(time) {

            let n = time;
            let m = n.toString();
            let Time = m.slice(0, 2) + ':' + m.slice(2, 4) + ':' + m.slice(4, 6)

            return Time
        }

        return (
           
            <View style={{ padding: '5%', flex: 1, }}>
                <StatusBar backgroundColor='#ffae42' />

                <Card style={styles.card}>

                    <TouchableOpacity onPress={() => navigation.navigate('Item_list1', { item: item.items })}>
                        <View style={styles.rows1}>

                            <View style={{ flex: 3, marginHorizontal: '3%', alignItems: 'center' }}>
                                <Text style={{ ...styles.content_text, fontWeight: '600', color: 'grey' }}>Bill No :</Text>
                                <Text style={{ ...styles.content_text, fontWeight: '500' }}>{item.billno}</Text>
                            </View>
                            <View style={{ flex: 3, marginHorizontal: '3%', alignItems: 'center' }}>
                                <Text style={{ ...styles.content_text, fontWeight: '600', color: 'grey' }}>Bill Date :</Text>
                                <Text style={{ ...styles.content_text, fontWeight: '500' }}>{showDate(item.trdate)}</Text>
                            </View>
                            <View style={{ flex: 3, marginHorizontal: '3%', alignItems: 'center' }}>
                                <Text style={{ ...styles.content_text, fontWeight: '600', color: 'grey' }}>Bill Time :</Text>
                                <Text style={{ ...styles.content_text, fontWeight: '500' }}>{showTime(item.trtime)}</Text>
                            </View>
                        </View>

                        <View style={styles.rows2}>
                            <View style={{ flex: 3, marginHorizontal: '3%', alignItems: 'center' }}>
                                <Text style={{ ...styles.content_text, fontWeight: '600', color: 'grey' }}>Mobile :</Text>
                                <Text style={{ ...styles.content_text, fontWeight: '500' }}>{item.mobile}</Text>
                            </View>
                            <View style={{ flex: 3, marginHorizontal: '2%', alignItems: 'center' }}>
                                <Text style={{ ...styles.content_text, fontWeight: '600', color: 'grey' }}>Amount :</Text>
                                <Text style={{ ...styles.content_text, fontWeight: '500' }}>{item.amount}</Text>
                            </View>
                            <View style={{ flex: 3, marginHorizontal: '3%', alignItems: 'center' }}>
                                <Text style={{ ...styles.content_text, fontWeight: '600', color: 'grey' }}>Status :</Text>
                                <Text style={{ ...styles.content_text, fontWeight: '500' }}>{item.status}</Text>
                            </View>

                        </View>
                    </TouchableOpacity>

                    <Divider style={{ marginHorizontal: '5%' }} />

                    <View style={{ marginHorizontal: '5%', flexDirection: 'row', }}>

                        
                        {/* <View style={{ flex: 0.7, marginBottom: '2%', marginLeft: '2%', }}> */}

                            {/* <Picker
                                selectedValue={item.Warehouse}
                                onValueChange={(itemValue) => {

                                    setSelectedWarehouse(itemValue.recno)
                                    console.log('------', selectedWarehouse)
                                    setApiData(p => {
                                        var newdata = p
                                        newdata[index].Warehouse = itemValue
                                        console.log("newdata", newdata)

                                        return [...newdata]
                                    })
                                }
                                } */}
                            {/* // mode='dropdown' */}
                            {/* > */}
                            {/* <Picker.Item label={"select warehouse"} value={"564556"} /> */}
                            {/* 
                                {
                                    warehouse.map(item => {

                                        return (
                                            <Picker.Item label={item.descn} value={item} />
                                        )
                                    })
                                }

                            </Picker> */}

                        {/* </View> */}

                    </View>

                </Card >

            </View >
        );
    }

    return (
        <KeyboardAvoidingView style={styles.main} behavior='height' enabled={false}>

            {/* {
                isPressed ? (
                    <View style={styles.Search_header_view}>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', flex: 1, backgroundColor: '#ffae42' }}>

                            <FontAwesome5 name={'warehouse'} size={23} color={'black'} style={{ marginTop: 15 }} />

                            <Text style={{ ...styles.header, color: 'black', fontSize: 24 }}>Material Racking</Text>

                            <TouchableOpacity onPress={() => setisPressed(!isPressed)} >
                                <EvilIcons name={'search'} size={33} color={'black'} style={{ marginTop: 15 }} />
                            </TouchableOpacity>

                        </View>

                        <View style={styles.header_subView}>
                            <Text style={{ textAlign: 'left', fontSize: 20, fontWeight: '500', color: 'white', marginTop: '4%', alignSelf: 'baseline', }}>GRN List</Text>

                            <Searchbar
                                placeholder="Search"
                                onChangeText={(text) => searchFilterFunction(text)}
                                value={searchBill}
                                style={styles.search_bar}
                                selectionColor={'orange'}
                                keyboardType='number-pad'

                            />
                        </View>


                    </View>
                ) : (
                    <View style={styles.header_view}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>

                            <FontAwesome5 name={'warehouse'} size={23} color={'black'} style={{ marginTop: 15 }} />
                            <Text style={styles.header}>Material Racking</Text>

                            <TouchableOpacity onPress={() => setisPressed(!isPressed)} >
                                <EvilIcons name={'search'} size={33} color={'black'} style={{ marginTop: 15 }} />
                            </TouchableOpacity>

                        </View>
                    </View>
                )
            } */}
            <View style={{ flex: 1.3, borderTopLeftRadius: 50, borderTopRightRadius: 50, }}>

                <FlatList
                    data={ApiData}
                    renderItem={Render1}
                    keyExtractor={(item, index) => item.shortguid}
                    refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={GrnCall} /> }
                // style={{ borderBottomRightRadius: 10, borderBottomLeftRadius: 800,borderTopLeftRadius: 800, borderTopStartRadius: 200,backgroundColor: 'orange' }}
                />
            </View>

        </KeyboardAvoidingView>
    )
}

export default Grn_list1

const styles = StyleSheet.create({
    main: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'ghostwhite',

    },
    Search_header_view: {
        flex: 0.29,
        // justifyContent: 'flex-end',
        // backgroundColor: 'red',
        width: '100%',
        borderBottomColor: '#ffae42',
        borderBottomEndRadius: 30,
        borderBottomStartRadius: 30,
        // backgroundColor: '#ffae42'
    },
    header_view: {
        flex: 0.12,
        // justifyContent: 'flex-end',
        backgroundColor: 'white',
        width: '100%',
        borderBottomColor: '#ffae42',
        borderBottomWidth: 1,
        // borderBottomEndRadius: 30,
        // borderBottomStartRadius: 30,
        // backgroundColor: 'red'
    },
    header: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 15,
        fontFamily: 'sans-serif-light'

    },
    card: {
        flex: 0.3,
        // alignSelf: 'center',
        // height:'64%',
        borderRadius: 20,

    },
    content_text: {
        fontSize: 15,
        color: 'black',
        // marginLeft: '10%'
    },
    card_text: {
        // backgroundColor:'blue',
        flex: 1,
        alignItems: 'center',
    },
    rows: {
        flexDirection: "row",
        flex: 0,
        justifyContent: 'space-evenly',
        // backgroundColor: 'red',
        marginTop: '5%',

    },
    Touch_op: {
        justifyContent: 'center',
        alignItems: 'center',
        // marginHorizontal: 40,
        backgroundColor: 'darkorange',
        height: 30,
        width: '100%',
        borderRadius: 20
    },
    Save_op: {
        color: 'white',
        textAlign: 'center',
        fontSize: 15,
        fontFamily: 'monospace',
    },

    card: {
        flex: 0.3,
        borderRadius: 20,

    },
    content_text: {
        fontSize: 15,
        color: 'black',
        marginLeft: '2%',
        marginVertical: '1%'
    },
    card_text: {
        flex: 1,
        alignItems: 'center',
    },
    rows1: {
        flexDirection: "row",
        flex: 0.3,
        justifyContent: 'space-evenly',
        marginVertical: '2%',

    },
    rows2: {
        flexDirection: "row",
        flex: 0.3,
        justifyContent: 'space-evenly',
        marginVertical: '2%',

    },
    modal_dropdown: {
        borderBottomWidth: 0.3,
        borderColor: 'black',
        height: 30,
        justifyContent: 'center',
        paddingLeft: '2%'
    },
    header_subView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        // marginTop: '5%',
        backgroundColor: '#ffae42',
        flex: 0.8,
        // borderTopRightRadius: 20,
        // borderTopLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        // backgroundColor: 'red'
    },
    search_bar: {
        width: '65%',
        height: 40,
        borderRadius: 12,
        marginTop: '4%',
        // borderColor: 'grey',
        // borderWidth: 0.3
    }


})
