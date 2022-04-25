import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react';
import ImagePicker, { openCamera, openPicker } from 'react-native-image-crop-picker';
import { Card } from 'react-native-shadow-cards';
import { Checkbox, Button, Divider, TextInput, Snackbar, Provider, Portal, Dialog, Paragraph, Title, Banner } from 'react-native-paper';
import axios from 'axios';
import AppFunction from '../../AppFunction';
import AppConstants from '../../AppConstant';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CounterBillStatus from '../../CounterBillStatus'
import { useContext } from 'react';
import { Authcontext } from '../../auth/Auth';

const ListItem = ({ route, navigation }) => {

  const auth = useContext(Authcontext)

  useEffect(() => {
    getcounterbill();
  }, [])


  const { custName, From, billno: billno, domainrecno: domainrecno, domainuserrecno: domainuserrecno, ApiCall } = route.params;

  const [list, setlist] = useState();
  const [checked, setChecked] = React.useState(false);
  const [isimage, setisimage] = useState([]);
  const [isReadOnly, setisReadOnly] = useState(false);
  const [listHeader, setlistHeader] = useState();
  const [postImage, setPostImage] = useState([]);
  const [visible, setVisible] = React.useState(false);
  const [VisibleMsg, setVisibleMsg] = useState(true);
  const [Indicator, setIndicator] = useState(false);
  const [imageIndex, setimageIndex] = useState();
  const [noBox, setnoBox] = useState(0);
  const [noBag, setnoBag] = useState(0);
  const [noSaline, setnoSaline] = useState(0);
  const [noJar, setnoJar] = useState(0);
  const [count, setcount] = useState(0);


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


    if (UpdateBillData.Success == true) {

      setlistHeader(UpdateBillData.Message);
      setlist(UpdateBillData.Message.items);

      if (UpdateBillData.Message.lockedby == 0) {

        let senddata = UpdateBillData.Message;
        addcounterbillforlock(senddata);
      }
      else {
        if(UpdateBillData.Message.lockedby == auth?.state?.userdata?.recno ) {

          setisReadOnly(false);
        }
        else {
          setisReadOnly(true);
        }
      }



    }

  }

  // Post The Image
  async function addcounterbill() {

    console.log("Api Call / Packer / addcounterbill", "listHeader:", listHeader, "status: ", "D", "packerdate:", AppFunction.getToday().dataDate, "packertime:", AppFunction.getToday().dataDate);

    let senddataapi = {

      ...listHeader,
      lockedby: 0,
      status: CounterBillStatus.disptcher,
      packerdate: AppFunction.getToday().dataDate,
      packertime: AppFunction.getTime().dataTime,
    }

    console.log('senddataapi----', senddataapi);

    const res = await axios.post(AppConstants.APIurl2 + 'addcounterbill/', senddataapi);
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


    let sendApiData = {
      images: postImage
    }

    // console.log("sendApiData.length", sendApiData.length)

    // console.log('Send Images----', sendApiData, sendApiData.images);

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


  // API Call for lock bill
  async function addcounterbillforlock(senddata) {

    console.log("Api Call /addcounterbill/", "senddata",senddata, "lockedby:",auth?.state?.userdata?.recno, "status: ", CounterBillStatus.maker  )

    let senddataapi = {

      ...senddata,
      lockedby: auth?.state?.userdata?.recno,
      status: CounterBillStatus.packer,
    }

    console.log('senddataapi----', senddataapi);

    const res = await axios.post(AppConstants.APIurl2 + 'addcounterbill/', senddataapi);
    console.log("ApiRes /addcounterbillforlock/ addcounterbill / ", res.data)

    if (res.data.Success == true) {
      console.log("Bill locked Successfully");
    }
    else {
      console.log('Failed to lock bill')
    }
  }



  const totalImage = Number(noBox) + Number(noBag) + Number(noSaline) + Number(noJar);

  // Taking Photo (function)
  const takePhoto = () => {

    if (totalImage > count) {
      ImagePicker.openCamera({
        multiple: true,
        width: 300,
        height: 400,
        cropping: true,
        includeBase64: true
      }).then(img => {
        // console.log('image=====', img);
        setPostImage((p) => {

          return [...p, { domainrecno: 508, tablerecno: billno.toString(), image: img.data, descn: null, active: true }]
        })

        setcount(count + 1);

      });
    }
    else {
      alert("You Cannot add more Images !!");
    }

  };

  console.log("postImage--", postImage)

  // Delete Image From Array
  const removeTodo = index => {
    const newTodos = [...postImage];
    newTodos.splice(index, 1);
    setPostImage(newTodos);
    console.log("NewItem", newTodos);

    setcount(count - 1);
  }

  return (
    <Provider>

      <Portal>

        <View style={{ flex: 1, alignItems: 'center', padding: '3%', }}>

          <Banner
            visible={VisibleMsg}
            actions={[
              // {
              //   label: 'Fix it',
              //   onPress: () => setVisible(false),
              // },
              // {
              //   label: 'Learn more',
              //   onPress: () => setVisible(false),
              // },
            ]}
          >
            {
              listHeader?.messages[0]?.status == 'K' ? (
                listHeader?.messages[0]?.message

              ) : null
            }
          </Banner>

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

            <View style={{ marginRight: '2%', flex: 0.15 }}>
              <MaterialCommunityIcons name={'android-messages'} size={32} color={'orange'} onPress={() => setVisibleMsg(!VisibleMsg)} />
            </View>

          </Card>

          <Card style={{ flex: 0.5, justifyContent: 'center', flexDirection: 'row', marginBottom: '4%' }} >

            {/* Box And Goni (input) */}
            <View style={{ flex: 1, paddingLeft: '3%', flexDirection: 'column', justifyContent: 'space-around', }}>

              <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginVertical: '5%', marginHorizontal: '4%', flexWrap: 'wrap' }}>

                <Title>Measure</Title>

                {/* Camera Button */}
                <TouchableOpacity
                  onPress={takePhoto}
                  style={styles.camera_btn}
                  disabled={isReadOnly ? true : false}
                >
                  <MaterialCommunityIcons name={'camera'} size={26} color={'white'} />
                </TouchableOpacity>


              </View>

              {/* <Divider /> */}

              <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginVertical: '5%', width: '98%' }}>

                {/* Box */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                  <Text style={{ fontSize: 16, fontWeight: '500' }}>Box :</Text>
                  <TextInput
                    style={{ width: '40%', height: 35 }}
                    disabled={isReadOnly ? true : false}
                    keyboardType="numeric"
                    onChangeText={(text) => {
                      setnoBox(text);
                      listHeader.boxes = text

                      // console.log('listHeader', listHeader)
                    }}
                  />
                </View>

                {/* Bag */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                  <Text style={{ fontSize: 16, fontWeight: '500' }}>Bag :</Text>
                  <TextInput
                    style={{ width: '40%', height: 35 }}
                    disabled={isReadOnly ? true : false}
                    keyboardType="numeric"
                    onChangeText={(text) => {
                      setnoBag(text);
                      listHeader.noofbags = text

                      console.log('listHeader', listHeader)
                    }}
                  />
                </View>
              </View>

              <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginVertical: '5%', width: '80%' }}>

                {/* Saline Case */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingRight: '4%' }}>
                  <Text style={{ fontSize: 16, fontWeight: '500' }}>Saline :</Text>
                  <TextInput
                    style={{ width: '35%', height: 35 }}
                    disabled={isReadOnly ? true : false}
                    keyboardType="numeric"
                    onChangeText={(text) => {
                      setnoSaline(text)
                      listHeader.noofsaline = text

                      // console.log('listHeader', listHeader)
                    }}
                  />
                </View>

                {/* Jar Case */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                  <Text style={{ fontSize: 16, fontWeight: '500' }}>Jar :</Text>
                  <TextInput
                    style={{ width: '40%', height: 35 }}
                    disabled={isReadOnly ? true : false}
                    keyboardType="numeric"
                    onChangeText={(text) => {
                      setnoJar(text)
                      listHeader.noofjar = text

                      // console.log('listHeader', listHeader)
                    }}
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
                          <>
                            <TouchableOpacity onPress={() => {
                              setimageIndex(index);
                              showDialog()
                            }}>

                              <Image source={{ uri: `data:image/png;base64,${img.image}` }} style={styles.image} />
                              {/* // <Image source={{ uri: img }} style={styles.image} /> */}
                            </TouchableOpacity>

                            <TextInput
                              style={{ width: '40%', height: 35 }}
                              onChangeText={(text) => {
                                img.descn = text;
                              }}
                            />
                          </>
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
                disabled={isReadOnly ? true : false}
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

      </Portal>
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