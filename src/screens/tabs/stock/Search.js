import {SafeAreaView, TouchableOpacity} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import Ion from 'react-native-vector-icons/Ionicons';
import {Text, VStack, HStack, Input, Icon, Pressable, Stack, ScrollView, TextLabel, Image} from 'native-base';
import apiClient from '../../../commons/ApiCall';
import DefaultImg from '../../../assets/no-image.png';
import {navigate} from '@commons/RootNavigation';
import Header from '@components/Header';

const Result = ({route}) => {
  const [ keyword, setKeyword ] = useState("")
  const [ data, setData ] = useState([])

  const _handleSearchBarang = async() => {
    try {
      const resp = await apiClient.get(`barang?limit=1000&keyword=${keyword}`)
      if(!resp.data.diagnostic.error){
        setData(resp.data.data)
      }
      console.log(resp);
    } catch (error) {
      console.log(error);
      
    }
  }

  // console.log(keyword);
  return (
    <SafeAreaView style={{flex: 1}}>
      <Header back={true} title="Enter Code" />
      <VStack height={75} p={3} bgColor={"white"}>
        <HStack justifyContent={"space-between"} width={"100%"} height={80}>
          <Stack space={4} w="100%" alignItems="center">
            <Input value={keyword} onChangeText={(teks) => setKeyword(teks)} w={{base: "100%", md: "25%"}} InputRightElement={
              <Pressable onPress={_handleSearchBarang} bgColor={"gray.300"} p={3}>
                <Icon as={Ion} name="search-outline" size={"lg"} color="white" />
              </Pressable>
            } placeholder="Enter code here..." />
          </Stack>
        </HStack>
      </VStack>
      <ScrollView>
        {
          data.length > 0 && data?.map( v => {
            return (
              <TouchableOpacity key={v.id} onPress={() => navigate('result', {code: v.kode})}>
                <HStack space={2} m={3} background="white" borderRadius="md">
                  <Image
                    source={v?.photo ? {uri: v.photo} : DefaultImg}
                    alt=""
                    width="1/4"
                    height={'100%'}
                    borderLeftRadius="md"
                  />
                  <VStack justifyContent="center" alignContent="center" flex={1} p={3}>
                    <Text fontSize={16} fontWeight="bold">
                      {v?.nama}
                    </Text>
                    <Text fontWeight="bold" textTransform="uppercase">
                      {v?.brand?.nama || '-'}
                    </Text>
                    <Text fontWeight="bold" textTransform="uppercase">
                      {v?.kode}
                    </Text>
                    <Text fontWeight="bold" fontSize={12}>
                      {v?.num_part || '-'}
                    </Text>
                  </VStack>
                </HStack>
              </TouchableOpacity>
            )
          })
        }
      </ScrollView>
    </SafeAreaView>
  );
};

export default Result;
