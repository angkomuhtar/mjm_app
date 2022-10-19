import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {navigationRef} from '@commons/RootNavigation';
import {Splash} from '@screens';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainStack from './MainStack';
import AuthStack from './AuthStack';
import {useSelector} from 'react-redux';

const index = () => {
  const [loading, setLoading] = useState(true);
  const {isLoggedIn} = useSelector(state => state.auth);
  const [token, setToken] = useState(null);
  const getItem = async () => {
    const Token = await AsyncStorage.getItem('token');
    return Token;
  };
  useEffect(() => {
    // getItem();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }),
    [];
  useEffect(() => {
    let tok = getItem();
    setToken(tok);
  }, [isLoggedIn]);

  if (loading) {
    return <Splash />;
  }

  return (
    <NavigationContainer ref={navigationRef}>
      {token ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default index;
