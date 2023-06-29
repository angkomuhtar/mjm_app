import { StyleSheet, View, Image, Dimensions, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import {Center, Text, Icon, HStack, Button} from 'native-base';
import {RNCamera} from 'react-native-camera';
import { useNavigation } from '@react-navigation/native'

const { width, height } = Dimensions.get("window")
const ASPECT_RATIO = width / height

import Header from '@components/Header';

const MainOpname = () => {
    const navigation = useNavigation()
    const [ openScan, setOpenScan ] = useState(false)

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.vContainer}>
                <Header setting={false} title="Stok-Opname" />
                {
                    openScan ?
                    <View style={{justifyContent: "center", alignItems: "center", flex: 1}}>
                        <RNCamera
                            autoFocus="on"
                            style={{
                                position: "absolute",
                                top: 0,
                                height: Dimensions.get('screen').height,
                                width: Dimensions.get('screen').width,
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                            }}
                            // onGoogleVisionBarcodesDetected={e=>?x` }
                            onBarCodeRead={e => {
                                navigation.navigate('list-opname', e.data)
                                setOpenScan(false)
                        }}/>
                    </View>
                    :
                    <View style={{justifyContent: "center", alignItems: "center", backgroundColor: "white", flex: 1, paddingHorizontal: 20}}>
                        <Center>
                            <View style={{marginBottom: 20}}>
                                <Text bold style={{textAlign: "center"}}>Gunakan Scan Kode QR</Text>
                                <Text style={{textAlign: "center"}}>untuk mengsinkronisasi data dengan aplikasi desktop dan mobile apps</Text>
                            </View>
                            <Image source={require('../../../assets/scan-opname.png')} style={{width: width * ASPECT_RATIO, height: width * ASPECT_RATIO}}/>
                        </Center>
                        <View style={{flexDirection: "row", width: '100%', marginTop: 20, justifyContent: "space-around", alignItems: "center", paddingHorizontal: 20}}>
                            <View>
                                <Button onPress={() => setOpenScan(true)} size="sm" variant="outline">
                                    Scan New Stok Opname
                                </Button>
                            </View>
                            <View>
                                <Button onPress={() => navigation.navigate('history-opname')} size="sm" variant="outline">
                                    Riwayat Opname
                                </Button>
                            </View>
                        </View>
                    </View>

                }
            </View>

        </SafeAreaView>
    )
}

export default MainOpname

const styles = StyleSheet.create({
    vContainer: {
        backgroundColor: 'white',
        flex: 1
    }
})