import {View, SafeAreaView} from 'react-native';
import React, {useEffect} from 'react';
import {Image, Stack, Text} from 'native-base';
import Logo from '../assets/logo-blue.png';
import {navigate} from '@commons/RootNavigation';

const Splash = () => {
  return (
    <Stack flex={1} justifyContent="center" alignItems="center">
      <Image
        source={Logo}
        alt="Makassar Jaya Marine"
        w="2/5"
        resizeMode="contain"
      />
    </Stack>
  );
};

export default Splash;
