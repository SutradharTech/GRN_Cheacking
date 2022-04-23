import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react';
import ImagePicker, { openCamera, openPicker } from 'react-native-image-crop-picker';
import { Card } from 'react-native-shadow-cards';
import Icon from 'react-native-vector-icons/Ionicons';
import { TestScheduler } from 'jest';
import { Checkbox, Button, Divider, TextInput, Provider, Portal, Dialog, Title, Banner } from 'react-native-paper';
import axios from 'axios';
import AppFunction from '../../AppFunction';
import AppConstants from '../../AppConstant';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// console.log("item", route.params.item)
const RevertedItems = ({ route, navigation }) => {

  useEffect(() => {
    getcounterbill();
    getcounterbillimages();
  }, [])


  const { custName, From, billno: billno, domainrecno: domainrecno, domainuserrecno: domainuserrecno, ApiCall } = route.params;

  const [list, setlist] = useState();
  const [checked, setChecked] = React.useState(false);
  const [isimage, setisimage] = useState();
  const [listHeader, setlistHeader] = useState();
  const [arrImages, setarrImages] = useState([]);
  const [VisibleMsg, setVisibleMsg] = useState(true);

  // Api Call for items according to bill
  async function getcounterbill() {

    console.log("ApiCall // getcounterbill", "billno:", billno, 'maker date:', 36363737, "domainrecno:", domainrecno, "domainuserrecno:", domainuserrecno)

    var sendapidata = {
      "domainrecno": domainrecno,
      "billno": billno,
      "domainuserrecno": domainuserrecno
    }

    const { data: UpdateBillData } = await axios.post(AppConstants.APIurl2 + 'getcounterbill/', sendapidata);
    console.log("ApiRes // getcounterbill", UpdateBillData.Message)

    setlistHeader(UpdateBillData.Message);
    if (UpdateBillData.Success == true) {
      setlist(UpdateBillData.Message.items);
    }

  }

  // Get Image (According to Billno) 
  async function getcounterbillimages() {

    console.log("Api Call / Dispatcher / getcounterbillimages /", "domainrecno:", 508, "tablerecno:", billno);

    let senddataapi = {

      "domainrecno": 508,
      "tablerecno": billno.toString()

    }

    console.log('senddataapi----', senddataapi);

    const { data: res } = await axios.post(AppConstants.APIurl2 + 'getcounterbillimages/', senddataapi);
    console.log("ApiRes // getcounterbillimages", res)

    setarrImages(res.Message)

  }

  console.log("Arr Images----", arrImages)

  // Post Api Call (Send to next page) 
  async function addcounterbill() {

    console.log("Api Call / Dispatcher / addcounterbill /", "listHeader", listHeader, "status:", "T", "dispatchdate:", AppFunction.getToday().dataDate, "dispatchtime:", AppFunction.getTime().dataTime);

    let senddataapi = {

      ...listHeader,
      status: "T",
      dispatchdate: AppFunction.getToday().dataDate,
      dispatchtime: AppFunction.getTime().dataTime

    }

    console.log('senddataapi----', senddataapi);

    const { data: UpdateBillData } = await axios.post(AppConstants.APIurl2 + 'addcounterbill/', senddataapi);
    console.log("ApiRes // getcounterbill", UpdateBillData)

    if (UpdateBillData.Success == true) {
      ApiCall();
      navigation.navigate('Dispatcher');
    }
    else {
      console.log('Failed')
    }
  }

  console.log("list ---> ", list)

  const takePhoto = () => {   // Taking Photo (function) 

    ImagePicker.openCamera({
      multiple: true,
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log('image=====', image.path);

      setisimage(image.path);

    });
  };

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
              listHeader?.messages[0]?.status == 'RD' ? (
                listHeader?.messages[0]?.message

              ) : null
            }
          </Banner>


          {/* Customer Name & Created by*/}
          <Card style={{ width: '100%', backgroundColor: 'ghostwhite', marginBottom: '2%', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>

            <View style={{ flex: 0.9, flexDirection: 'row', alignItems: 'center' }}>
              <MaterialCommunityIcons name={'account-circle'} size={32} color={'orange'} />
              <Text style={{ ...styles.content_text, fontWeight: '600', color: 'grey', fontSize: 16, marginRight: '25%' }}>{custName}</Text>
            </View>

            <View style={{ flex: 0.4, alignItems: 'center' }}>
              <Text style={{ ...styles.content_text, fontWeight: '600', color: 'grey', fontSize: 15, marginRight: '15%' }}>Created By</Text>
              <Text style={{ ...styles.content_text, fontWeight: '600', color: 'grey', fontSize: 16, marginRight: '15%' }}>{From}</Text>
            </View>

            <View style={{ marginRight: '2%', flex: 0.15 }}>
              <MaterialCommunityIcons name={'android-messages'} size={32} color={'orange'} onPress={() => setVisibleMsg(!VisibleMsg)} />
            </View>

          </Card>

          {/* Measure */}
          <Card style={{ flex: 0.5, justifyContent: 'center', flexDirection: 'row', marginBottom: '4%' }} >


            {/* Box And Goni (input) */}
            <View style={{ flex: 1, paddingLeft: '3%', flexDirection: 'column', justifyContent: 'space-around', }}>

              <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginVertical: '5%', marginHorizontal: '4%', flexWrap: 'wrap' }}>

                <Title>Measure</Title>

              </View>

              {/* <Divider /> */}

              <View style={{ justifyContent: 'space-around', flexDirection: 'row', marginVertical: '5%', width: '100%', }}>

                {/* Box */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', flex: 1 }}>
                  <Text style={{ fontSize: 16, fontWeight: '500' }}>Box :</Text>
                  <Text style={{ fontSize: 16, fontWeight: '500' }}>{listHeader?.boxes}</Text>
                </View>

                {/* Bag */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', flex: 0.6 }}>
                  <Text style={{ fontSize: 16, fontWeight: '500' }}>Bag :</Text>
                  <Text style={{ fontSize: 16, fontWeight: '500' }}>{listHeader?.noofbags}</Text>
                </View>


              </View>

              <View style={{ justifyContent: 'space-around', flexDirection: 'row', marginVertical: '5%', width: '100%' }}>


                {/* Saline Case */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingRight: '4%', flex: 1 }}>
                  <Text style={{ fontSize: 16, fontWeight: '500' }}>Saline Case :</Text>
                  <Text style={{ fontSize: 16, fontWeight: '500' }}>{listHeader?.noofsaline}</Text>
                </View>

                {/* Jar Case */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', flex: 1 }}>
                  <Text style={{ fontSize: 16, fontWeight: '500' }}>Jar Case :</Text>
                  <Text style={{ fontSize: 16, fontWeight: '500' }}>{listHeader?.noofjar}</Text>

                </View>
              </View>

              <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginVertical: '5%', width: '100%' }}>
                {/* Goni */}
                {/* <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingRight: '4%', flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: '500' }}>Goni :</Text>
                <Text style={{ fontSize: 16, fontWeight: '500' }}>Goni</Text>
              </View> */}

              </View>

            </View>

          </Card>

          <Card style={{ flex: 1, padding: '2%', justifyContent: 'space-around', }}>

            <Divider />

            <ScrollView >

              {
                arrImages != null ? (
                  <View style={styles.image_view} >
                    {

                      arrImages.map((img) => {
                        return (

                          <View style={{ borderWidth: 0.5, borderColor: 'grey', marginBottom: '4%' }}>
                            <Image source={{ uri: `data:image/png;base64,${img.image}` }} style={styles.image} />
                            {/* <Image source={{ uri: img }} style={styles.image} /> */}
                            <Text style={{ color: 'black', textAlign: 'center' }}>{img?.descn}</Text>
                          </View>
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

            {/* Submit button and Resend Button */}

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>

              {/* Submit */}
              <TouchableOpacity style={{ width: '50%' }}>
                <Button
                  style={{ backgroundColor: 'orange', width: '80%', alignSelf: 'center', elevation: 5 }}
                  onPress={() => {

                    addcounterbill();
                  }}
                >
                  <Text style={{ color: 'white' }}>Submit</Text>
                </Button>
              </TouchableOpacity>
            </View>

          </Card>

        </View>

      </Portal>

    </Provider>
  )
}

export default RevertedItems

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
  image: {
    width: 250,
    height: 200,
    // backgroundColor: 'red'
    marginVertical: '4%'

  },
  image_view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: '2%',
    paddingHorizontal: '2%',
    // backgroundColor: ''
  },
})