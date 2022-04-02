//
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Image, ScrollView, Button } from 'react-native';
import { Card } from 'react-native-shadow-cards';
import { Divider, TextInput } from 'react-native-paper';
import ImagePicker, { openCamera, openPicker } from 'react-native-image-crop-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import VideoPlayer from 'react-native-video-player';
import { Root, Popup } from 'popup-ui'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Mdalpage from './Mdalpage';
import { color } from 'react-native-elements/dist/helpers';
import VideoShowModal from './VideoShowModal';
import axios from 'axios';
import AppConstants from '../AppConstant';
// import Video from 'react-native-video';

const Item_list = ({ route, navigation }) => {

    const [list, setlist] = useState([]);
    const [Num, setNum] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState();
    const [isVideo, setisVideo] = useState({});
    const [popUp, setpopUp] = useState(false);
    const [showVideo, setshowVideo] = useState(false);

    // const i = route.params.item;

    const { item: i, GrnCall } = route.params;

    useEffect(() => {       //  store list of items in useState & set qty == qtyaccepted

        var listItemArr = i.items.map((itm) => {

            itm.qtyaccepted = itm.qty
            return { ...itm }

        })
        setlist(listItemArr)

    }, [])

    console.log('list=====>', list);


    console.log("$$$$$$$$$$$LIST", list);
    let Qtyacpt = list[selectedIndex]?.qtyaccepted;
    console.log('Qtyacpt=>', Qtyacpt)




    // Taking Photo (function)
    const takePhoto = () => {

        ImagePicker.openCamera({
            multiple: true,
            width: 300,
            height: 400,
            cropping: true,
            includeBase64: true
        }).then(img => {
            // console.log('image=====', img);

            setlist((p) => {

                p[selectedIndex].image = img.data

                return [...p]
            })

        });
    };







    // const takePhoto = () => {   // Taking Photo (function) 

    //     ImagePicker.openCamera({
    //         multiple: true,
    //         width: 300,
    //         height: 400,
    //         cropping: true,
    //     }).then(image => {
    //         console.log('image=====', image.path);

    //         setlist((p) => {
    //             p[selectedIndex].image = image.path

    //             return [...p]
    //         })
    //         console.log('================', list)
    //     });
    // };

    const takeVideo = () => {       // Taking Video (function)

        ImagePicker.openCamera({
            mediaType: 'video',
        }).then(res_video => {
            console.log('video_info===', res_video);
            // let data = new FormData()
            // if (res_video.path) {
            //     data.append('video', { uri: res_video.path, name: "Test.mp4", type: 'video/mp4' })
            // }
            // console.log("data: ", data);
            setisVideo(res_video)
        });
    }

    async function postUpadateGrn(item, index) {     // Post data Function ( Call Api To post data)   

        var senddataapi = {
            "recno": route.params.item.recno,
            "shortguid": route.params.item.shortguid,
            "domainrecno": route.params.item.domainrecno,
            "domainuserrecno": route.params.item.domainuserrecno,
            "refno": route.params.item.refno,
            "trdate": route.params.item.trdate,
            "trtime": route.params.item.trtime,
            "billno": route.params.item.billno,
            "ponumber": route.params.item.ponumber,
            "orderdate": route.params.item.orderdate,
            "domainsupplierrecno": route.params.item.domainsupplierrecno,
            "suppliername": route.params.item.suppliername,
            "amount": route.params.item.amount,
            "mobile": route.params.item.mobile,
            "active": route.params.item.active,
            "status": "R",
            "acceptdate": route.params.item.acceptdate,
            "autogrn": route.params.item.autogrn,
            "erpid": route.params.item.erpid,
            "uploadedtoscm": route.params.item.uploadedtoscm,
            "accepttime": route.params.item.acceptdate,
            "video": isVideo,
            "items": [
                {
                    "itemrecno": list[index].itemrecno,
                    "shortguid": list[index].shortguid,
                    "qtyaccepted": list[index].qtyaccepted,
                    "reason": list[index].reason,
                    "salerate": list[index].salerate,
                    "amount": list[index].amount,
                    "cgstamt": list[index].cgstamt,
                    "sgstamt": list[index].sgstamt,
                    "igstamt": list[index].igstamt,
                    "itembatchno": list[index].itembatchno,
                    "purrate": list[index].purrate,
                    "discountamount": list[index].discountamount,
                    "expdate": list[index].expdate,
                    "MRP": list[index].MRP,
                    "shortdescn": list[index].shortdescn,
                    "hsn": list[index].hsn,
                    "uomrecno": list[index].uomrecno,
                    "discountamt": list[index].discountamt,
                    "cgstrate": list[index].cgstrate,
                    "sgstrate": list[index].sgstrate,
                    "igstrate": list[index].igstrate,
                    "packtyperecno": list[index].packtyperecno,
                    "image": list[index].image
                },
            ]

        }

        console.log("APICALL:  /updategrn/", senddataapi)

        const rackingPost = await axios.post(AppConstants.APIurl1 + "/updategrn/", senddataapi)
        console.log("APIRES:  /updategrn/", rackingPost.data)
        {
            if (rackingPost.data.Success == true) {
                Popup.show({
                    type: 'Success',
                    title: 'Upload complete',
                    button: true,
                    textBody: 'Congrats! Your upload successfully done',
                    buttontext: 'Ok',
                    callback: () => Popup.hide()
                })
            }
            else {
                Popup.show({
                    type: 'Warning',
                    title: 'Upload Faild',
                    button: true,
                    textBody: 'Your upload not successfully done',
                    buttontext: 'Ok',
                    callback: () => Popup.hide()
                })
            }
        }

    }


    // Render Component

    const Screen2_render = ({ item, index }) => {

        // Screen2_render return
        return (
            <View style={{ flex: 1, backgroundColor: 'ghostwhite', margin: 5, }} >

                <Card style={styles.Body_Main_Card}>

                    <View style={styles.card_subViews}>

                        <Text style={styles.Heder_Text}>{item.shortdescn}</Text>

                    </View>

                    <Divider style={{ marginRight: '5%', marginTop: '1%' }} />


                    <View style={{ ...styles.card_subViews, justifyContent: 'space-around' }}>

                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>

                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-evenly', }}>

                                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', width: '100%' }}>

                                    <Text style={{ ...styles.content_text, fontWeight: '500', color: 'grey' }}>Qty: </Text>
                                    <Text style={{ ...styles.content_text, fontWeight: '500' }}>{item?.qty}</Text>

                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', width: '100%' }}>

                                    <Text style={{ ...styles.content_text, fontWeight: '500', color: 'grey' }}>Batch No: </Text>
                                    {/* <Text style={{ ...styles.content_text, fontWeight: '500' }}>{item.itembatchno}</Text> */}
                                    <TextInput
                                        style={styles.input}
                                        defaultValue={item?.itembatchno}
                                    />

                                </View>

                            </View>
                            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly' }}>

                                <Text style={{ ...styles.content_text, fontWeight: '500', color: 'grey' }}>Accepted :</Text>

                                <TextInput
                                    style={styles.input}
                                    defaultValue={item?.qty.toString()}
                                    onChangeText={(Num) => {
                                        setlist((p) => {
                                            p[index].qtyaccepted = Num

                                            return [...p]
                                        })
                                    }}
                                />


                                {/* {
                                    list[selectedIndex]?.qtyaccepted == Num ? (
                                        <TextInput
                                            value={list[index].qtyaccepted}
                                            defaultValue={item.qty.toString()}
                                            style={styles.input}
                                            theme={{
                                                colors: {
                                                    primary: 'lightgray' // Outline color here
                                                }
                                            }}
                                            onChangeText={(Num) => {

                                                setlist((p) => {
                                                    p[index].qtyaccepted = Num

                                                    return [...p]
                                                })
                                                console.log('change========', list);
                                            }}
                                        />
                                    ) : (
                                        < TextInput
                                            value={list[index].qtyaccepted}
                                            defaultValue={item.qty.toString()}
                                            style={styles.input}
                                            theme={{
                                                colors: {
                                                    primary: 'red' // Outline color here
                                                }
                                            }}
                                            onChangeText={(text) => {

                                                setlist((p) => {
                                                    p[index].qtyaccepted = text

                                                    return [...p]
                                                })
                                                console.log('change========', list)
                                            }}
                                        />

                                    )
                                } */}
                            </View>
                        </View>

                    </View>

                    <Divider />

                    <TouchableOpacity
                        onPress={() => {
                            setModalVisible(true)
                            setSelectedIndex(index)
                        }} >

                        <View style={{ marginHorizontal: '5%', flexDirection: 'row', alignItems: 'center', marginVertical: '1%', justifyContent: 'space-between' }}>

                            <View style={{ flex: 2 }}>
                                <Text style={{ ...styles.content_text, fontWeight: '400', }}>Item Details :</Text>
                            </View>
                            <View style={{ flex: 0.2 }}>
                                <AntDesign name={'caretdown'} size={15} color={'orange'} />
                            </View>
                        </View>
                    </TouchableOpacity>
                </Card>

            </View>
        )

    }

    // Main Return

    return (
        <Root>
            <View style={styles.Main_Body}>

                {/* Item Details Modal view */}

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                >

                    <View style={styles.centeredView_2}>

                        <View style={Qtyacpt == Num ? styles.modalView_2 : styles.modalView_3}>

                            <Text style={{ ...styles.Heder_Text, alignSelf: 'center', fontSize: 16 }}>{list[selectedIndex]?.shortdescn}</Text>
                            <View style={{ borderColor: 'black', borderWidth: 0.5, width: '90%', marginVertical: '3%', }} />

                            <ScrollView>

                                <View style={styles.rows1}>

                                    <View style={{ flex: 1.4, marginHorizontal: '1%', alignItems: 'center' }}>
                                        <Text style={{ ...styles.content_text, fontWeight: '600', color: 'grey' }}>Bill Qty :</Text>
                                        <Text style={{ ...styles.content_text, fontWeight: '500' }}>{list[selectedIndex]?.qty}</Text>
                                    </View>
                                    <View style={{ flex: 2, marginHorizontal: '1%', alignItems: 'center' }}>
                                        <Text style={{ ...styles.content_text, fontWeight: '600', color: 'grey' }}>No of Box :</Text>
                                        <Text style={{ ...styles.content_text, fontWeight: '500' }}>{list[selectedIndex]?.boxes}</Text>
                                    </View>
                                    <View style={{ flex: 1.5, marginHorizontal: '1%', alignItems: 'center' }}>
                                        <Text style={{ ...styles.content_text, fontWeight: '600', color: 'grey' }}>Accepted :</Text>
                                        <Text style={{ ...styles.content_text, fontWeight: '500' }}>{list[selectedIndex]?.qtyaccepted}</Text>
                                    </View>
                                </View>

                                <View style={styles.rows2}>
                                    <View style={{ flex: 1.5, marginHorizontal: '1%', alignItems: 'center', }}>
                                        <Text style={{ ...styles.content_text, fontWeight: '600', color: 'grey' }}>MRP :</Text>
                                        <Text style={{ ...styles.content_text, fontWeight: '500', }}>{list[selectedIndex]?.salerate}</Text>
                                    </View>
                                    <View style={{ flex: 3, marginHorizontal: '1%', alignItems: 'center' }}>
                                        <Text style={{ ...styles.content_text, fontWeight: '600', color: 'grey' }}>Purchase Rate :</Text>
                                        <Text style={{ ...styles.content_text, fontWeight: '500' }}>{list[selectedIndex]?.purrate}</Text>
                                    </View>
                                    <View style={{ flex: 1.5, marginHorizontal: '1%', alignItems: 'center' }}>
                                        <Text style={{ ...styles.content_text, fontWeight: '600', color: 'grey' }}>Amount :</Text>
                                        <Text style={{ ...styles.content_text, fontWeight: '500' }}>{list[selectedIndex]?.amount}</Text>
                                    </View>

                                </View>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>

                                    <Text style={{ fontSize: 14, color: 'black', marginHorizontal: '4%' }}>Remark</Text>

                                    <TextInput
                                        value={list[selectedIndex]?.reason}
                                        placeholder='Type Here!!'
                                        multiline={true}
                                        // maxLength= {20}
                                        style={{ width: 200, backgroundColor: 'white', }}
                                        theme={{
                                            colors: {
                                                primary: 'lightgray' // Outline color here
                                            }
                                        }}
                                        onChangeText={(text) => {

                                            setlist((p) => {
                                                p[selectedIndex].reason = text

                                                return [...p]
                                            })
                                            console.log('liiiiiii==', list)
                                        }}
                                    // underlineColorAndroid={'white'}
                                    />

                                </View>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: '5%' }}>

                                    <TouchableOpacity onPress={takePhoto} style={styles.camera_btn} >
                                        <MaterialCommunityIcons name={'camera'} size={30} color={'white'} />
                                    </TouchableOpacity>

                                </View>

                                {/* {
                                    Qtyacpt == Num ? (
                                        null
                                    ) : (
                                        <View style={styles.image_view}>

                                            <Image source={{ uri: list[selectedIndex]?.image }} style={styles.image} />

                                        </View>
                                    )

                                } */}

                                {/*  Show Image  */}
                                <View style={styles.image_view}>

                                    <Image source={{ uri: `data:image/png;base64,${list[selectedIndex]?.image}` }} style={styles.image} />

                                </View>

                            </ScrollView>

                            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-evenly' }}>
                                <TouchableOpacity style={styles.button_2} onPress={() => setModalVisible(!modalVisible)} >
                                    <Text style={styles.textStyle_2}>Back</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.button_2, styles.buttonClose_2]}
                                    onPress={() => {
                                        setModalVisible(!modalVisible)
                                    }}
                                >
                                    <Text style={styles.textStyle_2}>Add</Text>
                                </TouchableOpacity>
                            </View>

                        </View>

                    </View>

                </Modal >

                {/* Show/Display Video Modal view  */}

                <VideoShowModal isVideo={isVideo} showVideo={showVideo} setshowVideo={setshowVideo} />

                {/* Post Data to API submit Modal View */}

                <Mdalpage popUp={popUp} setpopUp={setpopUp} />


                <View style={styles.Body_Container}>

                    <View style={showVideo ? styles.first_view1 : styles.first_view}>
                        <Text style={{ ...styles.Heder_Text, fontSize: 18, textAlign: 'center' }}>Items</Text>
                    </View>
                    <View style={showVideo ? styles.first_view : styles.first_view1}>
                        <MaterialCommunityIcons name={'play-box-multiple'} size={35} onPress={() => setshowVideo(true)} color={showVideo ? 'orange' : 'grey'} />
                    </View>

                </View>
                <Divider />

                {/* Render Function Call (Flatlist) */}

                <KeyboardAwareScrollView style={{ flex: 1 }} enableOnAndroid>

                    {/* <FlatList
                        data={list}
                        renderItem={Screen2_render}
                        keyExtractor={(item, index) => {
                            console.log('item<--------', item);
                            item.shortguid
                        }}
                    /> */}

                    {list.map((item, index) => {

                        return (

                            <Screen2_render
                                item={item}
                                index={index}
                            />
                        )
                    })}

                </KeyboardAwareScrollView>

                {/* Video Button */}

                <TouchableOpacity onPress={takeVideo} style={styles.video_btn} >
                    <MaterialCommunityIcons name={'video'} size={30} color={'white'} />
                </TouchableOpacity>

                {/* Submit button to send data to API  */}

                <View style={{ alignItems: 'center', padding: '2%' }}>
                    <TouchableOpacity
                        style={{ backgroundColor: 'orange', width: '30%', height: 35, justifyContent: 'space-around', alignItems: 'center', borderRadius: 5, }}
                        // onPress={() => showSuccessModal()}
                        onPress={() => {
                            list.map((item, index) => {

                                postUpadateGrn(item, index)
                            })

                            GrnCall();
                            navigation.navigate('Grn_list');

                        }
                        }
                    >
                        <Text style={{ color: 'white', fontSize: 20 }}>Submit</Text>
                    </TouchableOpacity>
                </View>

            </View >
        </Root>


    )
}


export default Item_list

const styles = StyleSheet.create({
    Main_Body: {
        flex: 1,
        backgroundColor: 'ghostwhite'
    },
    Body_Container: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 60,
        // padding: 5,
        // margin: 15,
        // backgroundColor: 'white'
    },
    Heder_Text: {
        color: "black",
        fontSize: 15,
        fontWeight: '500',
        // fontFamily: 'monospace'
    },
    first_view: {
        height: '100%',
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: 'orange',
        borderBottomWidth: 1
    },
    first_view1: {
        height: '100%',
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    Body_Main_Card: {
        width: '98%',
        height: '100%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: '2%',
        marginHorizontal: 5,
    },
    input: {
        height: 40,
        width: 80,
        backgroundColor: 'greywhite',
        fontSize: 14,
        textAlign: 'right'
        // marginLeft: 90 
    },


    centeredView_2: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // marginVertical: '34%',

    },
    modalView_2: {
        flex: 0.45,
        backgroundColor: "white",
        borderRadius: 20,
        padding: '3%',
        width: '90%',
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalView_3: {
        flex: 0.8,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: '3%',
        width: '90%',
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button_2: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: 60,
        marginTop: '2%',
        // backgroundColor: 'orange'
        backgroundColor: "#2196F3",
    },
    textStyle_2: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },


    rows1: {
        flexDirection: "row",
        flex: 0.3,
        justifyContent: 'space-evenly',
        marginVertical: '2%'
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
        marginVertical: '2.5%'
    },
    camera_btn: {
        height: 45,
        width: 45,
        borderRadius: 25,
        backgroundColor: 'orange',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        // marginTop: '2%',
        shadowColor: '#000',
        shadowOffset: {
            width: '5%',
            height: '5%'
        },
        elevation: 5
    },
    video_btn: {
        height: 50,
        width: 50,
        borderRadius: 25,
        backgroundColor: 'orange',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: '12%',
        left: '75%',
        shadowColor: '#000',
        shadowOffset: {
            width: '5%',
            height: '5%'
        },
        elevation: 5
    },
    image_view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: '2%',
        paddingHorizontal: '2%',
        // backgroundColor: 'red'
    },
    image: {
        width: 250,
        height: 200,
        // backgroundColor: 'red'

    },
    card_subViews: {
        padding: '1%'
    }
})