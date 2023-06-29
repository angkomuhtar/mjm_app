import {HStack, Icon, Text, View, VStack} from 'native-base';
import React from 'react';
import {Pressable, SafeAreaView} from 'react-native';
import Ion from 'react-native-vector-icons/Ionicons';
import {goBack, navigate} from '../commons/RootNavigation';

const Header = ({
  back = false,
  setting = false,
  filter = false,
  onFilter = null,
  title,
  position = 'relative',
}) => {
  return (
    <VStack
      background="white"
      borderBottomColor="warmGray.200"
      borderBottomWidth={2}
      width="full"
      position={position}
      top="0">
      <HStack
        borderBottomColor="gray.50"
        borderBottomWidth={2}
        bg="white"
        justifyContent="space-between"
        space={2}
        alignItems="center"
        px={2} py={4}>
        {back && (
          <Pressable w={30} onPress={() => goBack()}>
            <Icon as={Ion} name="chevron-back" size={30} color="primary.400" />
          </Pressable>
        )}
        <View flex={1} justifyContent="center">
          <Text
            fontFamily="mulish"
            fontWeight="800"
            color="primary.400"
            fontSize={15}
            textTransform="uppercase">
            {title}
          </Text>
        </View>
        {
          filter && 
          <Pressable w={30} onPress={onFilter}>
            <Icon
              as={Ion}
              name="funnel-outline"
              size={25}
              color="primary.400"
            />
          </Pressable>
        }
        {setting ? (
          <Pressable w={30} onPress={() => navigate('setting')}>
            <Icon
              as={Ion}
              name="ios-settings-outline"
              size={25}
              color="primary.400"
            />
          </Pressable>
        ) : (
          <View w={30} />
        )}
      </HStack>
    </VStack>
  );
};

export default Header;
