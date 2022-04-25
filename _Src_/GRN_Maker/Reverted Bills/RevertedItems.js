import { StyleSheet, Text, View, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { Card } from 'react-native-shadow-cards';
import Icon from 'react-native-vector-icons/Ionicons';
import { TestScheduler } from 'jest';
import { Checkbox, Button, Divider, TextInput, Banner, Modal, Portal, Dialog, Provider } from 'react-native-paper';
import axios from 'axios';
import { Picker } from '@react-native-community/picker';
import AppFunction from '../../AppFunction';
import AppConstants from '../../AppConstant';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CounterBillStatus from '../../CounterBillStatus';
import { Authcontext } from '../../auth/Auth';


const RevertedItems = ({ route, navigation }) => {

  const auth = useContext(Authcontext)

  const { custName, From, billno: billno, domainrecno: domainrecno, domainuserrecno: domainuserrecno, ApiCall } = route.params;

  const [list, setlist] = useState();
  const [flag, setflag] = useState(false);
  const [SelectedBatch, setSelectedBatch] = useState();
  const [listHeader, setlistHeader] = useState();
  const [dialog, setdialog] = useState(false);
  const [visible, setVisible] = useState(true);
  const [modalVisible, setmodalVisible] = useState(false);
  const [itemQty, setitemQty] = useState();
  const [itemBatchList, setitemBatchList] = useState([]);
  const [filterBatch, setfilterBatch] = useState([]);
  const [isReadOnly, setisReadOnly] = useState(false);

  const showDialog = () => setdialog(true);
  const hideDialog = () => setdialog(false);

  const showModal = () => setmodalVisible(true);
  const hideModal = () => setmodalVisible(false);

  const containerStyle = { backgroundColor: 'white', padding: 20 };

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

    if (UpdateBillData.Success == true) {


      setlist(UpdateBillData.Message.items.map((itm) => {


        return { ...itm, totalqty: Number(itm.qty) + Number(itm.free) }
      }));

      if (UpdateBillData.Message.lockedby == 0) {

        let senddata = UpdateBillData.Message;
        addcounterbillforlock(senddata);
      }
      else {
        if (UpdateBillData.Message.lockedby == auth?.state?.userdata?.recno) {

          setisReadOnly(false);
        }
        else {
          setisReadOnly(true);
        }
      }

    }

  }


  // API Call for lock bill
  async function addcounterbillforlock(senddata) {

    console.log("Api Call /addcounterbill/", "senddata", senddata, "lockedby:", auth?.state?.userdata?.recno, "status: ", CounterBillStatus.maker)

    let senddataapi = {

      ...senddata,
      lockedby: auth?.state?.userdata?.recno,
      status: CounterBillStatus.checkertomaker,
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


  // Resend Data to previous status 
  async function resendCounterBill() {

    let senddataapi = {
      ...listHeader,
      lockedby: 0,
      messages: [
        {
          msgtouserrecno: 161,
          userrolerecno: "",
          msg: "Hello",
          msgstatus: ""
        }
      ],
      status: "R",

    }

    console.log('Resenddataapi----', senddataapi);

    const { data: UpdateBillData } = await axios.post(AppConstants.APIurl2 + 'addcounterbill/', senddataapi);
    console.log("ApiRes // addcounterbill", UpdateBillData)

    if (UpdateBillData.Success == true) {
      ApiCall();
      navigation.navigate('RevertedList');
    }

  }


  // Post Api Call (Send to next page) 
  async function addcounterbill() {

    console.log("Api Call / RevertedItems / addcounterbill", "listHeader:", listHeader, "status:", "Ch", "makerdate:", AppFunction.getToday().dataDate, "makertime:", AppFunction.getTime().dataTime)

    let senddataapi = {
      ...listHeader,
      lockedby: 0,
      items: list,
      status: CounterBillStatus.revertedmakertochecker,
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


  // Send To Api Batch
  function sendBatchCondition() {
    let sendBatch = filterBatch.filter(b => b.qty != 0);

    console.log('sendBatch', sendBatch);

    sendBatch.map(item => {
      var newdata = list.filter(
        itm =>
          itm.itembatchno == item.itembatchno &&
          itm.itemrecno == item.itemrecno,
      );

      console.log("newdata", newdata)

      if (newdata.length > 0) {
        setlist(p => {
          var updatebatch = p;

          var index = updatebatch.indexOf(newdata[0]);

          updatebatch[index].qty = item.qty;

          return [...updatebatch];
        });
      } else {
        setlist(p => {
          return [...p, { ...item, shortguid: uuidv4() }];
        });
      }
    });

    setmodalVisible((p) => !p)
  }

  const Total = filterBatch.reduce((prev, curr) => Number(prev) + Number(curr.qty), 0)

  let pending = itemQty - Total

  console.log("Total", Total)


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

    function filterBatchfun(recno, qty) {

      let result = itemBatchList.filter(batch => batch.itemrecno == recno)

      console.log("result ---->", result);

      let res = result.map((i, index) => {

        return { ...i, qty: 0 }
      })

      setitemQty(qty);
      setfilterBatch(res);
    }


    let totalQty = Number(item?.qty) + Number(item?.free);

    console.log("filter Batch----", filterBatch);



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
                    disabled={item.checked == 1 ? true : false || isReadOnly ? true : false}
                    status={list[index].picked ? 'checked' : 'unchecked'}
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

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', height: 50 }}>

              <View style={{ alignItems: 'center', flexDirection: 'row', width: '60%', justifyContent: 'space-around', marginVertical: '4%' }}>

                <Text style={{ fontSize: 15, fontWeight: '500' }}>marketeer</Text>
                <Text>{item.marketeerdescn}</Text>

              </View>

              <View style={{ alignItems: 'center', flexDirection: 'row', width: '40%', justifyContent: 'space-around', marginVertical: '4%' }}>

                <Text style={{ fontSize: 15, fontWeight: '500' }}>Unit</Text>

                <Text>{item.unit}</Text>

              </View>
            </View>

            <View style={{ ...styles.card_subViews, justifyContent: 'space-around', marginTop: '1%', flexDirection: 'row', height: 70, }}>

              {/*  Qty */}
              <View style={{ alignItems: 'center', flexDirection: 'row', width: '100%', justifyContent: 'space-around', marginVertical: '2%', flex: 1 }}>

                <Text style={{ fontWeight: '400' }}>Quntity : </Text>

                {/* <Text style={{ fontWeight: '800' }}>{item.qty}</Text> */}
                {/* <TextInput
                  placeholder={(item?.qty + item?.free).toString()}
                  style={{ height: 30, width: 60 }}
                  disabled={item.checked == 1 ? true : false}
                  onChangeText={(text) => {
                    setlist((p) => {
                      p[index].qty = text;
                      return [...p]
                    })
                    console.log('p---------->', list)
                  }}
                  keyboardType='number-pad'

                /> */}

                <TextInput
                  value={totalQty == 0 ? "" : totalQty.toString()}
                  style={{ height: 30, width: 50 }}
                  disabled={isReadOnly ? true : false}
                  onChangeText={(text) => {

                    try {

                      if (item.totalqty >= text) {

                        setlist((p) => {

                          p[index].qty = Number(text) - Number(item.free);
                          return [...p]
                        })
                      }
                      else {

                        alert("You Cannot add more qty !!")

                      }

                    } catch (error) {
                      console.log(error);
                    }

                    console.log('p---------->', list)
                  }}
                  keyboardType='number-pad'

                />


              </View>

              <View style={{ alignItems: 'center', flexDirection: 'column', width: '50%', justifyContent: 'space-around', marginVertical: '4%', flexWrap: 'nowrap', flex: 1.5 }}>

                <Text style={{ fontSize: 15, fontWeight: '500' }}>manufacturer</Text>
                <Text>{item.manufacturerdescn}</Text>

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



            {/*  Box Atributes  */}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: '100%', marginTop: '5%', }}>
              <Text>Box</Text>
              <Text style={{ fontSize: 17 }}> {item?.innerbox}  X  {item?.pack}  X  {item?.unit}</Text>
              <View>
                <Checkbox

                  color={'orange'}
                  disabled={item.checked == 1 ? true : false || isReadOnly ? true : false}
                  // key={item.key}
                  status={list[index].attributeschecked ? 'checked' : 'unchecked'}
                  onPress={(n) => {
                    // console.log('n==>', n)
                    setlist((p) => {
                      p[index].attributeschecked = !p[index].attributeschecked;

                      return [...p]
                    })

                  }}
                />
              </View>
            </View>

            {/*  Batch No  */}
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap', marginVertical: '2%' }}>

              <Text style={{ fontWeight: '400' }}>Batch No : </Text>

              <Text style={{ fontWeight: '400' }}>{item.itembatchno}</Text>

              {
                item.checked == 1 ? (null) : (

                  <TouchableOpacity>
                    <Button
                      style={{ backgroundColor: 'white', alignSelf: 'center', borderWidth: 0.5, borderColor: 'orange', elevation: 6 }}
                      disabled={isReadOnly ? true : false}
                      onPress={() => { filterBatchfun(item.itemrecno, item.qty), showModal() }}
                    >
                      <Text style={{ color: 'orange' }}>Add Batch</Text>
                    </Button>
                  </TouchableOpacity>
                )
              }

            </View>

            {/*  Location name and code  */}
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginVertical: '2%' }}>


              <Text style={{ fontWeight: '400' }}>Location :</Text>

              <Text style={{ fontWeight: '400' }}>{item.location}</Text>

              <Text style={{ fontWeight: '400' }}>Location code :</Text>

              <Text style={{ fontWeight: '400' }}>{item.locationcode}</Text>


            </View>


          </Card>
        </View >
      </>
    )
  }

  return (

    <Provider>
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
          {
            listHeader?.messages[0]?.status == 'RM' ? (
              listHeader?.messages[0]?.message

            ) : null
          }
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



        <View style={{ flexDirection: 'row', justifyContent: 'space-around', backgroundColor: 'ghostwhite', paddingVertical: '1%' }}>

          {/*  Revert Bill  */}
          <TouchableOpacity>
            <Button
              style={{ backgroundColor: 'white', alignSelf: 'center', borderWidth: 0.5, borderColor: 'orange', elevation: 6 }}
              disabled={isReadOnly ? true : false}
              onPress={() => setdialog(true)}
            >
              <Text style={{ color: 'orange' }}>Revert</Text>
            </Button>
          </TouchableOpacity>


          {/* Submit button */}
          <TouchableOpacity>
            <Button
              style={{ backgroundColor: 'orange', alignSelf: 'center', elevation: 6 }}
              disabled={isReadOnly ? true : false}
              onPress={SubmitCondition}
            >
              <Text style={{ color: 'white' }}>Submit</Text>
            </Button>
          </TouchableOpacity>

        </View>


        <Modal visible={modalVisible} onDismiss={hideModal} contentContainerStyle={containerStyle} style={{ height: "75%" }}>
          <ScrollView>
            <View style={{ flex: 1 }}>

              <View style={{ justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row', margin: 10 }}>
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: "black" }}>
                  {`Batch:  `}
                </Text>
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: "black" }}>
                  Exp Date:
                </Text>
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: "black" }}>
                  stock:
                </Text>
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: "black" }}>
                  {`Quantity:  `}
                </Text>
              </View>

              {
                filterBatch.map((batch, index) => {

                  return (
                    <View key={batch.itembatchno} style={{ justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row', margin: 10 }}>
                      <Text style={{ fontSize: 14, fontWeight: 'normal', color: "black" }}>
                        {batch.itembatchno}
                      </Text>
                      <Text style={{ fontSize: 14, fontWeight: 'normal', color: "black" }}>
                        {batch.expdate}
                      </Text>
                      <Text style={{ fontSize: 14, fontWeight: 'normal', color: "black" }}>
                        {batch.totalstock}
                      </Text>
                      <TextInput
                        style={styles.searchInput}
                        placeholder={'Qty'}
                        keyboardType='numeric'
                        onChangeText={(text) => {
                          setfilterBatch((p) => {
                            p[index].qty = text;

                            return [...p];

                          })
                        }}

                      // onChangeText={textChangeHandler}
                      />



                    </View>
                  )
                })
              }

              <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>

                <View style={{ alignItems: 'center' }}>
                  <Text style={{ fontSize: 14, fontWeight: 'bold', color: "black" }}>Pending</Text>
                  <Text style={{ fontSize: 14, fontWeight: 'normal', color: "black" }}>{pending}</Text>
                </View>

                <View style={{ alignItems: 'center' }}>
                  <Text style={{ fontSize: 14, fontWeight: 'bold', color: "black" }}>Projected</Text>
                  <Text style={{ fontSize: 14, fontWeight: 'normal', color: "black" }}>{itemQty}</Text>
                </View>

                {/*  Submit Bill  */}
                <TouchableOpacity>
                  {
                    pending == 0 ?
                      <>
                        <Button
                          style={{ backgroundColor: 'orange', alignSelf: 'center', elevation: 6 }}
                          onPress={sendBatchCondition}
                        >
                          <Text style={{ color: 'white' }}>Submit</Text>
                        </Button>
                      </>
                      :
                      (null)
                  }

                </TouchableOpacity>
              </View>

            </View>
          </ScrollView>
        </Modal>


        {
          dialog ? (
            <Portal>
              <Dialog visible={showDialog} onDismiss={hideDialog} style={{ height: '40%', justifyContent: 'space-between' }}>

                <View>

                  <Dialog.Title>Message</Dialog.Title>

                  <TextInput
                    style={{ fontWeight: '600', height: 40, width: '85%', alignSelf: 'center' }}
                    // multiline={true}
                    onChangeText={(text) => {

                      setMessage(text);
                      // listHeader.messages.msg = text,


                      console.log('listHeader---------->', listHeader)
                    }}
                  />

                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                  <Button onPress={() => {
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
    borderLeftWidth: 10,
    borderColor: 'orange'

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
  searchInput: {
    borderWidth: 0,
    width: '25%',
    color: 'black',
    height: 30
  }

})