import {Dimensions, TouchableOpacity} from 'react-native';
import React, {useRef} from 'react';
import {Text, HStack, Icon, VStack, ScrollView} from 'native-base';
import Header from '@components/Header';
import {RNCamera} from 'react-native-camera';
import Fa from 'react-native-vector-icons/Ionicons';
import {navigate} from '@commons/RootNavigation';

const OpnameTabs = () => {
  const onSuccess = e => {
    Linking.openURL(e.data).catch(err =>
      console.error('An error occured', err),
    );
  };
  return (
    <>
      <VStack flex={1}>
        <RNCamera
          autoFocus="on"
          style={{
            position: 'relative',
            height: Dimensions.get('screen').height - 700,
            width: Dimensions.get('screen').width,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
          // onGoogleVisionBarcodesDetected={e=>?x` }
          onBarCodeRead={e => {
            navigate('result', {code: e.data});
          }}
        />
        <Header setting={true} title="Stock" position="absolute" />
        <VStack mt={Dimensions.get('screen').height - 900}>
          <TouchableOpacity onPress={() => navigate('search')}>
            <HStack bg="black:alpha.60" p={4} alignItems="center" space={2}>
              <Icon as={Fa} name="keypad-sharp" size="lg" color="white" />
              <Text
                color="white"
                fontWeight="bold"
                fontSize="xs"
                textTransform="uppercase">
                Enter Barcode Number
              </Text>
            </HStack>
          </TouchableOpacity>
          <VStack background="white" px="4" py="6">
            <HStack alignItems="center" justifyContent="space-between">
              <Text
                fontWeight="extrabold"
                fontSize="sm"
                textTransform="uppercase">
                Scan History
              </Text>
              <TouchableOpacity onPress={() => console.warn('hai')}>
                <Icon as={Fa} name="trash-outline" size="md" color="black" />
              </TouchableOpacity>
            </HStack>
            <VStack py={6}>
              <Text fontSize="xs" fontWeight="normal">
                Items that are scanned will be listed here
              </Text>
            </VStack>
          </VStack>
          <ScrollView flex={1}></ScrollView>
        </VStack>
      </VStack>
    </>
  );
};

export default OpnameTabs;
