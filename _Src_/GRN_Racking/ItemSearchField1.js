import React, { useEffect, useState } from 'react';
import { Pressable } from 'react-native';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { FlatList, TextInput, Modal } from 'react-native';
import { View, Text } from 'react-native';
import { Card } from 'react-native-elements';

const ItemSearchField1 = ({ array, setItem, showDropD, setShowDropD, addHandler, Disable, setDisable }) => {
  console.log("array", array)

  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (showDropD) {
      setSelectedItem({});
      setFilteredItems(array);
    }
  }, [showDropD]);


  function textChangeHandler(text) {
    setShowDropD(true);
    setSelectedItem({ descn: text });
    // alert({selectedItem})
    if (selectedItem.descn != null) {
      setDisable(false)
    }
    // console.log('cc==', text, "::: ", JSON.stringify(selectedItem.descn))
    let regex = new RegExp(text, 'i');
    let allFilteredItems = array.filter((itm) => {
      return itm.descn.search(regex) != -1;
    });
    allFilteredItems.sort(
      (a, b) => a.descn.search(regex) - b.descn.search(regex),
    );
    setFilteredItems(allFilteredItems);
  }

  function RenderitemForClick({ item, index }) {
    // console.log("itemmmmmm..................1", index, item)
    return (
      <Pressable
        style={{ zIndex: 2 }}
        onPress={() => {
          setSelectedItem(item);
          setShowDropD(false);
          setItem(item);
        }}>
        <Card containerStyle={{ paddingHorizontal: 10, paddingVertical: 5 }}>
          <Text style={{ color: 'black' }}>{item.descn}</Text>
          {/* <Text style={{flex:1,color:'red'}}>hghhg</Text> */}

        </Card>
      </Pressable>
    );
  }

  function textChangeHandler_1(Number) {

    setSelectedItem({ ...selectedItem, locationCode: Number })
    // console.log('ncnc===', selectedItem)
  }

  const addEntry = () => {

    // console.log('okk', selectedItem)
    addHandler({ selectedItem });

  }

  return (
    <View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showDropD}
        onRequestClose={() => {
          setShowDropD(false);
        }}>
        <View style={localstyles.centeredView}>
          <View style={localstyles.modalView}>
            <View style={localstyles.container}>


              <View style={{ alignItems: 'center' }}>

                <TextInput
                  value={selectedItem.descn}
                  // onFocus={() => setShowDropD(false)}
                  style={localstyles.searchInput}
                  placeholder={'Item Search'}
                  onChangeText={textChangeHandler}
                />
              </View>

              {showDropD ? (
                // <>
                <View style={localstyles.windowView}>
                  <FlatList
                    data={filteredItems}
                    keyExtractor={(item) => { item.recno }}
                    renderItem={RenderitemForClick}
                  />
                </View>

              ) : (

                <View style={{ maxHeight: '50%', padding: 5, width: '80%' }}></View>

              )}
              <View style={{ flex: 1, flexDirection: 'row', padding: 2 }}>

                {
                  Disable ? null : (
                    <TouchableOpacity
                      style={{
                        backgroundColor: 'dodgerblue',
                        flex: 1,
                        borderWidth: 1,
                        borderRadius: 5,
                        justifyContent: 'center',
                        marginRight: 1
                      }}

                      onPress={() => setModalVisible(!modalVisible)}

                    >
                      <Text style={{ textAlign: 'center' }}>Add</Text>
                    </TouchableOpacity>
                  )
                }

                <TouchableOpacity
                  style={{
                    backgroundColor: 'orange',
                    flex: 1,
                    borderWidth: 1,
                    borderRadius: 5,
                    justifyContent: 'center',
                  }}
                  onPress={() => { setShowDropD(false), setSelectedItem({}) }}>
                  <Text style={{ textAlign: 'center' }}>Back</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={localstyles.centeredView_2}>
          <View style={localstyles.modalView_2}>
            <Text style={localstyles.modalText_2}>Location Code</Text>
            <TextInput
              style={{ height: 38, borderColor: 'red', backgroundColor: '#F2F1F0', width: 120, marginBottom: '4%', borderRadius: 5, }}
              placeholder='Enter Code'
              underlineColorAndroid={'transparent'}
              onChangeText={textChangeHandler_1}
            />

            <Pressable
              style={[localstyles.button_2, localstyles.buttonClose_2]}
              onPress={() => {
                setModalVisible(!modalVisible)
                addEntry()
                setShowDropD(false)
              }}
            >
              <Text style={localstyles.textStyle_2}>Add</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ItemSearchField1;

const localstyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchInput: {
    borderWidth: 1,
    width: '90%',
    color: 'black'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '80%',
    height: '70%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 30,
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  windowView: {
    padding: 0,
    margin: 0,
    width: '100%',
    height: '80%',
  },

  // Modal View

  centeredView_2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView_2: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button_2: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 60,
    // backgroundColor: 'red'
    backgroundColor: "#2196F3",
  },
  textStyle_2: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText_2: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: '700'
  }
});


