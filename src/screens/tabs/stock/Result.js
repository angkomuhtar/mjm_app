import {Dimensions, TouchableOpacity, SafeAreaView} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Text, VStack, ScrollView, Image, HStack, Flex, Divider} from 'native-base';
import Header from '@components/Header';
import DefaultImg from '../../../assets/no-image.png';
import {useDispatch, useSelector} from 'react-redux';
import {getByCode} from '@redux/slices/item';
import {TextLabel} from '@components';
import apiClient from '../../../commons/ApiCall';

const Result = ({route}) => {
  const {code} = route.params;
  const dispatch = useDispatch();
  const {loading, success, data} = useSelector(state => state.item);
  const [ stokGudang, setStokGudang ] = useState(null)

  // console.log("stock", stokGudang);
  // console.log("stock", data);
  // console.log("loading", loading);

  useEffect(() => {
    dispatch(getByCode(code));
  }, [code]);

  useEffect(() => {
    _handleDetailStokBarang()
  }, [loading]);
  
  const _handleDetailStokBarang = async () => {

    if(data?.id){
      try {
        const resp = await apiClient.get(`barang-stok/${data.id}/show`)
        if(!resp.data.diagnostic.error){
          setStokGudang(resp.data.data)
        }
      } catch (e) {
        console.log(e);
        alert(e.response.data.diagnostic.message)
      }

    }

  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header back={true} title="Scan Result" />
      <VStack flex={1}>
        <ScrollView>
          <HStack space={2} m={3} background="white" borderRadius="md">
            <Image
              source={data?.photo ? {uri: data.photo} : DefaultImg}
              alt=""
              width="1/4"
              height={'100%'}
              borderLeftRadius="md"
            />
            <VStack justifyContent="center" alignContent="center" flex={1} p={3}>
              <Text fontSize={16} fontWeight="bold">
                {data?.nama}
              </Text>
              <Text fontWeight="bold" textTransform="uppercase">
                {data?.brand?.nama || '-'}
              </Text>
              <TextLabel text={data?.kode || '-'} title="Kode" />
              <TextLabel text={data?.num_part || '-'} title="part number" />
            </VStack>
          </HStack>
          {
            stokGudang?.map( v => {
              return (
                <Flex key={v.id}>
                  <VStack mx={4} mt={5}>
                    <Text fontSize={18} fontWeight={"semibold"}>{v.nama}</Text>
                    <Divider />
                    {
                      v.stok ?
                      <>
                        <HStack justifyContent={"space-between"} alignItems={"center"}>
                          <Text fontSize={14}>On Hand</Text>
                          <Text fontSize={14}>{v.stok.brg_hand} {data.satuan}</Text>
                        </HStack>
                        <HStack justifyContent={"space-between"} alignItems={"center"}>
                          <Text fontSize={14}>On Receiving</Text>
                          <Text fontSize={14}>{v.stok.brg_onreceived} {data.satuan}</Text>
                        </HStack>
                        <HStack justifyContent={"space-between"} alignItems={"center"}>
                          <Text fontSize={14}>On Deliver</Text>
                          <Text fontSize={14}>{v.stok.brg_ondelivered} {data.satuan}</Text>
                        </HStack>
                        <HStack justifyContent={"space-between"} alignItems={"center"}>
                          <Text fontSize={14} fontWeight={"bold"}>Own</Text>
                          <Text fontSize={14} fontWeight={"bold"}>{v.stok.brg_own} {data.satuan}</Text>
                        </HStack>
                      </>
                      :
                      <Text>Data tidak ditemukan</Text>
                    }
                  </VStack>
                </Flex>
              )
            })
          }
        </ScrollView>
      </VStack>
    </SafeAreaView>
  );
};

export default Result;
