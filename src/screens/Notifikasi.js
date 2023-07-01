import { StyleSheet, View, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import {Image, FlatList, HStack, Text, VStack, Stack, Icon, Divider} from 'native-base';
import Ion from "react-native-vector-icons/Ionicons";
import {useDispatch, useSelector} from 'react-redux';
import {getNotif} from '@redux/slices/notif';
import moment from 'moment';
import "moment/min/locales";
moment.locale("ID")

import apiClient from '../commons/ApiCall';

import Header from '../components/Header'
import ButtonSkeleton from '../components/ButtonSkeleton';

const Notifikasi = () => {
    const dispatch = useDispatch();
    const {loading, success, data} = useSelector(state => state.notif);

    useEffect(() => {
        dispatch(getNotif())
    }, [])

    const _handleRemoveNotifikasi = async (id) => {
        try {
            const resp = await apiClient.post(`notification/${id}/remove`)
            console.log(resp);
            dispatch(getNotif())
        } catch (e) {
            console.log(e);
            alert(e.response.data.diagnostic.message)
        }
    }

    // console.log('loading', loading);
    // console.log('success', success);

    return (
        <SafeAreaView style={{flex: 1}}>
            <Header back={true} title="Notifikasi" />
            <View style={{flex: 1, backgroundColor: "white"}}>
                {
                    loading &&
                    <VStack my={2}>
                        <VStack mb={3}>
                            <ButtonSkeleton />
                        </VStack>
                        <VStack mb={3}>
                            <ButtonSkeleton />
                        </VStack>
                        <VStack mb={3}>
                            <ButtonSkeleton />
                        </VStack>
                    </VStack>
                }
                <FlatList data={data} renderItem={ ( { item } ) => {
                    return (
                        <Stack>
                            <HStack space={2} pl={5} pr={3} justifyContent={"space-between"} alignItems={"center"}>
                                <VStack width={"5%"} mr={2}>
                                    {
                                        item.status === 'unread' ?
                                        <Icon as={Ion} name="ios-mail-unread" size={"25px"} color="#C4C4C4" />
                                        :
                                        <Icon as={Ion} name="mail-open-outline" size={"25px"} color="grey.50" />
                                    }
                                </VStack>
                                <VStack flex={1} py={2}>
                                    <Text bold>{item.header}</Text>
                                    <Text lineHeight={"2xs"} textAlign={"left"}>{item.content}</Text>
                                    <HStack space={4} justifyContent={"space-between"}>
                                        <Text fontSize={"12px"} textAlign={"left"} fontStyle={"mulish.italic"}>By {item.pengirim?.nama_lengkap}</Text>
                                        <Text fontSize={"12px"} textAlign={"right"} color={"green.700"}>{moment(item.created_at).calendar()}</Text>
                                    </HStack>
                                </VStack>
                                <TouchableOpacity onPress={() => _handleRemoveNotifikasi(item.id)}>
                                    <Icon as={Ion} name="close-circle" size={"25px"} color="red.500" width={"5%"} />
                                </TouchableOpacity>
                            </HStack>
                            <Divider />
                        </Stack>
                    )
                }} keyExtractor={item => item.id}/>
            </View>
        </SafeAreaView>
    )
}

export default Notifikasi

const styles = StyleSheet.create({})