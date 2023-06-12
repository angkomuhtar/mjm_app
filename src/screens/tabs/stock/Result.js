import {Dimensions, TouchableOpacity} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {Text, VStack, ScrollView, Image, HStack} from 'native-base';
import Header from '@components/Header';
import DefaultImg from '../../../assets/no-image.png';
import {useDispatch, useSelector} from 'react-redux';
import {getByCode} from '@redux/slices/item';
import {TextLabel} from '@components';

const Result = ({route}) => {
  const {code} = route.params;
  const {loading, success, data} = useSelector(state => state.item);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getByCode(code));
  }, [code]);

  console.log(data, loading);

  return (
    <>
      <Header back={true} title="Scan Result" />
      <VStack flex={1}>
        <ScrollView>
          <HStack space={2} m={3} background="white" borderRadius="md">
            <Image
              source={data?.photo ? {uri: data.photo} : DefaultImg}
              alt=""
              width="1/4"
              height={110}
              borderLeftRadius="md"
            />
            <VStack justifyContent="center" alignContent="center">
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
        </ScrollView>
      </VStack>
    </>
  );
};

export default Result;
