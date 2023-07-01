import { StyleSheet, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import {Image, Stack, HStack, Text, VStack, Icon, Input, Divider} from 'native-base';
import React, { useState, useEffect } from 'react'
import Ion from 'react-native-vector-icons/Ionicons';
import Ant from "react-native-vector-icons/AntDesign";
import DatePicker from 'react-native-date-picker'
import apiClient from '../../commons/ApiCall';
import moment from 'moment';

import Header from '@components/Header';

const LabaRugi = () => {
    const [ openFilter, setOpenFilter ] = useState(false)
    const [ openDateStart, setOpenDateStart ] = useState(false)
    const [ openDateEnd, setOpenDateEnd ] = useState(false)
    const [ filter, setFilter ] = useState({ 
        startDate: moment().startOf('month').format("YYYY-MM-DD"), 
        endDate: moment().endOf('month').format("YYYY-MM-DD")
    })
    const [ labarugi, setLabaRugi ] = useState([])
    
    useEffect(() => {
        _handleFetchDataLabaRugi()
    }, [])

    const _handleOpenFilterArea = () => {
        setOpenFilter(!openFilter)
        _handleFetchDataLabaRugi()
    }

    const _handleFetchDataLabaRugi = async () => {
        try {
            const resp = await apiClient.get(`laba-rugi?startDate=${filter.startDate}&endDate=${filter.endDate}`)
            // console.log(resp);
            if(!resp.data.diagnostic.error){
                setLabaRugi(resp.data?.data)
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
            setFilter({...filter, startDate: moment(date).format("YYYY-MM-DD")})
            setOpenDateStart(false)
        }else{
            setFilter({...filter, endDate: moment(date).format("YYYY-MM-DD")})
            setOpenDateEnd(false)
        }
    }

    console.log(labarugi);
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1}}>
                <Header back={true} title="Laporan Laba Rugi" filter={true} onFilter={_handleOpenFilterArea}/>
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
                                        <Input onChangeText={(teks) => _handleChangeDateTeks('start', teks)} value={`${filter.startDate}`} size="sm" width={"90%"} placeholder="format: YYYY-MM-DD" />
                                        <TouchableOpacity onPress={() => setOpenDateStart(true)}>
                                            <Icon as={Ant} name="calendar" size={"25px"} color="grey.500" width={"5%"} />
                                        </TouchableOpacity>
                                    </HStack>
                                    <DatePicker
                                        modal
                                        mode='date'
                                        locale="ID"
                                        open={openDateStart}
                                        date={new Date(moment().startOf('month').format("YYYY-MM-DD"))}
                                        onConfirm={(date) => _handleSelectDate('start', date)}
                                        onCancel={() => {
                                            setOpenDateStart(false)
                                        }}
                                    />
                                </VStack>
                                <VStack pt={"10px"} w={"full"}>
                                    <Text fontSize={"12px"}>Hingga Tanggal</Text>
                                    <HStack alignItems="center" flex={1} justifyContent={"space-between"}>
                                        <Input onChangeText={(teks) => _handleChangeDateTeks('end', teks)} value={`${filter.endDate}`} size="sm" width={"90%"} placeholder="format: YYYY-MM-DD" />
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
                                        date={new Date(moment().startOf('month').format("YYYY-MM-DD"))}
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
                        <HStack p={4} mt={1} bg={"white"} justifyContent={"space-between"}>
                            <Text bold>Pendapatan</Text>
                            <Text bold color={"#C4C4C4"}>Rp. {(labarugi?.totalPendapatan)?.toLocaleString('ID')}</Text>
                        </HStack>
                        <Divider />
                        {
                            labarugi?.pendapatan?.map( v => {
                                return (
                                    <VStack key={v.id} py={1} px={4} bg={"white"}>
                                        <HStack space={1} w={"full"} justifyContent={"space-between"}>
                                            <HStack alignItems={"center"}>
                                                <Icon as={Ant} name="caretright" size={"15px"} color="#ddd" mr={"5px"}/>
                                                <Text>{v.coa_name}</Text>
                                            </HStack>
                                            <HStack>
                                                <Text>Rp. {v.total ? (v.total)?.toLocaleString('ID'):'-'}</Text>
                                            </HStack>
                                        </HStack>
                                    </VStack>
                                )
                            })
                        }
                        <HStack p={4} mt={1} bg={"white"} justifyContent={"space-between"}>
                            <Text bold>Biaya & Beban</Text>
                            <Text bold color={"#C4C4C4"}>Rp. {(labarugi?.totalBiaya)?.toLocaleString('ID')}</Text>
                        </HStack>
                        <Divider />
                        {
                            labarugi?.biaya?.map( v => {
                                return (
                                    <VStack key={v.group_id} py={2} px={4} mb={1} bg={"white"}>
                                        <HStack space={1} w={"full"} justifyContent={"space-between"} pb={2}>
                                            <HStack alignItems={"center"}>
                                                <Icon as={Ant} name="caretright" size={"15px"} color="#ddd" mr={"5px"}/>
                                                <Text>{v?.group}</Text>
                                            </HStack>
                                            <HStack>
                                                <Text>Rp. {v.groupTot ? (v.groupTot)?.toLocaleString('ID'):'-'}</Text>
                                            </HStack>
                                        </HStack>
                                        <Divider />
                                        {
                                            v.items?.map( j => {
                                                return (
                                                    <HStack key={j.id} pl={6} space={1} w={"full"} justifyContent={"space-between"}>
                                                        <HStack alignItems={"center"}>
                                                            <Icon as={Ant} name="forward" size={"15px"} color="#ddd" mr={"5px"}/>
                                                            <Text>{j.coa_name}</Text>
                                                        </HStack>
                                                        <HStack>
                                                            <Text>Rp. {v.total ? (v.total)?.toLocaleString('ID'):'-'}</Text>
                                                        </HStack>
                                                    </HStack>
                                                )
                                            })
                                        }
                                    </VStack>
                                )
                            })
                        }
                        <VStack p={4} mt={"5px"} bg={labarugi?.isProfit ? "green.300":"red.300"}>
                            <HStack width={"full"} justifyContent={"space-between"} alignItems={"center"} pb={"5px"}>
                                <Text bold>Total</Text>
                                <Text bold>Rp. {(labarugi?.totalPendapatan - labarugi?.totalBiaya)?.toLocaleString('ID')}</Text>
                            </HStack>
                        </VStack>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default LabaRugi
