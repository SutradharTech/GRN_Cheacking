
import React from 'react'
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native'
import { Modal } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'


const Mdalpage = ({ popUp }) => {

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={popUp}
        >
            <View style={localstyles.centeredView_2}>
                <View style={localstyles.modalView_2}>
                    <Ionicons name='md-shield-checkmark-sharp' size={40} color='green' />
                    <Text style={localstyles.modalText_2}>SuccessFully Submit</Text>

                    {/* <Pressable
                        style={[localstyles.button_2, localstyles.buttonClose_2]}
                        onPress={() => {
                            setpopUp(!popUp)
                        }}
                    >
                        <Text style={localstyles.textStyle_2}></Text>
                    </Pressable> */}
                </View>
            </View>
        </Modal>

    )
}

export default Mdalpage

const localstyles = StyleSheet.create({

    centeredView_2: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView_2: {
        backgroundColor: "white",
        borderRadius: 20,
        width: '60%',
        height: '25%',
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 10,
            height: 10
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 10,
        justifyContent: 'space-evenly'

    },
    button_2: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: 60,
        // backgroundColor: 'red'
        backgroundColor: "#2196F3",
    },
    textStyle_2: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText_2: {
        marginBottom: 15,
        textAlign: "center",
        fontWeight: '700',
        color: 'black'
    }
})
