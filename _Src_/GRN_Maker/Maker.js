import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Card } from 'react-native-shadow-cards';
import Icon from 'react-native-vector-icons/Ionicons';

const Maker = ({ navigation }) => {

    useEffect(() => {
        ApiCall()
    }, [])

    const [filterBillDetais, setfilterBillDetais] = useState([])


    // Book Details Store ->
    async function ApiCall() {
        const FilterBillData = await axios.post('https://dev.sutradhar.tech/bcore/api/v1/filtersalebill/',
            {
                "fromdate": 20220201,
                "todate": 20220228,
                "domainrecno": 508
            }
        );
        // console.log("FilterBillData", FilterBillData.data.SaleBill)
        setfilterBillDetais(FilterBillData.data.SaleBill);
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

    function showTime(time) {

        let n = time;
        let m = n.toString();
        let Time = m.slice(0, 2) + ':' + m.slice(2, 4) + ':' + m.slice(4, 6)

        return Time
    }

    function renderItems({ item, index }) {
        return (
            <>
                <View style={{ flex: 1, margin: "1%", marginVertical: '3%' }}>

                    <Card style={styles.card}>

                        <TouchableOpacity onPress={() => navigation.navigate('ShowItem', { item: item.items })} style={{ flex: 1, }}>

                            {/* <View style={{ flex: 1, flexDirection: 'row' }}> */}

                            {/* <View style={{ flex: 1 }}>
                                    <View style={{ flex: 1 }}>
                                        <Text>Date: {showDate_ddmmyy(item.trdate)} </Text>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text>Bill No. : {item.billno} </Text>
                                    </View>
                                </View> */}

                            <View style={styles.rows1}>

                                <View style={{ flex: 3, marginHorizontal: '3%', alignItems: 'center' }}>
                                    <Text style={{ ...styles.content_text, fontWeight: '600', color: 'grey' }}>Bill No :</Text>
                                    <Text style={{ ...styles.content_text, fontWeight: '500' }}>{item.billno}</Text>
                                </View>
                                <View style={{ flex: 3, marginHorizontal: '3%', alignItems: 'center' }}>
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
                keyExtractor={(item) => item.recno.toString()}
            />
        </View>
    )
}

export default Maker

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
        borderRadius: 20,

    },
})



// <FlatList
// data={categoryitems}
// renderItem={renderItems}
// showsVerticalScrollIndicator={true}
// onEndReached={onEndReachedHandler}
// keyExtractor={(item) => item.recno.toString()}
// />