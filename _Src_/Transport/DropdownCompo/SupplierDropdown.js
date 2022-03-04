import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { Picker } from '@react-native-community/picker';
import { Divider } from 'react-native-paper';

export default function TransportDropdown({ SupplierList }) {

    const [SelectedSupplier, setSelectedSupplier] = useState([]);

    return (
        <View style={{flex: 1}}>
            <Text style={{ left: '20%',fontWeight: '700', fontSize: 15}}>Supplier</Text>
            <Divider style={{ marginHorizontal: '10%', marginTop: '5%', }} />

            <Picker
                selectedValue={SelectedSupplier}
                style={{ width: '100%' }}
                onValueChange={(SupplierValue) => {

                    setSelectedSupplier(SupplierValue.name)
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
                <Picker.Item label={"Select Supplier"} value={"564556"} />

                {
                    SupplierList.map(Supplier => {

                        return (
                            <Picker.Item label={Supplier.name} value={Supplier} />
                        )
                    })
                }

            </Picker>
        </View>
    )
}