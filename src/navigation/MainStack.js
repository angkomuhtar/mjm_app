// import {View, Text, SafeAreaView} from 'react-native';
import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainTab from './MainTab';
import {Setting, ApprovalDetails} from '@screens';
import {View} from 'native-base';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  useEffect(() => {});

  return (
    // <View>
    <Stack.Navigator initialRouteName="homeTab">
      <Stack.Screen
        name="homeTab"
        component={MainTab}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="setting"
        component={Setting}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="approvalDetails"
        component={ApprovalDetails}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
