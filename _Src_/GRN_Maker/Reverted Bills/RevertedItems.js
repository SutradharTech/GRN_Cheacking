import { StyleSheet, Text, View, FlatList, TouchableOpacity, } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Card } from 'react-native-shadow-cards';
import Icon from 'react-native-vector-icons/Ionicons';
import { TestScheduler } from 'jest';
import { Checkbox, Button, Divider, TextInput, Banner } from 'react-native-paper';
import axios from 'axios';
import { Picker } from '@react-native-community/picker';
import AppFunction from '../../AppFunction';
import AppConstants from '../../AppConstant';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// console.log("item", route.params.item)
const RevertedItems = ({ route, navigation }) => {

  const [list, setlist] = useState();
  const [flag, setflag] = useState(false);
  const [SelectedBatch, setSelectedBatch] = useState();
  const [listHeader, setlistHeader] = useState([]);
  const [dialog, setdialog] = useState(false);
  const [visible, setVisible] = React.useState(true);
  const [itemBatchList, setitemBatchList] = useState([]);

  const { custName, From, billno: billno, domainrecno: domainrecno, domainuserrecno: domainuserrecno, ApiCall } = route.params;
  // console.log('i=>', i);

  useEffect(() => {
    getcounterbill();
    getbatchno();
  }, [])


  console.log("list ---> ", list)

  // Api Call for ItemBatch List
  async function getbatchno() {

    console.log("ApiCall // getbatchno", "domainrecno:", 508, "itemrecno:", null);

    var sendapidata = {
      "domainrecno": 508,
      "itemrecno": null

    }

    const { data: ItemBatchData } = await axios.post(AppConstants.APIurl2 + 'getstockdata/', sendapidata);
    // console.log("ApiRes // getcounterbill", ItemBatchData.Message)

    setitemBatchList(ItemBatchData.Message);

  }

  // Api Call for items according to bill
  async function getcounterbill() {

    console.log("ApiCall // getcounterbill", "billno:", billno, 'maker date:', 36363737, "domainrecno:", domainrecno, "domainuserrecno:", domainuserrecno)

    var sendapidata = {
      "domainrecno": domainrecno,
      "billno": billno,
      "domainuserrecno": domainuserrecno
    }

    const { data: UpdateBillData } = await axios.post(AppConstants.APIurl2 + 'getcounterbill/', sendapidata);
    console.log("ApiRes // getcounterbill", UpdateBillData.Message.items)

    setlistHeader(UpdateBillData.Message);
    setlist(UpdateBillData.Message.items);

    // if (UpdateBillData.Success == true) {
    // }

  }

  console.log('listHeader----', listHeader);

  // Post Api Call (Send to next page) 
  async function addcounterbill() {

    console.log("Api Call / RevertedItems / addcounterbill", "listHeader:", listHeader, "status:", "Ch", "makerdate:", AppFunction.getToday().dataDate, "makertime:", AppFunction.getTime().dataTime)

    let senddataapi = {
      ...listHeader,
      status: "RC",
      makerdate: AppFunction.getToday().dataDate,
      makertime: AppFunction.getTime().dataTime
    }

    console.log('senddataapi----', senddataapi);

    const res = await axios.post(AppConstants.APIurl2 + 'addcounterbill/', senddataapi);
    console.log("ApiRes // addcounterbill", res.data.Messages)

    if (res.data.Success == true) {
      ApiCall();
      navigation.navigate('RevertedList');
    }

  }


  // Function to check all checkbox is true  
  function SubmitCondition() {
    const result = list.filter(Check);

    function Check(item) {
      return item.picked == false;
    }
    console.log("Picked------>", result.length)
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


  // Exp date format (datadate)
  const formatDate = (d) => {

    let year = d.slice(3, 7);
    let month = d.slice(0, 2);

    var dataDate = year + month

    // console.log("dataDate---------",dataDate);
  }


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
  }


  // Flatlist Header
  const ListHeader = () => {
    //View to set in Header
    return (
      <Card style={{ width: '100%', backgroundColor: 'ghostwhite', marginBottom: '2%', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', }}>

        <View style={{ flexDirection: 'row', flex: 0.9, marginLeft: '3%', alignItems: 'center' }}>
          <MaterialCommunityIcons name={'account-circle'} size={32} color={'orange'} />
          <Text style={{ ...styles.content_text, fontWeight: '600', color: 'grey', fontSize: 16, marginRight: '35%' }}>{custName}</Text>
        </View>

        <View style={{ flex: 0.6 }}>

          <Text style={{ ...styles.content_text, fontWeight: '600', color: 'grey', fontSize: 15, marginRight: '35%' }}>Created By</Text>
          <Text style={{ ...styles.content_text, fontWeight: '600', color: 'grey', fontSize: 15, marginRight: '35%' }}>{From}</Text>

        </View>

        <View style={{ marginRight: '2%', flex: 0.15 }}>
          <MaterialCommunityIcons name={'android-messages'} size={32} color={'orange'} onPress={() => setVisible(!visible)} />
        </View>
      </Card>
    );
  };


  // render Function
  function renderItems({ item, index }) {
    return (
      <>
        <View style={{ flex: 1, margin: "1%", marginHorizontal: '3%' }}>

          <Card style={styles.Body_Main_Card}>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

              {/* Item Name */}

              <View style={{ ...styles.card_subViews, flex: 1.7, }}>
                <Text style={styles.Heder_Text} >{item.descn}</Text>
              </View>

              {/* Checkbox View */}

              <View style={{ flex: 0.3, justifyContent: 'space-evenly', alignItems: 'center', borderRadius: 12, flexDirection: 'row' }}>

                <View>
                  <Checkbox

                    color={'dodgerblue'}
                    // key={item.key}
                    status={list[index].checked ? 'checked' : 'unchecked'}
                    onPress={(n) => {

                      setlist((p) => {
                      
                        p[index].picked = !p[index].picked;
                        let item = p[index];
                        counterbillfooter(item)
                        return [...p]
                      })

                    }}
                  />
                  {
                    console.log("list---", list)
                  }
                </View>

              </View>
            </View>

            <Divider style={{ marginRight: '5%', marginTop: '1%' }} />

            {/* Item Details */}

            <View style={{ ...styles.card_subViews, justifyContent: 'space-around', marginTop: '1%', flexDirection: 'row', height: 70 }}>

              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>

                {/*  Qty and Amount */}
                <View style={{ alignItems: 'center', flexDirection: 'row', width: '100%', justifyContent: 'space-around', marginVertical: '2%' }}>

                  <View>
                    <Text style={{ fontWeight: '400' }}>Quntity : </Text>
                  </View>
                  <View>
                    {/* <Text style={{ fontWeight: '800' }}>{item.qty}</Text> */}
                    <TextInput
                      placeholder={item.qty.toString()}
                      style={{ height: 30, width: 60 }}
                      onChangeText={(text) => {
                        setlist((p) => {
                          p[index].qty = text;
                          return [...p]
                        })
                        console.log('p---------->', list)
                      }}
                      keyboardType='number-pad'

                    />
                  </View>


                  <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginVertical: '2%' }}>

                    <View>
                      <Text style={{ fontWeight: '400' }}>Amount : </Text>
                    </View>

                    <View>
                      {/* <Text style={{ fontWeight: '600' }}>Rs. {item.amount}</Text> */}
                      <TextInput
                        style={{ fontWeight: '600', height: 40 }}
                        defaultValue={item.amount.toString()}
                        onChangeText={(text) => {
                          setlist((p) => {
                            p[index].amount = text;
                            return [...p]
                          })
                          console.log('p---------->', list)
                        }}
                      />
                    </View>
                  </View>
                </View>

                {/*  Expiry Date and MRP  */}
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', width: '100%', marginVertical: '2%' }}>



                  <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginTop: '6%' }}>

                    {/* Expiry Date */}
                    <View>
                      <Text style={{ fontWeight: '400' }}>Expiry Date</Text>
                    </View>
                    <View>

                      <Text>{showDate_ddmmyy(item.expdate)}</Text>

                    </View>

                    {/* MRP */}
                    <View>
                      <Text style={{ fontWeight: '600' }}>MRP</Text>
                    </View>
                    <View>
                      <Text style={{ fontWeight: '600' }}>{item.mrp}</Text>
                    </View>

                  </View>

                </View>

              </View>

            </View>

            {/*  free  */}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', width: '60%', marginTop: '4%', }}>

              <Text>Free</Text>
              <Text>{item?.free}</Text>

            </View>

            {/*  Box Atributes  */}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: '100%', marginTop: '5%', }}>
              <Text>Box</Text>
              <Text style={{ fontSize: 17 }}> {item?.innerbox}  X  {item?.pack}  X  {item?.unit}</Text>
              <View>
                <Checkbox />
              </View>
            </View>

            {/*  Batch No  */}
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap', marginVertical: '2%' }}>

              <View>
                <Text style={{ fontWeight: '400' }}>Batch No : </Text>
              </View>

              {/* Dropdown for batch seleection */}
              <Picker
                selectedValue={item.itembatchno}

                style={{ width: '50%' }}

                onValueChange={(BatchValue) => {

                  setlist((p) => {

                    p[index].itembatchno = BatchValue.itembatchno
                    p[index].expdate = BatchValue.expdate
                    p[index].mrp = BatchValue.mrp
                    return [...p]
                  })

                }
                }
              // mode='dropdown' 
              >
                <Picker.Item label={item.itembatchno} />

                {
                  itemBatchList.map((batch) => {
                    if (batch.itemrecno == item.itemrecno) {

                      return (
                        <Picker.Item label={batch.itembatchno} value={batch} />
                      )
                    }
                  })
                }

              </Picker>

            </View>

            {/*  Location name and code  */}
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginVertical: '2%' }}>

              <View>
                <Text style={{ fontWeight: '400' }}>Location :</Text>
              </View>

              <View>
                <Text style={{ fontWeight: '400' }}>{item.location}</Text>
              </View>

              <View>
                <Text style={{ fontWeight: '400' }}>Location code :</Text>
              </View>

              <View>
                <Text style={{ fontWeight: '400' }}>{item.locationcode}</Text>
              </View>

            </View>


          </Card>
        </View >
      </>
    )
  }

  return (

    <View style={{ flex: 1 }}>

      <Banner
        visible={visible}
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
        {listHeader?.message}
      </Banner>


      <FlatList
        // data={BillDetails}
        data={list}
        renderItem={renderItems}
        showsVerticalScrollIndicator={true}
        // onEndReached={onEndReachedHandler}
        keyExtractor={(item) => item.recno.toString()}
        ListHeaderComponent={ListHeader}

      />

      {/* Submit button */}

      <View style={{ flexDirection: 'row', justifyContent: 'space-around', backgroundColor: 'ghostwhite', paddingVertical: '1%' }}>

        <TouchableOpacity>
          <Button
            style={{ backgroundColor: 'orange', alignSelf: 'center', elevation: 6 }}
            onPress={SubmitCondition}
          >
            <Text style={{ color: 'white' }}>Submit</Text>
          </Button>
        </TouchableOpacity>

      </View>

    </View>
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
  Body_Main_Card: {
    width: '98%',
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: '2%',
    marginHorizontal: 5,

  },
  card_subViews: {
    padding: '1%'
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