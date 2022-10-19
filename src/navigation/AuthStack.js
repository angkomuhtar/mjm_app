import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Login} from '@screens';

const Auth = createNativeStackNavigator();
const AuthStack = () => {
  return (
    <Auth.Navigator screenOptions={{headerShown: false}}>
      <Auth.Screen name="login" component={Login} />
    </Auth.Navigator>
  );
};

export default AuthStack;
