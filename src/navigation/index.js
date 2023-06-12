import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {navigationRef} from '@commons/RootNavigation';
import {Splash} from '@screens';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainStack from './MainStack';
import AuthStack from './AuthStack';
import {useSelector} from 'react-redux';

const index = () => {
  const [Loading, setLoading] = useState(true);
  const {isLoggedIn, userdata, token, loading} = useSelector(
    state => state.auth,
  );
  const [Token, setToken] = useState(null);

  console.log(Token);
  const setStorage = async (token, userdata) => {
    try {
      await AsyncStorage.setItem('token', JSON.stringify(token));
      await AsyncStorage.setItem('user', JSON.stringify(userdata));
    } catch (error) {
      console.log(error);
    }
  };

  const getStorage = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      setToken(token);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      setStorage(token, userdata);
    }
    getStorage();
  }, [token]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (Loading) {
    return <Splash />;
  }
  return (
    <NavigationContainer ref={navigationRef}>
      {Token ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default index;
