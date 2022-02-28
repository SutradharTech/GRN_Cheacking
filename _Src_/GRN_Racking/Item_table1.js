import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import { Divider } from 'react-native-paper'
import { Root, Popup } from 'popup-ui'

function Location(locnCode, locnname) {
    // Concatinate the Locationcode and Locationname
    let ans = locnCode + '-' + locnname;

    return ans
}

const Recno_render = ({ item, index }) => {
    console.log('SD===>', item)

    return (

        <View style={styles.body_view}>

            <View style={{ flex: 0.9, justifyContent: 'center' }}>
                <Text style={styles.body_text}>{item.descn}</Text>
            </View>

            <View style={{ justifyContent: 'center', flex: 0.5 }}>
                <Text style={{ ...styles.body_text, textAlign: 'center' }}>{item.qty}</Text>
            </View>

            <View style={{ justifyContent: 'center', flex: 0.5, }}>
                <Text style={{ ...styles.body_text, textAlign: 'center' }}>{Location(item.locationdescn, item.locationcode)}</Text>
            </View>
        </View>

    )
}

const divider = () => {
    return (
        <>
            <Divider />
        </>
    )
}


const Item_table1 = ({ route, navigation, }) => {

    const list = route.params.list;
    console.log('list==>', list)

    return (
        <Root>
            <View style={styles.main_view}>
                <View style={styles.header_view}>
                    <View style={{ flex: 0.57 }}>
                        <Text style={{ ...styles.text, marginLeft: '10%' }}>Items</Text>
                    </View>
                    <View>
                        <Text style={styles.text}>Qty</Text>
                    </View>
                    <View>
                        <Text style={styles.text}>Location</Text>
                    </View>
                </View>
                <Divider />
                <View style={{ flex: 1, }}>

                    <FlatList
                        data={list}
                        renderItem={Recno_render}
                        ItemSeparatorComponent={divider}

                    />

                </View>
                <View style={styles.bottom_view}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {

                            Popup.show({
                                type: 'Success',
                                title: 'Upload complete',
                                button: true,
                                textBody: 'Congrats! Your save successfully done',
                                buttontext: 'Ok',
                                callback: () => Popup.hide()
                            })
                        }}
                    >
                        <Text style={styles.button_text}>Save</Text>
                    </TouchableOpacity>
                </View>

            </View >
        </Root >
    )
}

export default Item_table1

const styles = StyleSheet.create({
    main_view: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'ghostwhite'
    },
    header_view: {
        flex: 0.12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: '3%'
    },
    text: {
        fontSize: 18,
        fontFamily: 'serif',
        fontWeight: '500',
        color: 'black'
    },
    bottom_view: {
        backgroundColor: 'white',
        flex: 0.1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#ffae42',
        height: 40,
        justifyContent: 'center',
        borderRadius: 5,
        width: '30%',
    },
    button_text: {
        textAlign: 'center',
        fontSize: 20,
        color: 'white'
    },
    body_view: {
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: '3%',
        flexDirection: 'row',
        height: 75,
    },
    body_text: {
        fontFamily: 'serif',
        fontSize: 15,
        color: 'black'
    }

})
