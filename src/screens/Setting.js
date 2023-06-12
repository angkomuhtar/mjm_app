import React from 'react';
import {Avatar, Button, HStack, Text, VStack} from 'native-base';
import Header from '@components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigate} from '@commons/RootNavigation';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '@redux/slices/auth';

const Setting = () => {
  const dispatch = useDispatch();
  const {userdata} = useSelector(state => state.auth);
  // const logout = async () => {
  //   const token = await AsyncStorage.getItem('token');
  //   console.log(token);
  //   navigate('auth');
  // };
  return (
    // <SafeAreaView style={{flex: 1}}>
    <>
      <Header back={true} title="Settings" />
      <VStack flex="1" p="4">
        <HStack alignItems="center" space={6}>
          <Avatar
            bg="green.500"
            size={75}
            source={{
              uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
            }}>
            AJ
          </Avatar>
          <VStack>
            <Text fontWeight="bold" fontSize={16} textTransform="capitalize">
              {userdata.nama_lengkap}
            </Text>
            <Text fontSize={12}>{userdata.usertype}</Text>
            <Text fontSize={12}>{userdata.email}</Text>
          </VStack>
        </HStack>
      </VStack>
      <Button
        onPress={async () => {
          dispatch(logout());
          await AsyncStorage.removeItem('token');
          let test = await AsyncStorage.getItem('token');
          console.log('dari logout', test);
        }}
        colorScheme="primary"
        mb={3}
        mx="2">
        LOG OUT
      </Button>
    </>
  );
};

export default Setting;
