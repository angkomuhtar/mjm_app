import { StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainReport from './laporan/MainReport'
import LabaRugi from './laporan/LabaRugi';

const Stack = createNativeStackNavigator();

const ReportIndex = () => {
    const [ openScan, setOpenScan ] = useState(false)

    return (
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="main-report">
            <Stack.Screen name="main-report" component={MainReport} />
            <Stack.Screen name="laba-rugi-report" component={LabaRugi} />
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