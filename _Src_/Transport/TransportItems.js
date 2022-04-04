import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react';
import ImagePicker, { openCamera, openPicker } from 'react-native-image-crop-picker';
import { Card } from 'react-native-shadow-cards';
import { Button } from 'react-native-paper';
import axios from 'axios';
import AppFunction from '../AppFunction';
import AppConstants from '../AppConstant';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// console.log("item", route.params.item)
const TransportItems = ({ route, navigation }) => {

  useEffect(() => {
    getcounterbill();
  }, [])


  const { billno: billno, domainrecno: domainrecno, domainuserrecno: domainuserrecno, ApiCall } = route.params;

  const [list, setlist] = useState();
  const [checked, setChecked] = React.useState(false);
  const [isimage, setisimage] = useState();
  const [listHeader, setlistHeader] = useState();

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



  // Post Api Call (Send to next page) 
  async function addcounterbill(itm) {

    console.log('itm-----', itm);
    console.log('ListHeader-----', listHeader)

    let senddataapi = {
      "items": [
        {
          "recno": itm.recno,
          "shortguid": itm.shortguid,
          "itemrecno": itm.itemrecno,
          "itembatchno": itm.itembatchno,
          "expdate": itm.expdate,
          "qty": itm.qty,
          "rate": itm.rate,
          "amount": itm.amount,
          "discountamt": itm.discountamt,
          "picked": itm.picked,
          "active": itm.active,
          "approvalstatus": itm.approvalstatus,
          "descn": itm.descn,
          "code": itm.code,
          "hsn": itm.hsn,
          "cgstrate": itm.cgstrate,
          "igstrate": itm.igstrate,
          "sgstrate": itm.sgstrate,
          "packtyperecno": itm.packtyperecno,
          "packtypedescn": itm.packtypedescn,
          "categoryrecno": itm.categoryrecno,
          "categorydescn": itm.categorydescn,
          "uomrecno": itm.uomrecno,
          "UOM": itm.UOM,
          "salerate": itm.salerate,
          "mrp": itm.mrp,
        }
      ],
      "image": listHeader.image,
      "custDescn": listHeader.custDescn,
      "creditallowed": listHeader.creditallowed,
      "shortguid": listHeader.shortguid,
      "customerdomainrecno": listHeader.customerdomainrecno,
      "customerrecno": listHeader.customerrecno,
      "mobile": listHeader.mobile,
      "trdate": listHeader.trdate,
      "trtime": listHeader.trtime,
      "billno": listHeader.billno,
      "lockedby": listHeader.lockedby,
      "lockedby": listHeader.lockedby,
      "status": "CR",
      "message": listHeader.message,
      "makerdate": listHeader.makerdate,
      "makertime": listHeader.makertime,
      "checkerdate": listHeader.checkerdate,
      "checkertime": listHeader.checkertime,
      "packerdate": listHeader.packerdate,
      "packertime": listHeader.packertime,
      "dispatchdate": listHeader.dispatchdate,
      "dispatchtime": listHeader.dispatchtime,
      "transportpickup": listHeader.transportpickup,
      "transportdate": AppFunction.getToday().dataDate,
      "transporttime": AppFunction.getTime().dataTime,
      "receiverdate": listHeader.receiverdate,
      "receivertime": listHeader.receivertime,
      "boxes": listHeader.boxes,
      "active": listHeader.active,
      "amount": listHeader.amount,
      "discountamt": listHeader.discountamt,
      "logo": listHeader.logo,
      "cashamt": listHeader.cashamt,
      "cardamt": listHeader.cardamt,
      "walletamt": listHeader.walletamt,
      "pointsamt": listHeader.pointsamt,
      "creditamt": listHeader.creditamt,
      "salereturnamt": listHeader.salereturnamt,
      "cardrefid": listHeader.cardrefid,
      "walletrefid": listHeader.walletrefid,
      "cgstamt": listHeader.cgstamt,
      "sgstamt": listHeader.sgstamt,
      "igstamt": listHeader.igstamt,
      "roundamt": listHeader.roundamt,
      "spotdiscountamt": listHeader.spotdiscountamt,
      "tokenno": listHeader.tokenno,
      "domainposrecno": listHeader.domainposrecno,
      "domainrecno": listHeader.domainrecno,
      "domainuserrecno": listHeader.domainuserrecno
    }

    console.log('senddataapi----', senddataapi);

    const { data: UpdateBillData } = await axios.post(AppConstants.APIurl2 + 'addcounterbill/', senddataapi);
    console.log("ApiRes // getcounterbill", UpdateBillData)

    if (UpdateBillData.Success == true) {
      ApiCall();
      navigation.navigate('Transport1');
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
      // setlist((p) => {
      //   p[selectedIndex].image = image.path

      //   return [...p]
      // })
      // console.log('================', list)
    });
  };

  return (
    <>
      <Card style={{ width: '100%', backgroundColor: 'ghostwhite', marginBottom: '2%', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
        <MaterialCommunityIcons name={'account-circle'} size={32} color={'orange'} />
        <Text style={{ ...styles.content_text, fontWeight: '600', color: 'grey', fontSize: 18, marginRight: '35%' }}>{listHeader?.custDescn}</Text>
      </Card>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

        <Card style={{ flex: 0.4, alignItems: 'center', justifyContent: 'space-around', padding: '2%' }}>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: '100%' }}>

            <Text style={{ fontSize: 18, fontWeight: '600' }}>Box :</Text>
            <Text style={{ fontSize: 18, fontWeight: '600' }}>{listHeader?.boxes}</Text>

            {/* Camera Button */}

            {/* <TouchableOpacity onPress={takePhoto} style={styles.video_btn} >
              <MaterialCommunityIcons name={'camera'} size={30} color={'orange'} />
            </TouchableOpacity>
            */}

          </View> 


            {/* {
            isimage != null ? (
              <View style={styles.image_view}>

                <Image source={{ uri: isimage }} style={styles.image} />

              </View>
            ) : (
              <View style={styles.image_view}>
                <Text>Please Click the image</Text>
              </View>
            )
          } */}


            {/*  Show Image  */}
            <View style={styles.image_view}>

              <Image source={{ uri: `data:image/png;base64,${listHeader?.image}` }} style={styles.image} />

            </View>

        </Card>


        {/* Submit button */}

        <TouchableOpacity>
          <Button
            style={{ backgroundColor: 'orange', width: '40%', alignSelf: 'center', top: '50%', elevation: 5 }}
            onPress={() => {
              list.map((itm) => {
                console.log('itm=======', itm);
                addcounterbill(itm);
              })
            }}
          >
            <Text style={{ color: 'white' }}>Submit</Text>
          </Button>
        </TouchableOpacity>

      </View>
    </>
  )
}

export default TransportItems

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