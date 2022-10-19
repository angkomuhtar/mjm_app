// import {View, Text, SafeAreaView} from 'react-native';
import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Stock from '../screens/Stock';
import Approval from '../screens/Approval';
import Report from '../screens/Report';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {VStack, Text} from 'native-base';
import OpnameTabs from '../screens/tabs/stock/OpnameTabs';

const Tab = createBottomTabNavigator();

const MainTab = () => {
  useEffect(() => {});

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarIcon: props => {
          const {focused, color, size} = props;
          let iconName;
          let label;

          if (route.name === 'home') {
            iconName = focused ? 'home' : 'home-outline';
            label = 'Home';
          } else if (route.name === 'stock') {
            iconName = focused ? 'server' : 'server-outline';
            label = 'Stock';
          } else if (route.name === 'approval') {
            iconName = focused ? 'newspaper' : 'newspaper-outline';
            label = 'Approve';
          } else if (route.name === 'report') {
            iconName = focused ? 'document-text' : 'document-text-outline';
            label = 'Reports';
          }

          // You can return any component that you like here!
          return (
            <VStack justifyContent="center" alignItems="center">
              <Ionicons
                name={iconName}
                size={focused ? 24 : 20}
                color={focused ? '#2F80ED' : '#7B8794'}
              />
              <Text
                fontFamily="mulish"
                fontSize={10}
                fontWeight={focused ? '700' : '400'}
                color={focused ? 'primary.300' : 'gray.300'}
                textTransform="uppercase">
                {label}
              </Text>
            </VStack>
          );
        },
        tabBarShowLabel: false,
        tabBarStyle: {
          paddingVertical: 8,
          height: 60,
          borderTopWidth: 1,
          borderTopColor: '#E4E7EB',
        },
      })}>
      <Tab.Screen name="home" component={Home} />
      <Tab.Screen name="stock" component={OpnameTabs} />
      <Tab.Screen name="approval" component={Approval} />
      <Tab.Screen name="report" component={Report} />
    </Tab.Navigator>
  );
};

export default MainTab;
