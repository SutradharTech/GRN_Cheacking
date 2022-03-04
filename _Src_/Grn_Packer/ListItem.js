import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Card } from 'react-native-shadow-cards';
import Icon from 'react-native-vector-icons/Ionicons';
import { TestScheduler } from 'jest';
import { Checkbox, Button, Divider } from 'react-native-paper';
import axios from 'axios';

// console.log("item", route.params.item)
const ListItem = ({ route, navigation }) => {

  const [list, setlist] = useState(route.params.item.items);

  const {item: i, ApiCall} = route.params;
  console.log('i=>', i);

  // useEffect(() => {
  //   var ab = i.items.map((item, index) => {
  //     return { ...item, isSelected: false }
  //   })
  //   console.log('ab==>', ab)
  //   setlist(ab)
  // }, [])

  console.log("list ---> ", list)

  // Post Data function
  async function updatesalebillstatus() {
    console.log('i======>', i);
    const { data: UpdateBillData } = await axios.post('https://dev.sutradhar.tech/bcore/api/v1/updatesalebillstatus/',
      {
        // "fromdate": 20220201,
        // "todate": 20220228,
        "domainrecno": i.domainrecno,
        "billno": i.billno,
        "status": "D"
      }
    );
    console.log("UpdateBillData", UpdateBillData)
    // setupdatesalebillstatus(UpdateBillData.data);
    if (UpdateBillData.Success == true) {
      // alert('Success')
      ApiCall();
      navigation.navigate('Packer')
    }
  }

  // var BillDetails = route.params.item;
  // console.log("BillDetails", BillDetails);

  const [checked, setChecked] = React.useState(false);

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
        <View style={{ flex: 1, margin: "1%", marginHorizontal: '3%' }}>

          <Card style={styles.Body_Main_Card}>

            <View style={{ ...styles.card_subViews, }}>

              <Text style={styles.Heder_Text}>{item.descn}</Text>

            </View>

            <Divider style={{ marginRight: '5%', marginTop: '1%' }} />

            <View style={{ ...styles.card_subViews, justifyContent: 'space-around', marginTop: '1%', flexDirection: 'row', }}>

              <View style={{ flex: 1, flexDirection: 'column', }}>

                <View style={{ flex: 1, flexDirection: 'row', }}>

                  <View style={{ flex: 1, alignItems: 'center', marginTop: '5%' }}>
                    <Text style={{ fontWeight: '400' }}>Quntity : </Text>
                  </View>
                  <View style={{ flex: 1, alignItems: 'center', marginTop: '5%' }}>
                    <Text style={{ fontWeight: '800' }}>{item.qty}</Text>
                  </View>

                </View>

                <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', }}>

                  <View style={{ flex: 1, alignItems: 'center', marginTop: '5%' }}>
                    <Text style={{ fontWeight: '400' }}>Amount : </Text>
                  </View>

                  <View style={{ flex: 1, alignItems: 'center', marginTop: '5%' }}>
                    <Text style={{ fontWeight: '600' }}>Rs. {item.amount}</Text>
                  </View>

                </View>

              </View>

                <View style={{ flex: 1, flexDirection: 'column', }}>

                  <View style={{ flex: 1, flexDirection: 'row', }}>

                    <View style={{ flex: 1, alignItems: 'center', marginTop: '5%' }}>
                      <Text style={{ fontWeight: '400' }}>Expiry Date : </Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', marginTop: '5%' }}>
                      <Text style={{ fontWeight: '800' }}>{showDate_ddmmyy(item.expdate)}</Text>
                    </View>

                  </View>

                  <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', }}>

                    <View style={{ flex: 1, alignItems: 'center', marginTop: '5%' }}>
                      <Text style={{ fontWeight: '400' }}>Batch No : </Text>
                    </View>

                    <View style={{ flex: 1, alignItems: 'center', marginTop: '5%' }}>
                      <Text style={{ fontWeight: '600' }}>{item.itembatchno}</Text>
                    </View>

                  </View>

                </View>

              </View>

          </Card >
        </View >
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
            onPress={updatesalebillstatus}
          >
            <Text style={{ color: 'white' }}>Submit</Text>
          </Button>
        </TouchableOpacity>

      </View>


    </View>
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
})