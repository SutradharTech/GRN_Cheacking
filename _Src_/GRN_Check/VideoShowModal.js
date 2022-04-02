import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Modal } from 'react-native'
import VideoPlayer from 'react-native-video-player';

const VideoShowModal = ({ showVideo, setshowVideo, isVideo }) => {

    return (
        <Modal visible={showVideo} transparent={true} animationType='fade' >
            <View style={styles.centeredView_2}>
                <View style={{ ...styles.modalView_2, flex: 0.33, }}>
                    <View style={{ ...styles.video_view }}>
                        <VideoPlayer
                            // autoplay={true}
                            video={{ uri: isVideo.path }}
                        // thumbnail={{ uri: 'https://c4.wallpaperflare.com/wallpaper/108/140/869/digital-digital-art-artwork-fantasy-art-drawing-hd-wallpaper-preview.jpg' }}
                        />
                        <TouchableOpacity style={{ ...styles.button_2, alignSelf: 'center' }} onPress={() => setshowVideo(false)}>
                            <Text style={styles.textStyle_2}>Back</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal >
    );
};

export default VideoShowModal;

const styles = StyleSheet.create({

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
    video_view: {
        flex: 1,
        width: '100%',
        justifyContent: 'space-around',
    }
});
