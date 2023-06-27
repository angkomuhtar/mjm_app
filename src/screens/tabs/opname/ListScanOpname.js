import { StyleSheet, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Icon, Text, VStack, HStack, Skeleton, Divider, Input } from "native-base";
import Ant from 'react-native-vector-icons/AntDesign';
import {RNCamera} from 'react-native-camera'
import { useNavigation, useRoute } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';

import {useSelector} from 'react-redux';
import apiClient from '../../../commons/ApiCall';

import Header from '@components/Header';

const ListScanOpname = () => {
    const { params } = useRoute()
    const navigation = useNavigation()
    let brand = DeviceInfo.getBrand();
    let deviceId = DeviceInfo.getDeviceId();
    console.log(brand, deviceId);
    const {loading, success, data} = useSelector(state => state.item);
    const [ openScan, setOpenScan ] = useState(false)
    const [ dataScan, setDataScan ] = useState([])

    useEffect(() => {
        _handleExsistingScan()
        return () => _handleExsistingScan()
    }, [])

    const _handleExsistingScan = async () => {
        try {
            const value = await AsyncStorage.getItem('@ScanOpname');
            if (value !== null) {
                setDataScan(JSON.parse(value))
            }else{
                setDataScan([])
            }
        } catch (e) {
            alert('Failed load data localStorages...')
        }
    }

    const _handleLocalStorageScan = async (arrData) => {
        try {
          await AsyncStorage.setItem('@ScanOpname', JSON.stringify(arrData));
        } catch (error) {
          console.log(error);
        }
    }

    const _handleScanItems = async(code) => {
        try {
            const resp = await apiClient.get(`barang/${code}/show-kode`);
            console.log(resp);
            if (!resp.data.diagnostic.error) {
                const { data } = resp.data
                let resultData = dataScan.filter( v => v.id === data.id)
                if(resultData.length > 0){
                    setDataScan(dataScan.map( v => v.id === data.id ? {...v, qty: v.qty + 1} : v))
                }else{
                    setDataScan([
                        ...dataScan, 
                        {
                            so: params, 
                            devices: brand + " " + deviceId,
                            id: data.id, 
                            nama: data.nama, 
                            qty: 1, 
                            stn: data.satuan, 
                            num_part: data.num_part || ''
                        }
                    ])
                }
                await _handleLocalStorageScan(dataScan)
                setOpenScan(false)
            }else{
                setOpenScan(false)
            }

          } catch (error) {
            console.log(error);
            setOpenScan(false)
          }
    }

    // OPEN SHEET INPUT-TEXT
    const _handleChangeQuantity = async (id, teks) => {
        if(teks){
            setDataScan(dataScan.map( v => v.id === id ? {...v, qty: parseFloat(teks)} : v))
            await _handleLocalStorageScan(dataScan.map( v => v.id === id ? {...v, qty: parseFloat(teks)} : v))
        }

    }

    const _handleRemoveItems = async(val) => {
        setDataScan(dataScan.filter( v => v.id != val.id))
        await _handleLocalStorageScan(dataScan.filter( v => v.id != val.id))
    }

    const _handleClearDataScan = () => {
        setDataScan([])
        _handleLocalStorageScan([])
    }

    const _handleSendDataOpname = async () => {
        const dataPost = JSON.stringify(dataScan)
        const resp = await apiClient.post(`mobile-opname`, dataPost);
        if(!resp.data.diagnostic.error){
            setDataScan([])
            await _handleLocalStorageScan([])
            alert('Data berhasil tersimpan...')
            navigation.goBack()
        }
        
    }

    // console.log(data, loading, success);
    console.log(JSON.stringify(dataScan, null, 2));
    return (
        <View style={{flex: 1, backgroundColor: 'white'}}>
            <Header setting={false} back={true} title="Start-Opname" />
            <View style={{height: 50, paddingHorizontal: 20, paddingVertical: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                <Text>Mulai Scan</Text>
                <TouchableOpacity onPress={() => setOpenScan(true)}>
                    <Icon as={Ant} name={"scan1"} size={30} color={'gray.900'} />
                </TouchableOpacity>
            </View>
            <Divider my="2" _light={{bg: "muted.800"}} _dark={{bg: "muted.50"}} />
            {
                openScan ?
                <View style={{justifyContent: "center", alignItems: "center", flex: 1}}>
                    <RNCamera
                        autoFocus="on"
                        style={{
                            position: 'relative',
                            height: Dimensions.get('screen').height-120,
                            width: Dimensions.get('screen').width,
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                        }}
                        // onGoogleVisionBarcodesDetected={e=>?x` }
                        onBarCodeRead={e => {
                            _handleScanItems(e.data)
                    }}/>
                </View>
                :
                <ScrollView>
                    <View style={{flex: 1}}>
                        {
                            dataScan.map( (v, i) => {
                                return (
                                    <View key={i} style={{borderBottomWidth: 1, borderBottomColor: '#ddd'}}>
                                        <HStack space={4} py="1" px={5}>
                                            <VStack flex={1}>
                                                <Text fontWeight="800" fontSize={12}>
                                                    {params}
                                                </Text>
                                                <Text fontWeight="800" fontSize={20}>
                                                    {v?.nama}
                                                </Text>
                                                <Text fontWeight="800" fontSize={12}>
                                                    {v.num_part}
                                                </Text>
                                            </VStack>
                                            <VStack width="1/5">
                                                <Text fontWeight="800" fontSize={12}>
                                                    Jumlah
                                                </Text>
                                                <TouchableOpacity onPress={null}>
                                                    <Input borderWidth={0} px={0} value={`${v.qty}`} size="xs" onChangeText={(teks) => _handleChangeQuantity(v.id, teks)} fontSize={16} py={0} />
                                                </TouchableOpacity>
                                                <Text fontWeight="400" fontSize={12}>
                                                    {v.stn}
                                                </Text>
                                            </VStack>
                                            <VStack alignItems="center" justifyContent={"center"}>
                                                <TouchableOpacity onPress={() => _handleRemoveItems(v)}>
                                                    <Icon as={Ant} name={"delete"} size={"md"} color={'red.500'} />
                                                </TouchableOpacity>
                                            </VStack>
                                        </HStack>
                                    </View>
                                )
                            })
                        }
                    </View>
                    {
                        dataScan.length > 0 &&
                        <View style={{flex: 1, justifyContent: "space-around", alignItems: "center", marginVertical: 15, flexDirection: "row"}}>
                            <TouchableOpacity onPress={_handleClearDataScan}>
                                <Text fontWeight="300">Clear Data</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={_handleSendDataOpname}>
                                <Text fontWeight="800">Save Data</Text>
                            </TouchableOpacity>
                        </View>
                    }
                </ScrollView>
            }
        </View>
    )
}

export default ListScanOpname

const styles = StyleSheet.create({})