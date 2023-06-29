import {View, SafeAreaView, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import {Image, Button, HStack, Text, VStack, Icon} from 'native-base';
import Ant from 'react-native-vector-icons/AntDesign';
import Header from '@components/Header';

// IMAGES
import PNL_1 from '../../assets/pnl-1.png';
import SALES from '../../assets/sales2.png';
import TOP10 from '../../assets/10top-items.png';
import MINSTOCK from '../../assets/min-stock.png';

const MainReport = (props) => {
    const { navigation } = props
    console.log(props);
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1}}>
                <Header setting={true} title="Reports" />
                <ScrollView style={{flex: 1}}>
                    <TouchableOpacity onPress={() => navigation.navigate('laba-rugi-report')}>
                        <VStack bgColor={"white"} mx={"10px"} mt={"10px"} p={5} height={"80px"}>
                        <HStack>
                            <HStack width={"4/5"}>
                            <VStack justifyContent={"center"} alignItems={"center"} mr={"5px"}>
                                <Image source={PNL_1} alt="Alternate Text" size="xs" />
                            </VStack>
                            <VStack>
                                <Text fontSize={"16px"} bold>Laporan Laba Rugi</Text>
                                <Text fontWeight={"200"} fontSize={"12px"}>Laporan Keuangan Laba Rugi Cabang</Text>
                            </VStack>
                            </HStack>
                            <HStack width={"1/5"} alignItems={"center"} justifyContent={"flex-end"}>
                            <Icon as={Ant} name={"arrowright"} size={"md"} color={'gray.900'}/>
                            </HStack>
                        </HStack>
                        </VStack>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <VStack bgColor={"white"} mx={"10px"} mt={"10px"} p={5} height={"80px"}>
                        <HStack>
                            <HStack width={"4/5"}>
                            <VStack justifyContent={"center"} alignItems={"center"} mr={"5px"}>
                                <Image source={SALES} alt="Alternate Text" size="xs" />
                            </VStack>
                            <VStack>
                                <Text fontSize={"16px"} bold>Laporan Sales Harian</Text>
                                <Text fontWeight={"200"} fontSize={"12px"}>Laporan Pendapatan Sales Harian Cabang</Text>
                            </VStack>
                            </HStack>
                            <HStack width={"1/5"} alignItems={"center"} justifyContent={"flex-end"}>
                            <Icon as={Ant} name={"arrowright"} size={"md"} color={'gray.900'}/>
                            </HStack>
                        </HStack>
                        </VStack>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <VStack bgColor={"white"} mx={"10px"} mt={"10px"} p={5} height={"80px"}>
                        <HStack>
                            <HStack width={"4/5"}>
                            <VStack justifyContent={"center"} alignItems={"center"} mr={"5px"}>
                                <Image source={TOP10} alt="Alternate Text" size="xs" />
                            </VStack>
                            <VStack>
                                <Text fontSize={"16px"} bold>Top 10 Penjualan Barang</Text>
                                <Text fontWeight={"200"} fontSize={"12px"}>10 Favorit Barang Terjual</Text>
                            </VStack>
                            </HStack>
                            <HStack width={"1/5"} alignItems={"center"} justifyContent={"flex-end"}>
                            <Icon as={Ant} name={"arrowright"} size={"md"} color={'gray.900'}/>
                            </HStack>
                        </HStack>
                        </VStack>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <VStack bgColor={"white"} mx={"10px"} mt={"10px"} p={5} height={"80px"}>
                        <HStack>
                            <HStack width={"4/5"}>
                            <VStack justifyContent={"center"} alignItems={"center"} mr={"5px"}>
                                <Image source={MINSTOCK} alt="Alternate Text" size="xs" />
                            </VStack>
                            <VStack>
                                <Text fontSize={"16px"} bold>Laporan Minimum Stock</Text>
                                <Text fontWeight={"200"} fontSize={"12px"}>Laporan Minimum Persediaan Barang</Text>
                            </VStack>
                            </HStack>
                            <HStack width={"1/5"} alignItems={"center"} justifyContent={"flex-end"}>
                            <Icon as={Ant} name={"arrowright"} size={"md"} color={'gray.900'}/>
                            </HStack>
                        </HStack>
                        </VStack>
                    </TouchableOpacity>
                    <VStack bgColor={"white"} mx={"10px"} mt={"10px"} p={5} flex={1} mb={"10px"} justifyContent={"center"} alignItems={"center"}>
                        <Icon as={Ant} name={"infocirlce"} size={"100px"} color={'#ddd'} mb={"20px"}/>
                        <Text textAlign={"center"} bold fontSize={"16px"}>Perhatian</Text>
                        <Text textAlign={"center"}>Beberapa Fitur laporan hanya dapat di akses oleh user dengan type tertentu</Text>
                        <Text textAlign={"center"} fontWeight={"100"}>Silahkan hubungi administrator untuk info lebih detail</Text>
                    </VStack>
                    <HStack justifyContent={"center"} alignItems={"center"}>
                        <Text color={"#C4C4C4"}>version 1.0</Text>
                    </HStack>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default MainReport;
