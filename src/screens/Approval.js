import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import {Header} from '@components';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Icon, Text, VStack} from 'native-base';
import Ant from 'react-native-vector-icons/AntDesign';
import {All} from '@screens/tabs';
import {useNavigationState} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {list} from '../redux/slices/approval';

const Tab = createMaterialTopTabNavigator();

const Approval = () => {
  const [activeTab, setActiveTab] = useState(0);
  const dispatch = useDispatch();
  // console.log('state navigation', state);

  useEffect(() => {
    if (activeTab == 0) {
      dispatch(list('created'));
    } else if (activeTab == 1) {
      dispatch(list('approved'));
    } else if (activeTab == 2) {
      dispatch(list('finish'));
    } else {
      dispatch(list('rejected'));
    }
  }, [activeTab]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header setting={true} title="Approvals" />
      <Tab.Navigator
        screenListeners={{
          state: e => {
            setActiveTab(e.data.state.index);
          },
        }}
        initialRouteName="stockTab"
        screenOptions={({route}) => ({
          lazy: true,
          tabBarIndicatorStyle: {
            backgroundColor: '#f4f4f4',
            height: '100%',
            borderRadius: 4,
          },
          tabBarLabel: ({focused}) => {
            let label, icon;
            switch (route.name) {
              case 'all':
                label = 'List';
                icon = 'profile';
                break;
              case 'approve':
                label = 'Approved';
                icon = 'carryout';
                break;
              case 'finish':
                label = 'Finished';
                icon = 'carryout';
                break;
              case 'reject':
                label = 'Rejected';
                icon = 'exception1';
                break;

              default:
                break;
            }
            return (
              <VStack flex={1} justifyContent="center" alignItems="center">
                <Icon
                  as={Ant}
                  name={icon}
                  size={5}
                  color={focused ? 'primary.400' : 'gray.200'}
                />
                <Text
                  pt={0.5}
                  fontFamily="mulish"
                  fontSize={11}
                  fontWeight="bold"
                  color={focused ? 'primary.300' : 'gray.300'}
                  textTransform="capitalize">
                  {label}
                </Text>
              </VStack>
            );
          },
        })}>
        <Tab.Screen name="all" component={All} />
        <Tab.Screen name="approve" component={All} />
        <Tab.Screen name="finish" component={All} />
        <Tab.Screen name="reject" component={All} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default Approval;
