import {HStack, Text, View} from 'native-base';
import React, {useEffect, useState} from 'react';
import {ApprovalCard} from '@components';
import {FlatList, SafeAreaView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {navigate} from '@commons/RootNavigation';
import {action} from '@redux/slices/approval';

const All = () => {
  const {isLoading, isSuccess, data} = useSelector(state => state.approval);
  const dispatch = useDispatch();
  return (
    <SafeAreaView
      style={{
        paddingHorizontal: 15,
        flex: 1,
      }}>
      {isLoading ? (
        <>
          <ApprovalCard loading={true} />
          <ApprovalCard loading={true} />
          <ApprovalCard loading={true} />
        </>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data.data}
          ListEmptyComponent={
            <HStack
              flex={1}
              justifyContent="center"
              my={5}
              p={3}
              borderRadius="md"
              background="white">
              <Text>No data founds</Text>
            </HStack>
          }
          renderItem={({item, key}) => (
            <ApprovalCard
              key={key}
              item={item}
              accept={() => {
                dispatch(action({id: id, type: 'approved'}));
              }}
              reject={() => {
                dispatch(action({id: id, type: 'rejected'}));
              }}
            />
          )}
          keyExtractor={item => item.id}
        />
      )}
    </SafeAreaView>
    // <View p={4}>

    //
    // </View>
  );
};

export default All;
