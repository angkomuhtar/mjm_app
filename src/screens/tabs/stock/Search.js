import {Dimensions, TouchableOpacity} from 'react-native';
import React, {useRef} from 'react';
import {Text, VStack, ScrollView} from 'native-base';
import Header from '@components/Header';

const Result = ({route}) => {
  return (
    <>
      <Header back={true} title="Enter Code" />
      <VStack flex={1} p={3}>
        <ScrollView>{/* <Text>QR Result : {code}</Text> */}</ScrollView>
      </VStack>
    </>
  );
};

export default Result;
