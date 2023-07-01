import { Dimensions, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import {Image, FlatList, HStack, Text, VStack, Icon, Input, Divider, Box} from 'native-base';
import React, { useState, useEffect } from 'react'
import Ion from 'react-native-vector-icons/Ionicons';
import Ant from "react-native-vector-icons/AntDesign";
import Mci from "react-native-vector-icons/MaterialCommunityIcons";
import apiClient from '../../commons/ApiCall';
import moment from 'moment';
import { ProgressChart } from "react-native-chart-kit";
import NODATA from '../../assets/no-data.png';
import DefaultImg from '../../assets/no-image.png';

import Header from '@components/Header';

const { width, height } = Dimensions.get("screen")

const chartConfig = {
    backgroundGradientFrom: "#1488CC",
    // backgroundGradientFrom: "#f6c4a3",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#536976",
    // backgroundGradientTo: "#ebb136",
    backgroundGradientToOpacity: 0.5,
    // color: (opacity = 1) => `#753a88`,
    color: (opacity = 1) => `rgba(9, 50, 105, ${opacity})`,
    strokeWidth: 5, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
};

const BarangMinimum = () => {
    const [ openFilter, setOpenFilter ] = useState(false)
    const [ filter, setFilter ] = useState('')
    const [ barang, setBarang ] = useState([])
    
    useEffect(() => {
        _handleFetchDataStok()
    }, [])

    const _handleOpenSearchKeyword = () => {
        setOpenFilter(!openFilter)
        _handleFetchDataStok()
    }

    const _handleFetchDataStok = async () => {
        try {
            const resp = await apiClient.get(`minimum-stok?keyword=${filter}`)
            // console.log(resp);
            if(!resp.data.diagnostic.error){
                setBarang(resp.data?.data)
            }
          } catch (e) {
            console.log(e);
            alert(e.response.data.diagnostic.message)
          }
    }

    const _handleSearchDataKeyword = () => {
        _handleFetchDataStok()
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1}}>
                <Header back={true} title="Monitoring Min Stok" filter={true} onFilter={_handleOpenSearchKeyword}/>
                {
                    openFilter &&
                    <ScrollView style={{flex: 1}}>
                        <View style={{flex: 1}}>
                            <VStack px={4} pb={2} mb={"5px"} bg={"white"}>
                                <VStack pt={"10px"} w={"full"}>
                                    <Text fontSize={"14px"}>Cari Barang</Text>
                                    <HStack alignItems="center" flex={1} justifyContent={"space-between"}>
                                        <Input onChangeText={(teks) => setFilter(teks)} value={`${filter}`} size="sm" width={"90%"} placeholder="Enter keyword here..." />
                                        <TouchableOpacity onPress={_handleSearchDataKeyword}>
                                            <Icon as={Ant} name="search1" size={"25px"} color="grey.500" width={"5%"} />
                                        </TouchableOpacity>
                                    </HStack>
                                    <Text fontSize={"10px"} fontStyle={"italic"}>Keyword dapat berupa kode, nama atau no.part barang</Text>
                                </VStack>
                            </VStack>
                        </View>
                    </ScrollView>
                }
                <View style={{flex: 6}}>
                    <FlatList mt={"5px"} data={barang} renderItem={({item}) => 
                        <Box key={item.kode} borderBottomWidth="1" _dark={{borderColor: "muted.50"}} bgColor={"white"}
                            borderColor="muted.800" px={4} py="2">
                            <HStack space={2}>
                                <Image
                                    source={item?.photo ? {uri: item.photo} : DefaultImg}
                                    alt="Photo Barang"
                                    width="100px"
                                    height={'100px'}
                                    borderLeftRadius="md"
                                    />
                                <VStack flex={1}>
                                    <Text _dark={{color: "warmGray.50"}} color="coolGray.800">
                                        {item.kode}
                                    </Text>
                                    <Text _dark={{color: "warmGray.50"}} fontSize={"16px"} color="coolGray.800" bold>
                                        {item.nama}
                                    </Text>
                                    <Text _dark={{color: "warmGray.50"}} fontSize={"12px"} color="coolGray.800" fontWeight={"thin"}>
                                        Number Part : {item.part}
                                    </Text>
                                    <Text _dark={{color: "warmGray.50"}} fontSize={"12px"} color="coolGray.800" fontWeight={"thin"}>
                                        Min/Current : {item.min} / {item.stok}
                                    </Text>
                                    <Text _dark={{color: "warmGray.50"}} fontSize={"12px"} color="coolGray.800" fontWeight={"thin"} bold>
                                        Variences : {item.variences}
                                    </Text>
                                </VStack>
                            </HStack>
                        </Box>} keyExtractor={item => item.kode} />

                </View>
            </View>
        </SafeAreaView>
    )
}

export default BarangMinimum