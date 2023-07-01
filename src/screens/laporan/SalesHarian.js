import { Dimensions, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import {Image, Stack, HStack, Text, VStack, Icon, Input, Divider} from 'native-base';
import React, { useState, useEffect } from 'react'
import Ion from 'react-native-vector-icons/Ionicons';
import Ant from "react-native-vector-icons/AntDesign";
import Mci from "react-native-vector-icons/MaterialCommunityIcons";
import DatePicker from 'react-native-date-picker'
import apiClient from '../../commons/ApiCall';
import moment from 'moment';
import NODATA from '../../assets/no-data.png';
import { ProgressChart } from "react-native-chart-kit";

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

const SalesHarian = () => {
    const [ openFilter, setOpenFilter ] = useState(false)
    const [ openDateStart, setOpenDateStart ] = useState(false)
    const [ openDateEnd, setOpenDateEnd ] = useState(false)
    const [ filter, setFilter ] = useState({ 
        startDate: moment().startOf('day').format("YYYY-MM-DD HH:mm"), 
        endDate: moment().endOf('day').format("YYYY-MM-DD HH:mm")
    })
    const [ sales, setSales ] = useState([])
    const [ grandTotal, setGrandTotal ] = useState(0)
    
    useEffect(() => {
        _handleFetchDataLabaRugi()
    }, [])

    const _handleOpenFilterArea = () => {
        setOpenFilter(!openFilter)
        _handleFetchDataLabaRugi()
    }

    const _handleFetchDataLabaRugi = async () => {
        try {
            const resp = await apiClient.get(`sales-harian?startDate=${filter.startDate}&endDate=${filter.endDate}`)
            // console.log(resp);
            if(!resp.data.diagnostic.error){
                setSales(resp.data?.data)
                setGrandTotal(resp.data?.data.reduce((a, b) => { return a + b.total }, 0))
            }
          } catch (e) {
            console.log(e);
            alert(e.response.data.diagnostic.message)
          }
    }

    const _handleChangeDateTeks = (type, teks) => {
        if(type === 'start'){
            setFilter({...filter, startDate: teks})
        }else{
            setFilter({...filter, endDate: teks})
        }
    }

    const _handleSelectDate = (type, date) => {
        console.log(type);
        console.log(date);
        if(type === 'start'){
            setFilter({...filter, startDate: moment(date).startOf('day').format("YYYY-MM-DD HH:mm")})
            setOpenDateStart(false)
        }else{
            setFilter({...filter, endDate: moment(date).endOf('day').format("YYYY-MM-DD HH:mm")})
            setOpenDateEnd(false)
        }
    }

    console.log(sales);
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1}}>
                <Header back={true} title="Laporan Sales" filter={true} onFilter={_handleOpenFilterArea}/>
                <ScrollView>
                    <View style={{flex: 1}}>
                        {
                            openFilter &&
                            <VStack p={4} mb={"5px"} bg={"white"}>
                                <HStack width={"full"} justifyContent={"space-between"} alignItems={"center"} pb={"5px"}>
                                    <Text bold>Filter Laporan</Text>
                                    <TouchableOpacity onPress={_handleOpenFilterArea} style={{backgroundColor:"#ddd", borderRadius: 20}}>
                                        <Icon as={Ion} name="close-outline" size={"20px"} color="red.500" />
                                    </TouchableOpacity>
                                </HStack>
                                <Divider />
                                <VStack pt={"10px"} w={"full"}>
                                    <Text fontSize={"12px"}>Mulai Tanggal</Text>
                                    <HStack alignItems="center" flex={1} justifyContent={"space-between"}>
                                        <Input isDisabled onChangeText={(teks) => _handleChangeDateTeks('start', teks)} value={`${filter.startDate}`} size="sm" width={"90%"} placeholder="format: YYYY-MM-DD" />
                                        <TouchableOpacity onPress={() => setOpenDateStart(true)}>
                                            <Icon as={Ant} name="calendar" size={"25px"} color="grey.500" width={"5%"} />
                                        </TouchableOpacity>
                                    </HStack>
                                    <DatePicker
                                        modal
                                        mode='date'
                                        locale="ID"
                                        open={openDateStart}
                                        date={new Date(moment().startOf('month').format("YYYY-MM-DD HH:mm"))}
                                        onConfirm={(date) => _handleSelectDate('start', date)}
                                        onCancel={() => {
                                            setOpenDateStart(false)
                                        }}
                                    />
                                </VStack>
                                <VStack pt={"10px"} w={"full"}>
                                    <Text fontSize={"12px"}>Hingga Tanggal</Text>
                                    <HStack alignItems="center" flex={1} justifyContent={"space-between"}>
                                        <Input isDisabled onChangeText={(teks) => _handleChangeDateTeks('end', teks)} value={`${filter.endDate}`} size="sm" width={"90%"} placeholder="format: YYYY-MM-DD" />
                                        <TouchableOpacity onPress={() => setOpenDateEnd(true)}>
                                            <Icon as={Ant} name="calendar" size={"25px"} color="grey.500" width={"5%"} />
                                        </TouchableOpacity>
                                    </HStack>
                                </VStack>
                                <DatePicker
                                        modal
                                        mode='date'
                                        locale="ID"
                                        open={openDateEnd}
                                        date={new Date(moment().startOf('month').format("YYYY-MM-DD HH:mm"))}
                                        onConfirm={(date) => _handleSelectDate('end', date)}
                                        onCancel={() => {
                                            setOpenDateEnd(false)
                                        }}
                                    />
                            </VStack>
                        }
                        <VStack p={4} bg={"white"}>
                            <Text bold>Periode Laporan</Text>
                            <Text fontSize={"12px"}>{filter.startDate} s/d {filter.endDate}</Text>
                        </VStack>
                        { 
                            sales.length === 0 &&
                            <VStack flex={1} bgColor={"white"} mt={"5px"}>
                                <Image source={NODATA} resizeMode={"contain"} alt="Alternate Text" width={"100%"} height={`${height * .35}px`} />
                            </VStack>
                        }
                        {
                            sales?.map( v => {
                                return (
                                    <VStack key={v.cabang_id}>
                                        <HStack p={4} mt={1} bg={"white"} justifyContent={"space-between"}>
                                            <Text bold>{v.nm_cabang}</Text>
                                            <Text bold color={"grey"}>Rp. {(v.total)?.toLocaleString('ID')}</Text>
                                        </HStack>
                                        <VStack bg={"white"}>
                                            <ProgressChart
                                                data={{
                                                    labels: ["Kredit", "Tunai"], // optional
                                                    data: [v?.persenNonTunai, v?.persenTunai]
                                                }}
                                                width={width}
                                                paddingLeft={width/4}
                                                height={220}
                                                strokeWidth={30}
                                                radius={32}
                                                chartConfig={chartConfig}
                                                hideLegend={false}
                                                />
                                                {
                                                    v.items?.map( j => {
                                                        return (
                                                            <VStack key={j.id} px={3} my={2} flex={1}>
                                                                <HStack flex={1} justifyContent={"space-between"} pb={"5px"}>
                                                                    <HStack>
                                                                        <Icon as={Mci} name="calendar-clock" size={"20px"} color="grey" mr={"5px"} />
                                                                        <Text>{moment(j.datetime).format("dddd, DD MMMM YYYY")}</Text>
                                                                    </HStack>
                                                                    <HStack>
                                                                        <Icon as={Mci} name="alarm" size={"20px"} color="grey" mr={"5px"} />
                                                                        <Text>{moment(j.datetime).format("HH:mm")}</Text>
                                                                    </HStack>
                                                                </HStack>
                                                                <Divider />
                                                                <HStack flex={1} justifyContent={"space-between"} alignItems={"center"} pt={'5px'} bgColor={"primary.100"}>
                                                                    <VStack pl={2}>
                                                                        <Text>{j.kwitansi}</Text>
                                                                        <Text fontWeight={'thin'}>{j.metode}</Text>
                                                                    </VStack>
                                                                    <Text bold>Rp. {(j.nilai)?.toLocaleString('ID')}</Text>
                                                                </HStack>
                                                            </VStack>
                                                        )
                                                    })
                                                }
                                        </VStack>
                                    </VStack>
                                )
                            })
                        }
                        <VStack p={4} mt={"5px"} bgColor={"primary.50"}>
                            <HStack width={"full"} justifyContent={"space-between"} alignItems={"center"} pb={"5px"}>
                                <Text bold>Total</Text>
                                <Text bold>Rp. {(grandTotal)?.toLocaleString('ID')}</Text>
                            </HStack>
                        </VStack>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default SalesHarian