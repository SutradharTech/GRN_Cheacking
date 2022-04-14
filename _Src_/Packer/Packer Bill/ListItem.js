import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react';
import ImagePicker, { openCamera, openPicker } from 'react-native-image-crop-picker';
import { Card } from 'react-native-shadow-cards';
import { Checkbox, Button, Divider, TextInput, Snackbar, Provider, Portal, Dialog, Paragraph, Title } from 'react-native-paper';
import axios from 'axios';
import AppFunction from '../../AppFunction';
import AppConstants from '../../AppConstant';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CounterBillStatus from '../../CounterBillStatus'

const ListItem = ({ route, navigation }) => {

  useEffect(() => {
    getcounterbill();
  }, [])


  const { custName, From, billno: billno, domainrecno: domainrecno, domainuserrecno: domainuserrecno, ApiCall } = route.params;

  const [list, setlist] = useState();
  const [checked, setChecked] = React.useState(false);
  const [isimage, setisimage] = useState([]);
  const [listHeader, setlistHeader] = useState();
  const [postImage, setPostImage] = useState([]);
  const [visible, setVisible] = React.useState(false);
  const [Indicator, setIndicator] = useState(false);
  const [imageIndex, setimageIndex] = useState();


  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);


  // Api Call for items according to bill
  async function getcounterbill() {

    console.log("ApiCall // getcounterbill", "billno:", billno, 'maker date:', 36363737, "domainrecno:", domainrecno, "domainuserrecno:", domainuserrecno)

    var sendapidata = {
      "domainrecno": domainrecno,
      "billno": billno,
      "domainuserrecno": domainuserrecno
    }

    const { data: UpdateBillData } = await axios.post(AppConstants.APIurl2 + 'getcounterbill/', sendapidata);
    // console.log("ApiRes // getcounterbill", UpdateBillData.Message)

    setlistHeader(UpdateBillData.Message);
    setlist(UpdateBillData.Message.items);
    // if (UpdateBillData.Success == true) {
    // }

  }

  // Post The Image
  async function addcounterbill() {

    console.log("Api Call / Packer / addcounterbill", "listHeader:", listHeader, "status: ", "D", "packerdate:", AppFunction.getToday().dataDate, "packertime:", AppFunction.getToday().dataDate);

    let senddataapi = {

      ...listHeader,
      status: CounterBillStatus.disptcher,
      packerdate: AppFunction.getToday().dataDate,
      packertime: AppFunction.getTime().dataTime,
    }

    console.log('senddataapi----', senddataapi);

    const res  = await axios.post(AppConstants.APIurl2 + 'addcounterbill/', senddataapi);
    console.log("ApiRes // addcounterbill", res.data)

    if (res.data.Success == true) {
      ApiCall();
      navigation.navigate('PackerList');
    }
    else {
      console.log('Failed')
    }
  }



  // Post Api Call (Send to next page) 
  async function addcounterbillimages() {

    let myImages = postImage.map((i) => {
      console.log("i----", i)
      return {
        "domainrecno": 508,
        "tablerecno": billno.toString(),
        "image": JSON.stringify(i),
        "active": true
      }
    })


    let sendApiData = {
      images: myImages
    }

    console.log("sendApiData.length", sendApiData.length)

    console.log('Send Images----', sendApiData, sendApiData.images);

    const { data: res } = await axios.post(AppConstants.APIurl2 + 'addcounterbillimages/', sendApiData);
    console.log("ApiRes // addcounterbillimages", res)

    if (res.Success == true) {
      addcounterbill();
      setIndicator(false)
    }
    else {
      console.log('Failed')
    }
  }

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

      setPostImage((p) => {

        return [...p, img.data]
      })

    });
  };


  // Delete Image From Array
  const removeTodo = index => {
    const newTodos = [...postImage];
    newTodos.splice(index, 1);
    setPostImage(newTodos);
    console.log("NewItem", newTodos);
  }




  return (
    <Provider>
      <View style={{ flex: 1, alignItems: 'center', padding: '3%', }}>

        {/* Customer Name And Created By */}
        <Card style={{ width: '100%', backgroundColor: 'ghostwhite', marginBottom: '2%', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>

          <View style={{ flexDirection: 'row', flex: 0.9, alignItems: 'center' }}>
            <MaterialCommunityIcons name={'account-circle'} size={32} color={'orange'} />
            <Text style={{ ...styles.content_text, fontWeight: '600', color: 'grey', fontSize: 16, marginRight: '15%' }}>{custName}</Text>
          </View>

          <View style={{ flex: 0.4, alignItems: 'center' }}>
            <Text style={{ ...styles.content_text, fontWeight: '600', color: 'grey', fontSize: 15, marginRight: '20%' }}>Created By</Text>
            <Text style={{ ...styles.content_text, fontWeight: '600', color: 'grey', fontSize: 16, marginRight: '20%' }}>{From}</Text>
          </View>

        </Card>

        <Card style={{ flex: 0.5, justifyContent: 'center', flexDirection: 'row', marginBottom: '4%' }} >

            
          {/* Box And Goni (input) */}
          <View style={{ flex: 1, paddingLeft: '3%', flexDirection: 'column', justifyContent: 'space-around', }}>

            <View style={{ justifyContent: 'space-between', flexDirection: 'row',marginVertical: '5%', marginHorizontal: '4%', flexWrap: 'wrap' }}>

              <Title>Measure</Title>

              {/* Camera Button */}
              <TouchableOpacity onPress={takePhoto} style={styles.camera_btn} >
                <MaterialCommunityIcons name={'camera'} size={26} color={'white'} />
              </TouchableOpacity>


            </View>

            {/* <Divider /> */}

            <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginVertical: '5%', width: '98%' }}>

              {/* Box */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                <Text style={{ fontSize: 16, fontWeight: '500' }}>Box :</Text>
                <TextInput
                  style={{ width: '40%', height: 35 }}
                  onChangeText={(text) => {
                    listHeader.boxes = text

                    // console.log('listHeader', listHeader)
                  }}
                />
              </View>

              {/* Goni */}

              <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center',paddingRight: '4%' }}>
                <Text style={{ fontSize: 16, fontWeight: '500' }}>Goni :</Text>
                <TextInput
                  style={{ width: '40%', height: 35 }}
                // onChangeText={(text) => {
                //   listHeader.boxes = text

                //   // console.log('listHeader', listHeader)
                // }}
                />
              </View>

            </View>

            <View style={{ justifyContent: 'space-between', flexDirection: 'row',marginVertical: '5%', width: '80%' }}>

              {/* Bag */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                <Text style={{ fontSize: 16, fontWeight: '500' }}>Bag :</Text>
                <TextInput
                  style={{ width: '40%', height: 35 }}
                  // onChangeText={(text) => {
                  //   listHeader.boxes = text

                  //   console.log('listHeader', listHeader)
                  // }}
                />
              </View>

              {/* Saline Case */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingRight: '4%' }}>
                <Text style={{ fontSize: 16, fontWeight: '500' }}>Saline Case :</Text>
                <TextInput
                  style={{ width: '35%', height: 35 }}
                // onChangeText={(text) => {
                //   listHeader.boxes = text

                //   // console.log('listHeader', listHeader)
                // }}
                />
              </View>

            </View>

            <View style={{ justifyContent: 'space-between', flexDirection: 'row',marginVertical: '5%', width: '80%' }}>

              {/* Jar Case */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                <Text style={{ fontSize: 16, fontWeight: '500' }}>Jar Case :</Text>
                <TextInput
                  style={{ width: '40%', height: 35 }}
                // onChangeText={(text) => {
                //   listHeader.boxes = text

                //   // console.log('listHeader', listHeader)
                // }}
                />
              </View>
            </View>

          </View>

        </Card>

        <Card style={{ flex: 1, padding: '2%', justifyContent: 'space-around', }}>

          <Divider />

          <ScrollView >

            {
              isimage != null ? (
                <View style={styles.image_view} >

                  {

                    postImage.map((img, index) => {

                      return (
                        <TouchableOpacity onPress={() => {
                          setimageIndex(index);
                          showDialog()
                        }}>

                          <Image source={{ uri: `data:image/png;base64,${img}` }} style={styles.image} />
                          {/* // <Image source={{ uri: img }} style={styles.image} /> */}
                        </TouchableOpacity>
                      )

                    })

                  }
                </View>
              ) : (
                <View style={styles.image_view}>
                  <Text>Please Click the image</Text>
                </View>
              )
            }
          </ScrollView>

          {/* Submit button */}
          <TouchableOpacity>
            <Button
              style={{ backgroundColor: 'orange', width: '40%', alignSelf: 'center', elevation: 5 }}
              onPress={() => {

                if (postImage.length > 0) {
                  addcounterbillimages()
                }
                else {
                  console.log('Failed')
                }

              }}
            >
              <Text style={{ color: 'white' }}>Submit</Text>
            </Button>
          </TouchableOpacity>
        </Card>


        {/* Dialog */}
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Alert</Dialog.Title>
            <Dialog.Content>
              <Paragraph>You Want to Delete this Image</Paragraph>
            </Dialog.Content>

            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <Dialog.Actions>

                <Button
                  onPress={() => { removeTodo(imageIndex), hideDialog(); }}>Done</Button>

              </Dialog.Actions>

              <Dialog.Actions>
                <Button onPress={() => { setimageIndex(null), hideDialog() }}>Cancel</Button>
              </Dialog.Actions>
            </View>

          </Dialog>
        </Portal>


      </View>
    </Provider>

  )
}

export default ListItem

const styles = StyleSheet.create({

  content_text: {
    fontSize: 15,
    color: 'black',
    marginLeft: '2%',
    marginVertical: '2.5%'
  },
  card_subViews: {
    padding: '1%'
  },
  Body_Main_Card: {
    width: '98%',
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: '2%',
    marginHorizontal: 5,
  },
  Heder_Text: {
    color: "black",
    fontSize: 15,
    fontWeight: '500',
    // fontFamily: 'monospace'
  },
  textStyle: {
    textAlign: 'center',
    color: '#000',
    fontSize: 18,
    padding: 7,
  },
  camera_btn: {
    height: 40,
    width: 40,
    borderRadius: 25,
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 7,
    zIndex: 1
  },
  Camera_btn: {
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
  image: {
    width: 250,
    height: 200,
    marginVertical: '2%',
    // marginHorizontal: '1%'

  },
  image_view: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: '2%',
    paddingHorizontal: '2%',
    // backgroundColor: 'red'
  },
})