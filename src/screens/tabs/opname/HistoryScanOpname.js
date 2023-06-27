import { StyleSheet, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Icon, Text, VStack, Avatar, HStack, Skeleton, Divider, ScrollView } from "native-base";

import Header from '@components/Header';

import apiClient from '../../../commons/ApiCall';

const HistoryScanOpname = () => {
    const [ loading, setLoading ] = useState(true)
    const [ history, setHistory ] = useState([])

    useEffect(() => {
        _handleFetchApiHistory()
        return () => _handleFetchApiHistory()
    }, [])

    const _handleFetchApiHistory = async () => {
        const resp = await apiClient.get(`mobile-opname/user-scan`)
        if(!resp.data.diagnostic.error){
            setHistory(resp.data.data)
            setLoading(false)
        }else{
            alert('Network Error...')
        }
    }

    return (
        <View style={{flex: 1, backgroundColor: "white"}}>
            <Header setting={false} back={true} title="Riwayat-Scan" />
            <ScrollView>
                {
                    loading &&
                    <VStack flex={1} space="3" mt={"5"} mx={5} px={"3"} >
                        <Skeleton h="2" flex="1" rounded="full" />
                        <Skeleton h="3" flex="1" rounded="full" />
                        <Skeleton h="3" w={90} rounded="full" startColor="indigo.300" />
                        <Skeleton flex="1" rounded="full" />
                        <Skeleton flex="1" rounded="full" />
                    </VStack>
                }
                {
                    history?.map( v => {
                        return (
                            <VStack 
                                key={v.kode} 
                                bgColor={"white"} 
                                space={4} 
                                alignItems="center" 
                                mt={"5"} 
                                mx={5} 
                                px={"3"} 
                                borderWidth={"1"} 
                                borderColor={"gray.200"} 
                                my={"1.5"} 
                                borderRadius="lg" 
                                shadow="1">
                                <VStack flex={1} justifyContent={"space-between"} space={2} size={"md"} w={"100%"} py={5}>
                                    <Text fontWeight={"700"}>{v.kode}</Text>
                                    <Divider />
                                    {
                                        v.items.map( i => {
                                            return (
                                                <VStack key={i.id}>
                                                    <HStack flex={1} justifyContent={"space-between"}>
                                                        <VStack width={"50"}>
                                                            <Avatar bg="green.500" source={{ uri: i.barang.photo}}>
                                                                <Text fontSize={10} color={"white"}>No</Text>
                                                                <Text fontSize={10} color={"white"}>Photo</Text>
                                                            </Avatar>
                                                        </VStack>
                                                        <VStack flex={1} ml={3}>
                                                            <Text>{i.barang.kode}</Text>
                                                            <Text fontSize={16} bold>{i.nm_barang}</Text>
                                                            <Text fontSize={12}>{i.barang.num_part}</Text>
                                                        </VStack>
                                                        <VStack>
                                                            <Text fontSize={18} fontWeight={"700"}>{i.qty_opname}</Text>
                                                            <Text>{i.barang.satuan}</Text>
                                                        </VStack>
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
            </ScrollView>
        </View>
    )
}

export default HistoryScanOpname

const styles = StyleSheet.create({})