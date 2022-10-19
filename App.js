/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {extendTheme, NativeBaseProvider, StatusBar} from 'native-base';
import React from 'react';
import {SafeAreaView} from 'react-native';
import {Provider} from 'react-redux';
import Navigator from './src/navigation';
import {Store} from './src/redux/Store';

const theme = extendTheme({
  fontConfig: {
    Mulish: {
      100: {
        normal: 'Mulish-ExtraLight',
      },
      200: {
        normal: 'Mulish-ExtraLight',
      },
      300: {
        normal: 'Mulish-Light',
      },
      400: {
        normal: 'Mulish-Regular',
      },
      500: {
        normal: 'Mulish-Medium',
      },
      600: {
        normal: 'Mulish-SemiBold',
      },
      700: {
        normal: 'Mulish-Bold',
      },
      800: {
        normal: 'Mulish-ExtraBold',
      },
      900: {
        normal: 'Mulish-Black',
      },
    },
  },
  colors: {
    primary: {
      500: '#093269',
      400: '#1264D1',
      300: '#2F80ED',
      200: '#ACCCF8',
      100: '#D5E6FB',
    },
    gray: {
      // 00: '#FFFFFF',
      50: '#EFEFEF',
      100: '#E4E7EB',
      200: '#CBD2D9',
      300: '#7B8794',
      400: '#323F4B',
    },
    warning: {
      //   00: '#FFFFFF',
      100: '#F9EDC7',
      200: '#F3DB90',
      300: '#E7B820',
      400: '#775E0D',
    },
    danger: {
      //   00: '#FFFFFF',
      100: '#FCCECE',
      200: '#F99C9C',
      300: '#e02b2b',
      400: '#8D0909',
    },
    succees: {
      //   00: '#FFFFFF',
      100: '#CBF1D9',
      200: '#97E3B3',
      300: '#34C369',
      400: '#1A6234',
    },
  },

  // Make sure values below matches any of the keys in `fontConfig`
  fonts: {
    heading: 'Mulish',
    body: 'Mulish',
    mono: 'Mulish',
    mulish: 'Mulish',
  },
});

const App = () => {
  return (
    <Provider store={Store}>
      <NativeBaseProvider theme={theme}>
        <StatusBar />
        {/* <SafeAreaView style={{flex: 1, backgroundColor: '#EFEFEF'}}> */}
        <Navigator />
        {/* </SafeAreaView> */}
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;
