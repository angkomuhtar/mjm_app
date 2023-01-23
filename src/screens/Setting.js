import React from 'react';
import {Button, VStack} from 'native-base';
import Header from '@components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigate} from '@commons/RootNavigation';
import {useDispatch} from 'react-redux';
import {logout} from '@redux/slices/auth';

const Setting = () => {
  // const dispatch = useDispatch();
  const logout = async () => {
    const token = await AsyncStorage.getItem('token');
    console.log(token);
    navigate('auth');
  };
  return (
    // <SafeAreaView style={{flex: 1}}>
    <>
      <Header back={true} title="Settings" />
      <VStack flex="1"></VStack>
      <Button onPress={() => logout()} colorScheme="primary" mb={3} mx="2">
        LOG OUT
      </Button>
    </>
  );
};

export default Setting;
