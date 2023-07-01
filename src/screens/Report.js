import { StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainReport from './laporan/MainReport'
import LabaRugi from './laporan/LabaRugi';
import SalesHarian from './laporan/SalesHarian';
import Top10Barang from './laporan/Top10Barang';
import BarangMinimum from './laporan/BarangMinimum';

const Stack = createNativeStackNavigator();

const ReportIndex = () => {
    const [ openScan, setOpenScan ] = useState(false)

    return (
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="main-report">
            <Stack.Screen name="main-report" component={MainReport} />
            <Stack.Screen name="laba-rugi-report" component={LabaRugi} />
            <Stack.Screen name="sales-harian-report" component={SalesHarian} />
            <Stack.Screen name="top-barang-report" component={Top10Barang} />
            <Stack.Screen name="barang-minim-report" component={BarangMinimum} />
        </Stack.Navigator>
    )
}

export default ReportIndex

const styles = StyleSheet.create({
    vContainer: {
        backgroundColor: 'white',
        flex: 1
    }
})