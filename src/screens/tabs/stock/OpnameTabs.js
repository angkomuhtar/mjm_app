import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, {useRef} from 'react';
import {
  View,
  Text,
  Pressable,
  HStack,
  Icon,
  VStack,
  Center,
  Input,
  ScrollView,
} from 'native-base';
import Header from '@components/Header';
import {RNCamera} from 'react-native-camera';
import InputField from '../../../components/InputField';
import {useForm} from 'react-hook-form';
import Fa from 'react-native-vector-icons/Ionicons';

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
          // type="front"
          autoFocus="on"
          style={{
            position: 'relative',
            height: 450,
            width: Dimensions.get('screen').width,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
          onBarCodeRead={e => {
            // console.log(e);
            alert(e.data);
            handleSubmit();
          }}>
          <Header setting={true} title="Stock" position="absolute" />
        </RNCamera>
        <VStack mt={-32}>
          <TouchableOpacity onPress={() => alert('')}>
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
