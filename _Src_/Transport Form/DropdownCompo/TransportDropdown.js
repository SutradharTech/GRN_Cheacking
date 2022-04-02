import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { Picker } from '@react-native-community/picker';
import { Divider } from 'react-native-paper';

export default function TransportDropdown({ TransportList }) {

    const [SelectedTransport, setSelectedTransport] = useState([]);

    return (
        <View style={{ flex: 1.1}}>
            <Text style={{ left: '15%', fontWeight: '700', fontSize: 15 }}>Transport</Text>

                <Divider style={{ marginHorizontal: '10%', marginTop: '5%' }}/>
                <Picker
                    selectedValue={SelectedTransport}
                    style={{ width: '100%' }}
                    onValueChange={(transporterValue) => {

                        setSelectedTransport(transporterValue.name)
                        // console.log('------>',SelectedWarehouse.value)
                        // setApiData(p => {
                        //     var newdata = p
                        //     newdata[index].Warehouse = itemValue
                        //     console.log("newdata", newdata)

                        //     return [...newdata]
                        // })
                    }
                    }
                // mode='dropdown' 
                >
                    <Picker.Item label={"Select Transport"} value={"564556"} />

                    {
                        TransportList.map(transporter => {

                            return (
                                <Picker.Item label={transporter.name} value={transporter} />
                            )
                        })
                    }

                </Picker>
        </View>
    )
}