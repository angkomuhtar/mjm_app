import {Platform, SafeAreaView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  HStack,
  Image,
  Pressable,
  Stack,
  Text,
  VStack,
  Modal,
  Spinner,
  View,
  Icon,
} from 'native-base';
import Logo from '../assets/logo-blue.png';
import InputField from '@components/InputField';
import Ion from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {useForm} from 'react-hook-form';
import {login} from '@redux/slices/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '@components/Modal/Loading';
import Stock from './Stock';
import {navigate} from '@commons/RootNavigation';

const Login = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state.auth);
  const [modalShow, setModalShow] = useState(false);
  const [modalError, setModalError] = useState(false);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onPressLogin = async data => {
    dispatch(login(data));
  };

  // const setStorage = async data => {
  //   try {
  //     await AsyncStorage.setItem('token', data.data.token);
  //     await AsyncStorage.setItem('user', JSON.stringify(data.user));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    setModalShow(state.loading);
  }, [state.loading]);

  useEffect(() => {
    if (state.isSuccess == false) {
      setModalError(!state.isSuccess);
    }
  }, [state.isSuccess]);

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <Stack flex={1} p={4} justifyContent="center" alignItems="center">
          <Image
            alt="Makassar Jaya Marine"
            source={Logo}
            h="32"
            resizeMode="contain"
            mb={6}
          />
          <KeyboardAvoidingView
            w="full"
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
            <VStack w="full" space={3}>
              <InputField
                name="username"
                control={control}
                placeholder="Username"
                iconName="at"
                rules={{required: 'Tidak Boleh Kosong'}}
              />
              <InputField
                name="password"
                iconName="lock-closed"
                placeholder="****"
                secureTextEntry={true}
                control={control}
                rules={{required: 'input Password'}}
              />
              <Pressable mt={4} onPress={handleSubmit(onPressLogin)}>
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
                    <Icon as={Ion} name="log-in" size={8} color="white" />
                    <Text
                      fontFamily="mulish"
                      fontWeight="600"
                      fontSize="lg"
                      color="white">
                      LOG IN
                    </Text>
                  </HStack>
                )}
              </Pressable>
            </VStack>
          </KeyboardAvoidingView>
        </Stack>
      </SafeAreaView>
      <Loading open={modalShow} />

      <Modal
        isOpen={modalError}
        onClose={() => setModalError(false)}
        closeOnOverlayClick>
        <VStack
          space={2}
          background="white"
          borderRadius="md"
          p="4"
          py={8}
          minWidth="4/5"
          justifyContent="center"
          alignItems="center">
          <View
            borderColor="danger.300"
            borderWidth={1}
            borderRadius="full"
            p={3}>
            <Icon
              as={Ion}
              name="construct-outline"
              size={30}
              color="danger.300"
            />
          </View>
          <View maxW="3/5" my={2}>
            <Text fontWeight={400} fontSize={12} textAlign="center">
              {state?.message || ''}
            </Text>
          </View>
          <Pressable onPress={() => setModalError(false)}>
            <View
              p="2"
              background="danger.50"
              borderColor="danger.500"
              borderWidth="1"
              borderRadius="lg"
              justifyContent="center"
              alignItems="center">
              <Text
                fontSize={12}
                fontWeight={800}
                textTransform="uppercase"
                color="danger.500">
                Close
              </Text>
            </View>
          </Pressable>
        </VStack>
      </Modal>
    </>
  );
};

export default Login;
