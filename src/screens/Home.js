import React from 'react';
import Header from '@components/Header';
import {SafeAreaView, TextInput} from 'react-native';

const Home = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Header setting={true} title="Home" />
      <TextInput style={{borderBottomWidth: 1}} />
    </SafeAreaView>
  );
};

export default Home;
