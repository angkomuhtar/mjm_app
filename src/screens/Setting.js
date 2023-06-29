import React, { useEffect, useState } from 'react';
import {SafeAreaView, TouchableOpacity} from 'react-native';
import {Avatar, Button, HStack, Text, VStack, Icon} from 'native-base';
import Header from '@components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigate} from '@commons/RootNavigation';
import Ant from 'react-native-vector-icons/AntDesign';
import DefaultImg from '../assets/no-image.png';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '@redux/slices/auth';
import apiClient from '../commons/ApiCall';
import {IMG_URL} from '@env';

const Setting = () => {
  const dispatch = useDispatch();
  const [ userdata, setUserdata ] = useState(null)

  useEffect(() => {
    _handleFetchProfileUser()
  }, [])

  const _handleFetchProfileUser = async() => {
    try {
      const resp = await apiClient.get(`profile`)
      console.log(resp);
      if(!resp.data.diagnostic.error){
        setUserdata(resp.data.data)
      }
    } catch (e) {
      console.log(e);
      alert(e.response.data.diagnostic.message)
    }
  }
  
  const _handleChangeWorkSpace = async (data) => {
    console.log(data);
    try {
      const resp = await apiClient.get(`change-workspace/${data.cabang_id}`)
      console.log(resp);
      if(!resp.data.diagnostic.error){
        _handleFetchProfileUser()
        alert("Success change workspace...")
      }
    } catch (e) {
      console.log(e);
      alert(e.response.data.diagnostic.message)
    }
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header back={true} title="Settings" />
      <VStack flex="1" p="4" bgColor={"white"}>
        <HStack alignItems="center" space={6} pb={5}>
          <Avatar
            bg="green.500"
            size={75}
            source={userdata?.avatar ? {uri: `${IMG_URL}${userdata.avatar}`} : DefaultImg}>
            avatar
          </Avatar>
          <VStack>
            <Text fontWeight="bold" fontSize={16} textTransform="capitalize">
              {userdata?.nama_lengkap}
            </Text>
            <Text fontSize={12}>{userdata?.user?.usertype}</Text>
            <Text fontSize={12}>{userdata?.user?.email}</Text>
          </VStack>
        </HStack>
        {/* <Divider /> */}
        <HStack justifyContent={"flex-start"} py={2} px={5} borderRadius={10} my={1} borderColor={'#ddd'} borderWidth={1}>
          <Icon as={Ant} name={"phone"} size={"md"} color={'gray.900'} mr={5} />
          <Text>{userdata?.telephone}</Text>
        </HStack>
        <HStack justifyContent={"flex-start"} py={2} px={5} borderRadius={10} my={1} borderColor={'#ddd'} borderWidth={1}>
          <Icon as={Ant} name={"mobile1"} size={"md"} color={'gray.900'} mr={5} />
          <Text>{userdata?.handphone}</Text>
        </HStack>
        <HStack justifyContent={"flex-start"} py={2} px={5} borderRadius={10} my={1} borderColor={'#ddd'} borderWidth={1}>
          <Icon as={Ant} name={"home"} size={"md"} color={'gray.900'} mr={5} />
          <Text>{userdata?.alamat}</Text>
        </HStack>
        <Text mt={5}>WorkSpace :</Text>
        {
          userdata?.workspace.map( v => {
            return (
              <HStack key={v.id} justifyContent={"flex-start"} py={2} px={5} borderRadius={10} my={1} borderColor={'#ddd'} borderWidth={1}>
                <VStack width={"40px"} justifyContent={"center"} alignItems={"flex-start"}>
                  <Icon as={Ant} name={"isv"} size={"md"} color={'gray.900'}/>
                </VStack>
                <VStack flex={1}>
                  <Text bold>{v?.cabang?.nama}</Text>
                  <Text fontSize={12}>{v?.cabang?.kode} - {v?.cabang?.alamat}</Text>
                </VStack>
                <VStack justifyContent={"center"} alignItems={"center"}>
                  <TouchableOpacity onPress={() => _handleChangeWorkSpace(v)}>
                    {
                      v.aktif === "Y" ?
                      <Icon as={Ant} name={"checkcircle"} size={"md"} color={'green.500'}/>
                      :
                      <Icon as={Ant} name={"checkcircle"} size={"md"} color={'#ddd'}/>
                    }
                  </TouchableOpacity>
                </VStack>
              </HStack>
            )
          })
        }
      </VStack>
      <Button
        onPress={async () => {
          dispatch(logout());
          await AsyncStorage.removeItem('token');
          let test = await AsyncStorage.getItem('token');
          console.log('dari logout', test);
        }}
        colorScheme="primary"
        mb={3}
        mx="2">
        LOG OUT
      </Button>
    </SafeAreaView>
  );
};

export default Setting;
