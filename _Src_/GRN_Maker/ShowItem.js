import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Card } from 'react-native-shadow-cards';
import Icon from 'react-native-vector-icons/Ionicons';
import { TestScheduler } from 'jest';
import { Checkbox } from 'react-native-paper';

// console.log("item", route.params.item)
const ShowItem = ({ route }) => {

  const [list, setlist] = useState([]);

  const i = route.params.item;
  console.log('i=>', i);

  useEffect(() => {
    var ab = i.map((item, index) => {
      return { ...item, isSelected: false }
    })
    console.log('ab==>', ab)
    setlist(ab)
  }, [])

  console.log("list ---> ", list)


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



  function renderItems({ item, index }) {
    return (
      <>
        <View style={{ flex: 1, margin: "1%", marginHorizontal: '3%' }}>

          <Card style={{ flex: 1, width: '100%', height: 90, padding: '1%' }}>

            <View style={{ flex: 1, flexDirection: 'row' }}>

              <View style={{ flex: 0.4 }}>

                <View style={{ flex: 1, alignItems: 'center', paddingLeft: 12, flexDirection: 'row' }}>

                  <View>
                    <Text style={{ fontWeight: '400' }}>Quntity : </Text>
                  </View>
                  <View>
                    <Text style={{ fontWeight: '800' }}>{item.qty}</Text>
                  </View>

                  {/* <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', width: '100%' }}>

                    <Text style={{ ...styles.content_text, fontWeight: '500', color: 'grey' }}>Qty: </Text>
                    <Text style={{ ...styles.content_text, fontWeight: '500' }}>{item.qty}</Text>

                  </View> */}

                  {/* <Text>Quntity : {item.qty} </Text> */}
                </View>

                <View style={{ flex: 1, justifyContent: 'center', paddingLeft: 12 }}>

                  <View style={{ flex: 1, }}>
                    <Text style={{ fontWeight: '400' }}>Expiry Date:</Text>
                  </View>
                  <View style={{ flex: 1, }}>
                    <Text style={{ fontWeight: '700' }}>{showDate_ddmmyy(item.expdate)} </Text>
                  </View>
                  {/* <Text>Expiry Date: {showDate_ddmmyy(item.expdate)} </Text> */}
                </View>
              </View>

              <View style={{ flex: 1 }}>

                <View style={{ flex: 1, justifyContent: 'center', paddingLeft: 12, flexDirection: 'row' }}>
                  <View style={{}}>
                    <Text>Name. : </Text>
                  </View>
                  <View style={{}}>
                    <Text>{item.descn}</Text>
                  </View>
                  {/* <Text>Name. : {item.descn} </Text> */}
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <View style={{ flex: 1, justifyContent: 'center', paddingLeft: 12 }}>
                    <Text style={{ fontWeight: '600' }}>Amount : Rs. {item.amount}</Text>
                  </View>
                  <View style={{ flex: 0.7, justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightgray', borderRadius: 12, flexDirection: 'row-reverse' }}>
                    <View style={{ flex: 1 }}>
                      {
                        item.isSelected == false ? (<><Text style={{ fontWeight: '700', fontSize: 15, }}>Pick-up</Text></>) : (<><Text style={{ fontSize: 15, fontWeight: '700', color: 'dodgerblue' }}>Discard</Text></>)
                      }
                    </View>
                    <View style={{ flex: 0.5, marginRight: "10%" }}>
                      <Checkbox

                        color={'dodgerblue'}
                        // key={item.key}
                        status={list[index].isSelected ? 'checked' : 'unchecked'}
                        onPress={(n) => {
                          console.log('n==>', n)
                          setlist((p) => {
                            p[index].isSelected = !p[index].isSelected;
                            return [...p]
                          })
                        }}
                      />
                    </View>
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
      />
    </View>
  )
}

export default ShowItem

const styles = StyleSheet.create({

  content_text: {
    fontSize: 15,
    color: 'black',
    marginLeft: '2%',
    marginVertical: '2.5%'
},
})