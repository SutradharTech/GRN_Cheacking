import { StyleSheet, Text, View, FlatList, TouchableOpacity, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Card } from 'react-native-shadow-cards';
import Icon from 'react-native-vector-icons/Ionicons';
import { TestScheduler } from 'jest';
import { Checkbox, Button, Divider, Dialog, Portal, Provider, TextInput } from 'react-native-paper';
import axios from 'axios';
import AppFunction from '../../AppFunction';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { color } from 'react-native-reanimated';
import AppConstants from '../../AppConstant';


// console.log("item", route.params.item)
const ItemList = ({ route, navigation }) => {

  const [list, setlist] = useState();
  const [listHeader, setlistHeader] = useState();
  const [dialog, setdialog] = useState(false);

  const { CustName, From, billno: billno, domainrecno: domainrecno, domainuserrecno: domainuserrecno, ApiCall } = route.params;

  const showDialog = () => setdialog(true);

  const hideDialog = () => setdialog(false);


  useEffect(() => {
    getcounterbill();
  }, [])


  console.log("list ---> ", list)

  // Api Call for items according to bill
  async function getcounterbill() {

    console.log("ApiCall // getcounterbill ", "billno:", billno, "domainrecno:", domainrecno, "domainuserrecno:", domainuserrecno)

    var sendapidata = {
      "domainrecno": domainrecno,
      "billno": billno,
      "domainuserrecno": domainuserrecno
    }

    const { data: UpdateBillData } = await axios.post(AppConstants.APIurl2 + 'getcounterbill/', sendapidata);
    console.log("ApiRes // getcounterbill", UpdateBillData.Message)

    setlistHeader(UpdateBillData.Message);
    setlist(UpdateBillData.Message.items);

    // if (UpdateBillData.Success == true) {
    // }
    // else {
    //   alert('Response is Failed');
    // }
  }


  // Resend Data to previous status 
  async function resendCounterBill() {

    let senddataapi = {

      ...listHeader,
      status: "RM"

    }

    console.log('Resenddataapi----', senddataapi);

    const { data: UpdateBillData } = await axios.post(AppConstants.APIurl2 + 'addcounterbill/', senddataapi);
    console.log("ApiRes // getcounterbill", UpdateBillData)

    if (UpdateBillData.Success == true) {
      ApiCall();
      navigation.navigate('Checker');
    }

  }


  // Post Api Call (Send to next page) 
  async function addcounterbill() {

    console.log("Api Call / addcounterbill /", "listHeader:", listHeader, "status:", "K", "checkerdate: ", AppFunction.getToday().dataDate, "checkertime: ", AppFunction.getTime().dataTime)

    let senddataapi = {
      ...listHeader,
      status: "K",
      checkerdate: AppFunction.getToday().dataDate,
      checkertime: AppFunction.getTime().dataTime
    }

    console.log('senddataapi----', senddataapi);

    const { data: UpdateBillData } = await axios.post(AppConstants.APIurl2 + 'addcounterbill/', senddataapi);
    console.log("ApiRes // getcounterbill", UpdateBillData)

    if (UpdateBillData.Success == true) {
      ApiCall();
      navigation.navigate('Checker');
    }

  }


  // Function to check all checkbox is true  
  function SubmitCondition() {
    const result = list.filter(Check);

    function Check(item) {
      return item.checked == false;
    }
    console.log("Check------>", result.length)
    if (result.length == 0) {
      // list.map((itm) => {
      //   console.log('itm=======', itm);
      // })
      addcounterbill();
    }
    else {
      alert('Please Check All box')
    }
  }


  // Formating Function For Date by DDMMYYYY
  const showDate_ddmmyy = (ab) => {
    let x = ab;
    // console.log("sec", x);
    let dt = ""
    if (x != null) {

      let y = x.toString();
      // dt = y.slice(6, 8) + "/" + y.slice(4, 6) + "/" + y.slice(0, 4);
      dt = y.slice(4, 6) + "/" + y.slice(0, 4);
    }
    return dt;
  };


  // Checkbox Select Api Call
  async function counterbillfooter(item) {

    console.log("ApiCall // counterbillfooter/", item);

    var senddataapi = {
      "recno": item.recno,
      "shortguid": item.shortguid,
      "itemrecno": item.itemrecno,
      "itembatchno": item.itembatchno,
      "expdate": item.expdate,
      "qty": item.qty,
      "rate": item.rate,
      "amount": item.amount,
      "discountamt": item.discountamt,
      "picked": item.picked,
      "checked": item.checked,
      "active": item.active,
      "approvalstatus": item.approvalstatus,
      "descn": item.descn,
      "code": item.code,
      "hsn": item.hsn,
      "cgstrate": item.cgstrate,
      "igstrate": item.igstrate,
      "sgstrate": item.sgstrate,
      "packtyperecno": item.packtyperecno,
      "packtypedescn": item.packtypedescn,
      "categoryrecno": item.categoryrecno,
      "categorydescn": item.categorydescn,
      "uomrecno": item.uomrecno,
      "UOM": item.UOM,
      "salerate": item.salerate,
      "mrp": item.mrp,
      "outerbox": item.outerbox,
      "innerbox": item.innerbox,
      "pack": item.pack,
      "unit": item.unit
    }

    console.log("Senddataapi/   counterbillfooter/----", senddataapi);

    const FooterBillData = await axios.patch(AppConstants.APIurl2 + 'counterbillfooter/', senddataapi);
    console.log("ApiRes // counterbillfooter/", FooterBillData.data)
    // setsalebillfooter(FooterBillData.data);
  }



  // Flatlist Header
  const ListHeader = () => {
    //View to set in Header
    return (
      <Card style={{ width: '100%', backgroundColor: 'ghostwhite', marginBottom: '2%', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>

        <View style={{flexDirection: 'row', flex: 0.9, paddingLeft: '2%'}}>
          <MaterialCommunityIcons name={'account-circle'} size={32} color={'orange'} />
          <Text style={{ ...styles.content_text, fontWeight: '600', color: 'grey', fontSize: 16, marginRight: '15%', }}>{CustName}</Text>
        </View>

        <View style={{flex: 0.4 ,alignItems: 'center'}}>
          <Text style={{ ...styles.content_text, fontWeight: '600', color: 'grey', fontSize: 15, marginRight: '30%', }}>Created By</Text>
          <Text style={{ ...styles.content_text, fontWeight: '600', color: 'grey', fontSize: 16, marginRight: '30%', }}>{From}</Text>
        </View>
        {/* <Text style={{ ...styles.content_text, fontWeight: '600', color: 'grey', fontSize: 18, marginRight: '35%', }}>{listHeader?.custDescn}</Text> */}
      </Card>
    );
  };

  function renderItems({ item, index }) {
    return (
      <>
        <View style={{ flex: 1, backgroundColor: 'ghostwhite', margin: 5, }}>

          <Card style={styles.Body_Main_Card}>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

              {/* Item Name */}

              <View style={{ ...styles.card_subViews, flex: 1.7 }}>
                <Text style={styles.Heder_Text} >{item.descn}</Text>
              </View>

              {/* Checkbox View */}

              <View style={{ flex: 0.2, justifyContent: 'space-evenly', alignItems: 'center', borderRadius: 12, flexDirection: 'row' }}>

                <View>
                  <Checkbox

                    color={'dodgerblue'}
                    // key={item.key}
                    status={list[index].checked ? 'checked' : 'unchecked'}
                    onPress={(n) => {
                      // console.log('n==>', n)
                      setlist((p) => {
                        p[index].checked = !p[index].checked;
                        let item = p[index];
                        counterbillfooter(item)

                        return [...p]
                      })

                    }}
                  />
                </View>
              </View>
            </View>

            <Divider style={{ marginRight: '5%', marginTop: '1%' }} />


            {/* Item Details */}

            {/* Quantity And Expiry Date */}
            <View style={{ ...styles.card_subViews, justifyContent: 'space-around', marginTop: '1%' }}>

              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', }}>

                <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-evenly', }}>

                  <View>
                    <Text style={{ fontWeight: '400' }}>Quntity : </Text>
                  </View>
                  <View>
                    <Text style={{ fontWeight: '800' }}>{item.qty}</Text>
                  </View>

                </View>

                <View style={{ flex: 1.5, justifyContent: 'center', flexDirection: 'row', justifyContent: 'space-evenly', }}>

                  <View>
                    <Text style={{ fontWeight: '400' }}>Expiry Date:</Text>
                  </View>
                  <View>
                    <Text style={{ fontWeight: '700' }}>{showDate_ddmmyy(item.expdate)} </Text>
                  </View>

                </View>

              </View>

            </View>

            {/* Amount And MRP */}
            <View style={{ ...styles.card_subViews, justifyContent: 'space-around', marginTop: '1%' }}>

              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', }}>

                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', flexWrap: 'wrap' }}>

                  <View>
                    <Text style={{ fontWeight: '400' }}>Amount : </Text>
                  </View>

                  <View>
                    <Text style={{ fontWeight: '600' }}>Rs. {item.amount}</Text>
                  </View>

                </View>

                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', flexWrap: 'wrap' }}>

                  <View>
                    <Text style={{ fontWeight: '400' }}>MRP : </Text>
                  </View>

                  <View>
                    <Text style={{ fontWeight: '600' }}>{item.mrp}</Text>
                  </View>

                </View>

              </View>

            </View>

            {/* Free And Batch */}
            <View style={{ ...styles.card_subViews, justifyContent: 'space-around', marginTop: '1%' }}>

              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>

                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', flexWrap: 'wrap' }}>

                  <View>
                    <Text style={{ fontWeight: '400' }}>Free Qty : </Text>
                  </View>

                  <View>
                    <Text style={{ fontWeight: '600' }}>{item.free}</Text>
                  </View>

                </View>

                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', flexWrap: 'wrap' }}>

                  <View>
                    <Text style={{ fontWeight: '400' }}>Batch No : </Text>
                  </View>

                  <View>
                    <Text style={{ fontWeight: '600' }}>{item.itembatchno}</Text>
                  </View>

                </View>

              </View>

            </View>

          </Card>

        </View>
      </>
    )
  }

  return (
    <Provider>
      <View style={{ flex: 1 }}>
        <FlatList
          // data={BillDetails}
          data={list}
          renderItem={renderItems}
          showsVerticalScrollIndicator={true}
          // onEndReached={onEndReachedHandler}
          keyExtractor={(item) => item.recno.toString()}
          ListHeaderComponent={ListHeader}
        />

        {/* Submit button and Resend Button */}

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>

          <TouchableOpacity style={{ width: '50%' }}>
            <Button
              style={{ backgroundColor: 'white', width: '80%', alignSelf: 'center', borderWidth: 0.3, borderColor: 'orange' }}
              // onPress={ResendBill}
              onPress={() => setdialog(true)}
            >
              <Text style={{ color: 'orange' }}>Resend</Text>
            </Button>
          </TouchableOpacity>

          <TouchableOpacity style={{ width: '50%' }} >
            <Button
              style={{ backgroundColor: 'orange', width: '80%', alignSelf: 'center', }}
              onPress={SubmitCondition}
            >
              <Text style={{ color: 'white' }}>Submit</Text>
            </Button>
          </TouchableOpacity>

        </View>

        {
          dialog ? (
            <Portal>
              <Dialog visible={showDialog} onDismiss={hideDialog}>

                <Dialog.Title>Message</Dialog.Title>

                <TextInput
                  style={{ fontWeight: '600', height: 40, width: '85%', alignSelf: 'center' }}
                  multiline={true}
                  onChangeText={(text) => {
                    listHeader.message = text

                    console.log('listHeader---------->', listHeader)
                  }}
                />

                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                  <Button onPress={() => {
                    // list.map((itm) => {
                    //   console.log('itm=======', itm);
                    // })
                    resendCounterBill();
                  }} >Resend</Button>

                  <Button onPress={hideDialog}>Exit</Button>
                </View>

              </Dialog>
            </Portal>
          ) : null
        }

      </View>
    </Provider>


  )
}

export default ItemList

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
  Body_Main_Card_selected: {
    width: '98%',
    height: '100%',
    backgroundColor: '#D6D6D6',
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
})