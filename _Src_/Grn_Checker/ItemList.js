import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Card } from 'react-native-shadow-cards';
import Icon from 'react-native-vector-icons/Ionicons';
import { TestScheduler } from 'jest';
import { Checkbox, Button, Divider } from 'react-native-paper';
import axios from 'axios';

// console.log("item", route.params.item)
const ItemList = ({ route, navigation }) => {

  const [list, setlist] = useState(route.params.item.items);

  const  { item:i,ApiCall} = route.params;
  console.log('i=>', i);

  // useEffect(() => {
  //   var ab = i.items.map((item, index) => {
  //     return { ...item, picked: false }
  //   })
  //   console.log('ab==>', ab)
  //   setlist(ab)
  // }, [])

  console.log("list ---> ", list)

  // Post Data function
  async function updatesalebillstatus() {

    var senddataapi = {
      "domainrecno": i.domainrecno,
      "billno": i.billno,
      "status": "C"
    }

    const { data: UpdateBillData } = await axios.post('https://dev.sutradhar.tech/bcore/api/v1/updatesalebillstatus/', senddataapi);
    console.log("UpdateBillData", UpdateBillData)
    // setupdatesalebillstatus(UpdateBillData.data);
    if (UpdateBillData.Success == true) {
      // alert('Success')
      ApiCall()
      navigation.navigate('Checker')
    }
  }

  // Checkbox Select Api Call
  async function salebillfooter(rec, checked) {

    var senddataapi = {
      "recno": rec,
      "picked": checked
    }

    const FooterBillData = await axios.patch('https://dev.sutradhar.tech/bcore/api/v1/salebillfooter/', senddataapi );
    console.log("FooterBillData", FooterBillData.data)
    // setsalebillfooter(FooterBillData.data);
  }

  // Function to check all checkbox is true  
  function patchData() {
    const result = list.filter(Check);

    function Check(item) {
      return item.picked == false;
    }
    console.log("Check------>", result.length)
    if (result.length == 0) {
      updatesalebillstatus();
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
    
  // Flatlist Header
  const ListHeader = () => {
   //View to set in Header
   return (
     <View>
       <Text style={styles.textStyle}>{i.custdescn}</Text>
     </View>
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

              <View style={{ flex: 0.9, justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: 'lightgray', borderRadius: 12, flexDirection: 'row' }}>

                <View>
                  {
                    item.picked == false ? (<><Text style={{ fontWeight: '700', fontSize: 14, }}>checked</Text></>) : (<><Text style={{ fontSize: 15, fontWeight: '700', color: 'dodgerblue' }}>unchecked</Text></>)
                  }
                </View>
                <View>
                  <Checkbox

                    color={'dodgerblue'}
                    // key={item.key}
                    status={list[index].picked ? 'checked' : 'unchecked'}
                    onPress={(n) => {
                      // console.log('n==>', n)
                      setlist((p) => {
                        p[index].picked = !p[index].picked;
                        let rec = p[index].itemrecno;
                        let checked = p[index].picked
                        salebillfooter(rec, checked)
                        return [...p]
                      })

                    }}
                  />
                </View>
              </View>
            </View>

            <Divider style={{ marginRight: '5%', marginTop: '1%' }} />


            {/* Item Details */}

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

            <View style={{ ...styles.card_subViews, justifyContent: 'space-around', marginTop: '1%' }}>

              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', }}>

                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center',flexWrap: 'wrap' }}>

                  <View>
                    <Text style={{ fontWeight: '400' }}>Amount : </Text>
                  </View>

                  <View>
                    <Text style={{ fontWeight: '600' }}>Rs. {item.amount}</Text>
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

      {/* Submit button */}

      <View style={{ flex: 0.12 }}>

        <TouchableOpacity>
          <Button
            style={{ backgroundColor: 'orange', width: '40%', alignSelf: 'center', }}
            onPress={patchData}
          >
            <Text style={{ color: 'white' }}>Submit</Text>
          </Button>
        </TouchableOpacity>

      </View>

    </View>


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