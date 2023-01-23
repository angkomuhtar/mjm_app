import React, {useEffect} from 'react';
import {Header} from '@components';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Icon, Text, VStack} from 'native-base';
import Ant from 'react-native-vector-icons/AntDesign';
import {All} from '@screens/tabs';
import {useDispatch, useSelector} from 'react-redux';
import {list} from '../redux/slices/approval';

const Tab = createMaterialTopTabNavigator();

const Approval = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state.approval);
  useEffect(() => {
    console.log('test >>>', state);
    dispatch(list());
  }, []);

  console.log(state);
  return (
    <>
      <Header setting={true} title="Approvals" />
      <Tab.Navigator
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
        <Tab.Screen name="reject" component={All} />
      </Tab.Navigator>
    </>
  );
};

export default Approval;
