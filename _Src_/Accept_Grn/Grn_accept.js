import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TouchableOpacity, Pressable, Image } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker, { openCamera, openPicker } from 'react-native-image-crop-picker';
import { Picker } from '@react-native-community/picker';
import AppFunction from '../AppFunction';
import { Card, Headline, Button, Divider, TextInput, Dialog, Portal, Provider, Subheading } from 'react-native-paper';


const Grn_accept = () => {

    const [SelectedBox, setSelectedBox] = useState([]);
    const [isVisible, setisVisible] = useState(false);
    const [transName, setTransName] = useState();
    const [receiptNo, setReceiptNo] = useState();
    const [supplierName, setSupplierName] = useState();
    const [receiptBillNo, setReceiptBillNo] = useState();
    const [box, setBox] = useState();
    const [cartoon, setCartoon] = useState();
    const [goni, setGoni] = useState();
    const [receiptDate, setReceiptDate] = useState();
    const [receiptAmt, setReceiptAmt] = useState();
    const [otherExp, setOtherExp] = useState();
    const [totalAmt, setTotalAmt] = useState();
    const [isimage, setisimage] = useState();
    const [postImage, setPostImage] = useState("");
    const [dialog, setdialog] = useState(false);

    useEffect(() => {

        setTotalAmt(Number(receiptAmt) + Number(otherExp))
    }, [receiptAmt || otherExp])

    console.log('totalAmt----', totalAmt)


    const showDialog = () => setdialog(true);

    const hideDialog = () => setdialog(false);


    // Taking Photo (function)
    const takePhoto = () => {

        ImagePicker.openCamera({
            multiple: true,
            width: 300,
            height: 400,
            cropping: true,
            includeBase64: true
        }).then(img => {
            console.log('image=====', img);

            setisimage(img.path);
            // listHeader.image = img;
            setPostImage(img)

        });
    };

    var packingTypeList = [
        { name: 'Box', value: 0 },
        { name: 'Carton', value: 1 },
        { name: 'Strips', value: 2 },
        { name: 'Bags', value: 3 },
        // { name: '', value: 2 },
        // { name: 'Shrink', value: 2 },
    ]

    return (
        <Provider>
            <KeyboardAvoidingView style={{ flex: 1, padding: '4%' }} >

                <Card style={{ flex: 1, backgroundColor: 'ghostwhite' }}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                        {/* <Text style={{ fontSize: 20, fontWeight: '700', alignSelf: 'flex-start', marginVertical: '4%', marginLeft: '8%' }}>GRN Accept</Text> */}
                        <Headline style={{ marginVertical: '4%', marginLeft: '8%' }}>GRN Accept</Headline>

                        {/* Camera Button */}

                        <TouchableOpacity style={{ marginRight: '6%' }} onPress={takePhoto} >
                            <MaterialCommunityIcons name={'camera'} size={35} color={'orange'} />
                        </TouchableOpacity>

                    </View>

                    <View style={{ justifyContent: 'space-between', flex: 1, }} >

                        <View style={{ flexDirection: 'row', backgroundColor: 'grey', justifyContent: 'space-around', }}>
                            <Text style={{ color: 'white', fontSize: 15 }}>Time : {AppFunction.getTime().dispTime} </Text>
                            <Text style={{ color: 'white', fontSize: 15 }}>Date : {AppFunction.getToday().dispDate}</Text>
                        </View>

                        {/* Import Supplier and Transport Dropdown */}
                        {/* <View style={{ flexDirection: 'row', }}>
                    <TransportDropdown TransportList={TransportList} />
                    <SupplierDropdown SupplierList={SupplierList} />
                </View> */}

                        {/*  Transporter Name */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                            {/* <Text style={{ fontSize: 16 }}>Transporter Name : </Text> */}
                            <TextInput
                                style={{ height: 35, width: '80%' }}
                                mode='outlined'
                                label='Transporter Name'

                                theme={{
                                    colors: {
                                        primary: 'orange'
                                    }
                                }}
                                keyboardType='name-phone-pad'
                            />
                        </View>

                        {/*  Transporter Receipt No  */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                            {/* <Text style={{ fontSize: 16 }}>Transporter Name : </Text> */}
                            <TextInput
                                style={{ height: 35, width: '80%' }}
                                mode='outlined'
                                label='Transporter Receipt No'

                                theme={{
                                    colors: {
                                        primary: 'orange'
                                    }
                                }}
                                keyboardType='name-phone-pad'
                            />
                        </View>

                        {/*  Supplier Name  */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>

                            {/* <Text style={{ fontSize: 16 }}>Receipt No : </Text> */}
                            <TextInput
                                style={{ height: 35, width: '80%' }}
                                mode='outlined'
                                label='Supplier Name'
                                theme={{
                                    colors: {
                                        primary: 'orange'
                                    }
                                }}
                                keyboardType='numeric'
                            />
                        </View>

                        {/*  Receipt Bill No  */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>

                            <Text style={{ fontSize: 16 }}>Receipt Bill No : </Text>
                            <TextInput
                                style={{ height: 35, width: '60%' }}
                                theme={{
                                    colors: {
                                        primary: 'orange'
                                    }
                                }}
                                keyboardType='numeric'
                            />
                        </View>


                        {/* Pack type Dropdown and Qty */}
                        <View style={{ alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row', flex: 0.2 }}>

                            {/* box */}
                            <View style={{ flex: 0.3 }}>
                                <View>
                                    <Text style={{ fontSize: 16, textAlign: 'center', color: 'black' }}>Box </Text>
                                </View>

                                <View>
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

                            {/* cartoon */}
                            <View style={{ flex: 0.3 }}>
                                <View>
                                    <Text style={{ fontSize: 16, textAlign: 'center', color: 'black' }}>Cartoons </Text>
                                </View>

                                <View>
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

                            {/* Goni */}
                            <View style={{ flex: 0.3 }}>
                                <View>
                                    <Text style={{ fontSize: 16, textAlign: 'center', color: 'black' }}>Goni </Text>
                                </View>

                                <View>
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

                            {/* <View style={{ flex: 0.55 }}>

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
                        </View> */}

                        </View>

                        {/* Receipt Date */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                            <Text style={{ fontSize: 15 }} >Receipt Date :</Text>
                            <TextInput
                                style={{ height: 35, width: '45%', textAlign: 'center' }}
                                theme={{
                                    colors: {
                                        primary: 'orange'
                                    }
                                }}
                                keyboardType='numbers-and-punctuation'
                            />
                        </View>

                        {/* Receipt Amount */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                            <Text style={{ fontSize: 15 }} >Receipt Amount :</Text>
                            <TextInput
                                style={{ height: 35, width: '45%', textAlign: 'center' }}
                                onChangeText={(amt) => setReceiptAmt(amt)}
                                theme={{
                                    colors: {
                                        primary: 'orange'
                                    }
                                }}
                                keyboardType='numbers-and-punctuation'
                            />
                        </View>

                        {/* Other Expences / Hamali */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                            <Text style={{ fontSize: 15 }} >Other Expences/ Hamali :</Text>
                            <TextInput
                                style={{ height: 35, width: '40%', }}
                                onChangeText={(amt) => setOtherExp(amt)}
                                theme={{
                                    colors: {
                                        primary: 'orange'
                                    }
                                }}
                                keyboardType='numeric'
                            />
                        </View>

                        <Divider />

                        {/* Total Amount and Image View */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: '5%' }}>
                            <TouchableOpacity onPress={() => setdialog(true)} style={{ flex: 0.4, alignItems: 'center' }}>
                                <Ionicons name={'image-outline'} size={35} color={'orange'} />
                            </TouchableOpacity>

                            <View style={{ flex: 1 }}>

                            </View>

                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                                <Text style={{ fontSize: 17, marginRight: '5%', fontWeight: '600' }}>Total :</Text>
                                <Text style={{ fontSize: 16, marginRight: '15%' }}>{Number(receiptAmt) + Number(otherExp)}</Text>
                            </View>

                        </View>

                    </View>

                </Card>


                {
                    dialog ? (
                        <Portal>
                            <Dialog visible={showDialog} onDismiss={hideDialog} style={{ height: '40%', alignItems: 'center', justifyContent: 'center', paddingTop: '6%' }}>

                                {/* <View style={styles.image_view}> */}
                                {
                                    isimage != null ? (
                                        <Image source={{ uri: isimage }} style={styles.image} />
                                    ) : (
                                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                            <Subheading>Image Not Found !!</Subheading>
                                        </View>
                                    )
                                }

                                {/* </View> */}

                                <TouchableOpacity style={{flex: 0.9, justifyContent: 'center', alignSelf: 'flex-end', marginRight: '5%'}}>
                                    <Button onPress={hideDialog} style={{ alignSelf: 'flex-end'}}>Exit</Button>
                                </TouchableOpacity>
                            </Dialog>
                        </Portal>
                    ) : null
                }

            </KeyboardAvoidingView >
        </Provider>
    )
}

export default Grn_accept

const styles = StyleSheet.create({
    video_btn: {
        height: 50,
        width: 50,
        borderRadius: 25,
        backgroundColor: 'orange',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: '92.5%',
        left: '80%',
        shadowColor: '#000',
        shadowOffset: {
            width: '5%',
            height: '5%'
        },
        elevation: 5
    },
    image: {
        width: 250,
        height: 200,
        // backgroundColor: 'red'

    },
})