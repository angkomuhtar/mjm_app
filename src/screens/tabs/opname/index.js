import { StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainOpname from './MainOpname'
import ListScanOpname from './ListScanOpname';
import HistoryScanOpname from './HistoryScanOpname';

const Stack = createNativeStackNavigator();

const Opname = () => {
    const [ openScan, setOpenScan ] = useState(false)

    return (
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="main-opname">
            <Stack.Screen name="main-opname" component={MainOpname} />
            <Stack.Screen name="list-opname" component={ListScanOpname} />
            <Stack.Screen name="history-opname" component={HistoryScanOpname} />
        </Stack.Navigator>
    )
}

export default Opname

const styles = StyleSheet.create({
    vContainer: {
        backgroundColor: 'white',
        flex: 1
    }
})