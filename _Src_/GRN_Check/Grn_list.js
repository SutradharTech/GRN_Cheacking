import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList, KeyboardAvoidingView, Pressable, StatusBar, RefreshControl } from 'react-native'
import { Searchbar } from 'react-native-paper'
import { Card } from 'react-native-shadow-cards'
import axios from 'axios'
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import AppConstants from '../AppConstant'

const Grn_list = ({ navigation }) => {

    // API Call

    const [searchBill, setSearchBill] = useState();
    const [ApiData, setApiData] = useState([])
    const [masterDataSource, setMasterDataSource] = useState([])
    const [isPressed, setisPressed] = useState(false)
    const [refreshing, setRefreshing] = React.useState(false);

    useEffect(() => {
        GrnCall()
    }, [])

    async function GrnCall() {

        setRefreshing(true);
        // const res = await axios.post('https://dev.sutradhar.tech/sutrapos1/api/v1/getgrnall/', { "domainrecno": 505 });
        const res = await axios.post(AppConstants.APIurl1 + '/filtergrn/', { "domainrecno": 508, "status": "A" });
        // console.log('data', res.data)
        setApiData(res.data.Message);
        setMasterDataSource(res.data.Message);
        console.log('!!!!API DATA!!!!!', ApiData);

        setRefreshing(false);

    }


    // Search Function by billno

    // const searchFilterFunction = (text) => {
    //     // Search function to search GRN bill number in GRN list

    //     if (text) {
    //         const newData = masterDataSource.filter(
    //             function (item) {
    //                 const itemDataTitle = item.billno
    //                     ? item.billno
    //                     : '';
    //                 const textData = text.toUpperCase();

    //                 return (itemDataTitle).toString().indexOf(textData) > -1;
    //             });

    //         setApiData(newData);
    //         setSearchBill(text);
    //     } else {
    //         setApiData(masterDataSource);
    //         setSearchBill(text);
    //     }
    // };


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
                <StatusBar backgroundColor={'orange'} />
                <Card style={styles.card}>
                    <Pressable onPress={() => navigation.navigate('Item_list', { item: item, GrnCall:GrnCall })}>

                        <View style={styles.rows1}>

                            <View style={{ flex: 3, marginHorizontal: '2%', alignItems: 'center' }}>
                                <Text style={{ ...styles.content_text, fontWeight: '600', color: 'grey' }}>Bill No :</Text>
                                <Text style={{ ...styles.content_text, fontWeight: '500' }}>{item.billno}</Text>
                            </View>
                            <View style={{ flex: 3, marginHorizontal: '2%', alignItems: 'center' }}>
                                <Text style={{ ...styles.content_text, fontWeight: '600', color: 'grey' }}>Bill Date :</Text>
                                <Text style={{ ...styles.content_text, fontWeight: '500' }}>{showDate(item.trdate)}</Text>
                            </View>
                            <View style={{ flex: 3, marginHorizontal: '2%', alignItems: 'center' }}>
                                <Text style={{ ...styles.content_text, fontWeight: '600', color: 'grey' }}>Bill Time :</Text>
                                <Text style={{ ...styles.content_text, fontWeight: '500' }}>{showTime(item.trtime)}</Text>
                            </View>
                        </View>

                        <View style={styles.rows2}>
                            <View style={{ flex: 3, marginHorizontal: '2%', alignItems: 'center' }}>
                                <Text style={{ ...styles.content_text, fontWeight: '600', color: 'grey' }}>Mobile :</Text>
                                <Text style={{ ...styles.content_text, fontWeight: '500' }}>{item.mobile}</Text>
                            </View>
                            <View style={{ flex: 3, marginHorizontal: '2%', alignItems: 'center' }}>
                                <Text style={{ ...styles.content_text, fontWeight: '600', color: 'grey' }}>Amount :</Text>
                                <Text style={{ ...styles.content_text, fontWeight: '500' }}>{item.amount}</Text>
                            </View>
                            <View style={{ flex: 3, marginHorizontal: '2%', alignItems: 'center' }}>
                                <Text style={{ ...styles.content_text, fontWeight: '600', color: 'grey' }}>Status :</Text>
                                <Text style={{ ...styles.content_text, fontWeight: '500' }}>{item.status}</Text>
                            </View>

                        </View>

                    </Pressable>
                </Card>

            </View>
        );
    }

    return (

        <KeyboardAvoidingView style={styles.main} behavior='height' enabled={false}>

            {/* {
                isPressed ? (
                    <View style={styles.Search_header_view}>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', flex: 1, backgroundColor: '#ffae42' }}>

                            <FontAwesome5 name={'warehouse'} size={23} color={'black'} style={{ marginTop: 15 }} />

                            <Text style={{ ...styles.header, color: 'black', fontSize: 24 }}>GRN</Text>

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
                            <Text style={styles.header}>GRN</Text>

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

export default Grn_list

const styles = StyleSheet.create({
    main: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'ghostwhite',

    },
    header_view: {
        flex: 0.15,
        justifyContent: 'flex-end',
        // backgroundColor: 'red',
        // width: '100%',
        // flexDirection: 'row'

    },
    card: {
        flex: 0.3,
        padding: '2%',
        borderRadius: 20,
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
        marginTop: '5%'

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
    rows: {
        flexDirection: "row",
        flex: 0.3,
        justifyContent: 'space-evenly',
        marginVertical: '3%',
        flexWrap: 'wrap'


    },
    rows1: {
        flexDirection: "row",
        flex: 0.3,
        justifyContent: 'space-evenly',
        marginVertical: '3%'
    },
    rows2: {
        flexDirection: "row",
        flex: 0.3,
        justifyContent: 'space-evenly',
        marginVertical: '3%',
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

    header: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 15,
        fontFamily: 'sans-serif-light'

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
