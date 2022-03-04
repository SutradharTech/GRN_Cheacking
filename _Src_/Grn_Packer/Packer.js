import { StyleSheet, Text, View, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Divider } from 'react-native-paper';
import { Card } from 'react-native-shadow-cards';
import Icon from 'react-native-vector-icons/Ionicons';

const Packer = ({ navigation }) => {

    useEffect(() => {
        ApiCall()
    }, [])

    const [filterBillDetais, setfilterBillDetais] = useState([]);
    const [refreshing, setRefreshing] = React.useState(false);

    // Api Call
    async function ApiCall() {

        setRefreshing(true);

        const FilterBillData = await axios.post('https://dev.sutradhar.tech/bcore/api/v1/filtersalebill/',
            {
                "domainrecno": 508,
                "status": "C"
            }
        );
        // console.log("FilterBillData", FilterBillData.data.SaleBill)
        setfilterBillDetais(FilterBillData.data.SaleBill);

        setRefreshing(false);
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

                        <TouchableOpacity onPress={() => navigation.navigate('ListItem', { item: item, ApiCall: ApiCall })} style={{ flex: 1, }}>

                            <View style={{ flex: 3, flexDirection: 'row', marginHorizontal: '3%', alignItems: 'center', padding: '1%' }}>
                                <Text style={{ ...styles.content_text, fontWeight: '600', color: 'grey' }}>Customer Name :</Text>
                                <Text style={{ ...styles.content_text, fontWeight: '500' }}>{item.custdescn}</Text>
                            </View>

                            <Divider />

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
                refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={ApiCall} />}
            />

        </View>
    )
}

export default Packer

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