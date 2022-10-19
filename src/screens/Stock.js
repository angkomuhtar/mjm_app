import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {HStack, Text, View} from 'native-base';
import Header from '@components/Header';
import Stocktabs from '@screens/tabs/stock/Stocktabs';
import OpnameTabs from '@screens/tabs/stock/OpnameTabs';

const Tab = createMaterialTopTabNavigator();
const Stock = () => {
  return (
    <>
      <Header setting={true} title="Stock" />
      <Tab.Navigator
        initialRouteName="stockTab"
        screenOptions={({route}) => ({
          lazy: true,
          tabBarIndicatorStyle: {
            backgroundColor: '#2F80ED',
            height: '100%',
            borderRadius: 4,
          },
          swipeEnabled: true,
          tabBarLabel: ({focused}) => {
            let label;
            switch (route.name) {
              case 'stockTab':
                label = 'Find';
                break;
              case 'opnameTab':
                label = 'Opname';
                break;
              default:
                break;
            }
            return (
              <HStack w="20" justifyContent="center">
                <Text
                  fontFamily="mulish"
                  fontSize={12}
                  fontWeight={focused ? '700' : '300'}
                  color={focused ? 'white' : 'gray.300'}
                  textTransform="uppercase">
                  {label}
                </Text>
              </HStack>
            );
          },
        })}>
        <Tab.Screen name="stockTab" component={Stocktabs} />
        <Tab.Screen name="opnameTab" component={OpnameTabs} />
      </Tab.Navigator>
    </>
  );
};

export default Stock;
