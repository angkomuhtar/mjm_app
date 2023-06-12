import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {HStack, Text, View} from 'native-base';
import Header from '@components/Header';
import Stocktabs from '@screens/tabs/stock/Stocktabs';
import StockResult from '@screens/tabs/stock/Result';
import StockSearch from '@screens/tabs/stock/Search';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const Stock = () => {
  return (
    <>
      {/* <Header setting={true} title="Stock" /> */}
      <Stack.Navigator
        initialRouteName="scan"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="scan" component={Stocktabs} />
        <Stack.Screen name="search" component={StockSearch} />
        <Stack.Screen name="result" component={StockResult} />
      </Stack.Navigator>
    </>
  );
};

export default Stock;
