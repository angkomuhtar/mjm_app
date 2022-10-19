import {View, Text} from 'react-native';
import React from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';

const QRCode = () => {
  //   const navigation = useNavigation();
  //   const onSuccess = e => {
  //     // let {data, type} = e;
  //     // navigation.navigate('stock', {
  //     //   itemId: data,
  //     // });
  //     console.log(e);
  //   };
  return (
    <QRCodeScanner
      onRead={e => {
        console.log(e);
      }}
      bottomViewStyle={{height: 0}}
    />
  );
};

export default QRCode;
