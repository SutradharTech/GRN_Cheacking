import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import axios from 'axios';
import { Checkbox, Divider, TextInput, Button, List } from 'react-native-paper';
import { Card } from 'react-native-shadow-cards';
import AppConstants from '../../AppConstant';
import CounterBillStatus from '../../CounterBillStatus';

const PackerList = ({ navigation }) => {


    useEffect(() => {
        ApiCall();
    }, [])


    const [filterBillDetais, setfilterBillDetais] = useState([]);
    const [refreshing, setRefreshing] = useState(false);


    // Api Call getcounterbillall
    async function ApiCall() {

        // setRefreshing(true);

        var senddataapi = {
            "domainrecno": 508,
            "status": CounterBillStatus.packer
        }

        const FilterBillData = await axios.post(AppConstants.APIurl2 + 'getcounterbillall/', senddataapi);
        // console.log("APIRES: /getcounterbillall/",FilterBillData.data.Message)

        setfilterBillDetais(FilterBillData.data.Message)

    }


    // Formating Function For Date by DDMMYYYY
    const showDate_ddmmyy = (ab) => {
        let x = ab;
        // console.log("sec", x);
        let dt = ""
        if (x != null) {

            let y = x.toString();
            dt = y.slice(6, 8) + "/" + y.slice(4, 6) + "/" + y.slice(0, 4);
        }
        return dt;
    };

    // Formating Time Function
    function showTime(time) {

        let n = time;
        let m = n.toString();
        let Time = m.slice(0, 2) + ':' + m.slice(2, 4) + ':' + m.slice(4, 6)

        return Time
    }

    // console.log('filterBillDetais----', filterBillDetais)

    // Render Item (function)
    function renderItems({ item, index }) {
        return (
            <>
                <View style={{ flex: 1, margin: "1%", marginVertical: '3%' }}>

                    <Card style={styles.card}>

                        <TouchableOpacity onPress={() => navigation.navigate('ListItem', { custName: item.custdescn, From: item.userroledescn, billno: item.billno, domainrecno: item.domainrecno, domainuserrecno: item.domainuserrecno, ApiCall: ApiCall })}
                            style={{ flex: 1, borderTopWidth: 10, borderColor: 'orange', borderRadius: 10, }}>

                            <View style={{ flex: 3, flexDirection: 'row', marginHorizontal: '3%', alignItems: 'center', padding: '1%', flexWrap: 'wrap' }}>
                                <Text style={{ ...styles.content_text, fontWeight: '500' }}>{item.custdescn}</Text>
                            </View>

                            <View style={{ flex: 3, flexDirection: 'row', marginHorizontal: '3%', alignItems: 'center', padding: '1%', flexWrap: 'wrap' }}>
                                <Text style={{ ...styles.content_text, fontWeight: '500', color: 'grey' }}>Created By</Text>
                                <Text style={{ ...styles.content_text, fontWeight: '500', marginLeft: '4%' }}>{item.userroledescn}</Text>
                            </View>

                            <Divider />

                            <View style={styles.rows1}>

                                <View style={{ flex: 3, marginHorizontal: '3%', alignItems: 'center' }}>
                                    <Text style={{ ...styles.content_text, fontWeight: '600', color: 'grey' }}>Bill No :</Text>
                                    <Text style={{ ...styles.content_text, fontWeight: '500' }}>{item.billno}</Text>
                                </View>
                                <View style={{ flex: 3, marginHorizontal: '2%', alignItems: 'center' }}>
                                    <Text style={{ ...styles.content_text, fontWeight: '600', color: 'grey' }}>Bill Date :</Text>
                                    <Text style={{ ...styles.content_text, fontWeight: '500' }}>{showDate_ddmmyy(item.trdate)}</Text>
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
                    </Card>
                </View>
            </>
        )
    }


    return (
        <View style={{ flex: 1 }}>

            <FlatList
                data={filterBillDetais}
                renderItem={renderItems}
                showsVerticalScrollIndicator={true}
                // onEndReached={onEndReachedHandler}
                keyExtractor={(item) => item.recno}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={ApiCall} />}
            />

        </View>
    )
}

export default PackerList

const styles = StyleSheet.create({

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
    content_text: {
        fontSize: 15,
        color: 'black',
        marginLeft: '2%',
        marginVertical: '1%'
    },
    card: {
        flex: 0.3,
        alignSelf: 'center',
        // height:'64%',
        borderRadius: 10,
        width: '90%',

    },
})