import {Dimensions, TouchableOpacity} from 'react-native';
import React, {useRef, useState} from 'react';
import {Text, HStack, Icon, VStack, ScrollView, Image} from 'native-base';
import {TextLabel} from '@components';
import Header from '@components/Header';
import {RNCamera} from 'react-native-camera';
import Fa from 'react-native-vector-icons/Ionicons';
import {navigate} from '@commons/RootNavigation';
import DefaultImg from '../../../assets/no-image.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '../../../commons/ApiCall';
import moment from 'moment';

const { height } = Dimensions.get("screen")

const OpnameTabs = () => {
  const [ scanKode, setScanKode ] = useState(null)
  const [ history, setHistory ] = useState([])

  const onSuccess = e => {
    Linking.openURL(e.data).catch(err =>
      console.error('An error occured', err),
    );
  };

  React.useEffect(() => {
    _handleGetLocalStorages()
    return () => _handleGetLocalStorages()
  }, [])

  React.useEffect(() => {
    fetchApiKodeBarang()
  }, [scanKode])

  const fetchApiKodeBarang = async () => {
    if(scanKode){
      const resp = await apiClient.get(`barang/${scanKode}/show-kode`)
      if(!resp.data.diagnostic.error){

        navigate('result', {code: scanKode});

        const resData = resp.data.data
        setHistory([...history, {...resData, key: moment().format("YYMMDDHHmmss"), scandate: moment().format('dddd, DD MMM YYYY')}])
        await _handleStoreLocalStorages([...history, {...resData, key: moment().format("YYMMDDHHmmss"), scandate: moment().format('dddd, DD MMM YYYY')}])
      }
    }
  }
  const _handleStoreLocalStorages = async (value) => {
    try {
      var strJson = JSON.stringify(value)
      await AsyncStorage.setItem('@resultScan', strJson);
    } catch (e) {
      console.log(e);
    }
  };

  const _handleGetLocalStorages = async () => {
    try {
      const dataJson = await AsyncStorage.getItem('@resultScan');
      if(dataJson){
        var dataParse = JSON.parse(dataJson)
        setHistory(dataParse)
      }
    } catch (e) {
      console.log(e);
    }
  }

  const removeLocal = async () => {
    try {
      await AsyncStorage.removeItem('@resultScan')
      setHistory([])
      alert('Scan History Removed...')
    } catch(e) {
      console.log(e);
    }
  }

  console.log("history", history);

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
            setScanKode(e.data)
          }}
        />
        <Header setting={true} title="Stock" position="absolute" />
        <VStack mt={height * .21}>
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
          <VStack background="white" px="4" py="2">
            <HStack alignItems="center" justifyContent="space-between">
              <Text
                fontWeight="extrabold"
                fontSize="sm"
                textTransform="uppercase">
                Scan History
              </Text>
              <TouchableOpacity onPress={removeLocal}>
                <Icon as={Fa} name="trash-outline" size="md" color="black" />
              </TouchableOpacity>
            </HStack>
            <VStack py={2}>
              <Text fontSize="xs" fontWeight="normal">
                Items that are scanned will be listed here
              </Text>
            </VStack>
          </VStack>
          <ScrollView flex={1}></ScrollView>
        </VStack>
        <ScrollView>
        {
          history?.map( data => {
            return (
              <TouchableOpacity key={data.key} onPress={() => navigate('result', {code: data.kode})}>
                <HStack space={2} m={3} background="white" borderRadius="md" p={2}>
                  <Image
                    source={data?.photo ? {uri: data.photo} : DefaultImg}
                    alt=""
                    width="1/4"
                    height={'100%'}
                    borderLeftRadius="md"
                  />
                  <VStack justifyContent="center" alignContent="center" flex={1}>
                    <Text fontSize={16} fontWeight="bold">
                      {data?.nama}
                    </Text>
                    <Text fontWeight="bold" textTransform="uppercase">
                      {data?.brand?.nama || '-'}
                    </Text>
                    <TextLabel text={data?.kode || '-'} title="Kode" />
                    <TextLabel text={data?.num_part || '-'} title="part number" />
                    <TextLabel text={data?.scandate || '-'} title="Scan Date" />
                  </VStack>
                </HStack>
              </TouchableOpacity>
              
            )
          })
        }

        </ScrollView>

      </VStack>
    </>
  );
};

export default OpnameTabs;
