import { StyleSheet, Text, View, FlatList, TouchableOpacity, RefreshControl, SectionList, StatusBar, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Divider, Checkbox, Button, List } from 'react-native-paper';
import { Card } from 'react-native-shadow-cards';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const Check = ({navigation}) => {

    const [refreshing, setRefreshing] = useState(false);
    const [filterBillDetails, setfilterBillDetails] = useState([]);
    const [billdetails, setbilldetails] = useState([]);
    const [index, setIndex] = useState();
    const [DelList, setDelList] = useState(false);
    const [PickList, setPickList] = useState(true);
    const [deleiveryList, setdeleiveryList] = useState([]);


    async function ApiCall() {

        setRefreshing(true);

        var sendapidata = {
            "domainrecno": 508,
            "status": "CR"
        }

        const FilterBillData = await axios.post('https://dev.sutradhar.tech/bcore/api/v1/filtersalebill/', sendapidata);
        console.log("Api Res// filtersalebill/", FilterBillData.data.SaleBill);

        setfilterBillDetails(FilterBillData.data.SaleBill);
        setRefreshing(false);

    }
    console.log("Res// filtersalebill/", filterBillDetails)

    // Patch Data function ( On Submit click )
    async function patchsalebill(result) {

        console.log("ApiCall // salebill", "recno:", result.recno, 'receiver date:', null, 'receiver time:', null, "status:", "C", "transportpickup:", result.transportpickup)

        var sendapidata = {
            "recno": result.recno,
            "receiverdate": null,
            "receivertime": null,
            "status": "CD",
            "transportpickup": result.transportpickup
        }

        const { data: UpdateBillData } = await axios.patch('https://dev.sutradhar.tech/bcore/api/v1/salebill/', sendapidata);
        console.log("ApiRes // salebill", UpdateBillData)
        // setupdatesalebillstatus(UpdateBillData.data);
        if (UpdateBillData.Success == true) {
            // alert('Success')
            ApiCall()
        }
    }


    function filterpickupList() {
        const result = filterBillDetails.filter(pick);

        function pick(item) {
            return item.transportpickup == true;
        }

        // setdeleiveryList(result);
        console.log('filterpickupList-->', result.length)

        if (result.length <= 0) {
            alert('Please Select Min One Bill');
        }
        else {
            result.map((item) => {

                patchsalebill(item)
            })
        }

    }

    return (
        <View style={{ flex: 1 }}>
            <StatusBar backgroundColor={'orange'} barStyle={'dark-content'} />
            {/* Customer Name  */}
            <Card style={{ width: '100%', backgroundColor: 'ghostwhite', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', padding: '1%' }}>
                <MaterialCommunityIcons name={'account-circle'} size={32} color={'orange'} />
                <Text style={{ ...styles.content_text, fontWeight: '600', color: 'grey', fontSize: 18, marginRight: '35%' }}>Customer Name ?</Text>
            </Card>


            <Card style={styles.card}>

                <ScrollView refreshControl={<RefreshControl onRefresh={ApiCall} refreshing={refreshing} />} >
                    {
                        filterBillDetails.map((item, index) => {
                            // console.log('item----->', item, index)
                            return (
                                <View style={{ flex: 1, }}>

                                    {/* <Card style={styles.card}> */}

                                    <TouchableOpacity style={{ flexDirection: 'row', marginTop: '3%', marginBottom: '1%' }}>

                                        <View style={{ flex: 0.2, borderRightWidth: 0.5, borderRightColor: 'grey', justifyContent: 'space-around', alignItems: 'center' }}>
                                            <Text style={{ ...styles.content_text, fontWeight: '600', color: 'grey' }}> Box</Text>
                                            <Text style={{ ...styles.content_text, fontWeight: '500' }}>20</Text>
                                        </View>

                                        <View style={{ flex: 0.7 }}>

                                            {/* <Divider /> */}

                                            <View style={styles.rows1}>

                                                <View style={{ flex: 3, marginHorizontal: '3%', alignItems: 'center', flexDirection: 'row' }}>
                                                    <Text style={{ ...styles.content_text, fontWeight: '600', color: 'grey' }}>Bill No : </Text>
                                                    <Text style={{ ...styles.content_text, fontWeight: '500' }}>{item.billno}</Text>
                                                </View>

                                            </View>

                                            <View style={{ flex: 3, flexDirection: 'row', marginHorizontal: '3%', alignItems: 'center', padding: '1%', flexWrap: 'wrap' }}>
                                                <Text style={{ ...styles.content_text, fontWeight: '600', color: 'grey' }}>Customer : </Text>
                                                <Text style={{ ...styles.content_text, fontWeight: '500' }}>{item.custdescn}</Text>
                                            </View>

                                        </View>

                                        <View style={{ alignItems: 'center' }}>
                                            <Checkbox
                                                color={'dodgerblue'}
                                                // key={item.key}
                                                status={filterBillDetails[index].transportpickup ? 'checked' : 'unchecked'}
                                                onPress={(n) => {
                                                    // console.log('n==>', n)
                                                    setfilterBillDetails((p) => {
                                                        p[index].transportpickup = !p[index].transportpickup;
                                                        setIndex(index)
                                                        // let rec = p[index].itemrecno;
                                                        // let checked = p[index].picked
                                                        // salebillfooter(rec, checked)
                                                        return [...p]
                                                    })
                                                    // console.log('filterBillDetails-------------->', filterBillDetails)
                                                }}
                                            />
                                            {
                                                filterBillDetails[index].transportpickup == false ?
                                                    <Text>Deleivered</Text> : <Text>undeleivered</Text>
                                            }
                                        </View>

                                    </TouchableOpacity>

                                    <View style={{ flex: 3, flexDirection: 'row', marginHorizontal: '3%', alignItems: 'center', padding: '1%', flexWrap: 'wrap' }}>
                                        <Text style={{ ...styles.content_text, fontWeight: '600', color: 'grey' }}>Address : </Text>
                                        <Text style={{ ...styles.content_text, fontWeight: '500' }}>_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _</Text>
                                    </View>

                                    <Divider style={{ backgroundColor: 'silver', height: 3 }} />

                                </View>
                            )
                        })
                    }
                </ScrollView>

                <View style={{ marginVertical: '2%' }}>


                    {/*  Submit Button  */}
                    <TouchableOpacity>
                        <Button
                            style={{ backgroundColor: 'orange', width: '40%', alignSelf: 'center', zIndex: 1 }}
                            onPress={filterpickupList}
                        >
                            <Text style={{ color: 'white' }}>Submit</Text>
                        </Button>
                    </TouchableOpacity>

                </View>

            </Card>


        </View >
    )
}

export default Check

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
        flex: 1,
        alignSelf: 'center',
        // height:'64%',
        borderRadius: 5,
        marginBottom: '3%',

    },
    Body_Container: {
        flexDirection: "row",
        justifyContent: 'space-around',
        alignItems: 'center',
        flex: 0.1,
        marginBottom: '2%',
        // height: 60,
        // padding: 5,
        // margin: 15,
        // backgroundColor: 'green'
    },
    Heder_Text: {
        color: "black",
        fontSize: 15,
        fontWeight: '500',
        // fontFamily: 'monospace'
    },
    activeTab: { height: '100%', width: '50%', justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: 'orange' },

    deactiveTab: { height: '100%', width: '50%', justifyContent: 'center' }
})