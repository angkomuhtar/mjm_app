import React from 'react';
import {Button} from 'native-base';
import Header from '@components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigate} from '@commons/RootNavigation';
import {useDispatch} from 'react-redux';
import {logout} from '@redux/slices/auth';

const Setting = () => {
  const dispatch = useDispatch();
  // const logout = async () => {
  //   const token = await AsyncStorage.getItem('token');
  //   console.log(token);
  //   navigate('login');
  // };
  return (
    // <SafeAreaView style={{flex: 1}}>
    <>
      <Header back={true} title="Settings" />
      <Button onPress={() => dispatch(logout)} colorScheme="primary">
        LOG OUT
      </Button>
    </>
  );
};

export default Setting;
