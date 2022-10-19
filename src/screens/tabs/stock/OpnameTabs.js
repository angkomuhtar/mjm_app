import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, {useRef} from 'react';
import {View, Text, Pressable, HStack, Icon, VStack, Center} from 'native-base';
import Ion from 'react-native-vector-icons/Ionicons';
import {APP_TOKEN} from '@env';
import Header from '@components/Header';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import RBSheet from 'react-native-raw-bottom-sheet';
import InputField from '../../../components/InputField';
import {useForm} from 'react-hook-form';

const OpnameTabs = () => {
  const refRBSheet = useRef();
  const {
    control,
    // handleSubmit,
    formState: {errors},
  } = useForm();
  const handleSubmit = () => {
    refRBSheet.current.open();
  };

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
        <KeyboardAvoidingView behavior="height">
          <View p={4} background="gray.50" mt={-20}>
            {/* <TouchableOpacity
          onPress={() => {
            refRBSheet.current.open();
          }}>
          <Text>{APP_TOKEN}</Text>
        </TouchableOpacity> */}
            <View p={4} background="white" shadow="2" borderRadius="md">
              <InputField
                name="items"
                label="Items ID"
                control={control}
                placeholder="Username"
                iconName="search"
              />
              <Pressable mt={4} onPress={() => handleSubmit()}>
                {/* <Pressable mt={4} onPress={handleSubmit(onPressLogin)}> */}
                {({isPressed}) => (
                  <HStack
                    py={2}
                    px={4}
                    borderRadius={6}
                    bg={isPressed ? 'primary.200' : 'primary.300'}
                    justifyContent="center"
                    alignItems="center"
                    space={2}>
                    <Text
                      fontFamily="mulish"
                      fontWeight="600"
                      fontSize="lg"
                      color="white">
                      FIND
                    </Text>
                  </HStack>
                )}
              </Pressable>
            </View>
            <RBSheet
              ref={refRBSheet}
              closeOnDragDown={true}
              closeOnPressMask={true}
              customStyles={{
                wrapper: {
                  backgroundColor: 'rgba(0,0,0,0.1)',
                },
                container: {
                  borderTopLeftRadius: 15,
                  borderTopRightRadius: 15,
                },
                draggableIcon: {
                  backgroundColor: '#1264D1',
                  marginTop: 15,
                  width: 120,
                },
              }}>
              {/* <YourOwnComponent /> */}
            </RBSheet>
          </View>
        </KeyboardAvoidingView>
      </VStack>
    </>
  );
};

export default OpnameTabs;
