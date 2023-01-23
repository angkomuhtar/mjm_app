import {
  Badge,
  Button,
  Divider,
  HStack,
  IconButton,
  Pressable,
  Text,
  View,
  VStack,
} from 'native-base';
import React from 'react';
import {navigate} from '@commons/RootNavigation';
import Ion from 'react-native-vector-icons/Ionicons';

const ApprovalCard = () => {
  return (
    <View
      background="white"
      p={4}
      borderRadius="md"
      shadow="1"
      borderColor="gray.50"
      borderWidth={1}>
      <VStack space={2}>
        <HStack justifyContent="space-between" alignItems="flex-start">
          <VStack flex={1} space={2}>
            <Text fontWeight="800" fontSize={12}>
              PR/2022/VII/C1-003
            </Text>
            <Badge
              background="danger.300"
              alignSelf="flex-start"
              rounded="full">
              <Text
                fontSize={9}
                fontWeight="800"
                textTransform="uppercase"
                color="white">
                Priority 3
              </Text>
            </Badge>
          </VStack>
          <Pressable
            onPress={() => {
              navigate('approvalDetails');
            }}>
            <Text color="primary.400" fontSize={12}>
              Details
            </Text>
          </Pressable>
        </HStack>
        <Divider />
        <HStack justifyContent="space-between">
          <VStack flex={1}>
            <Text fontSize="xs">Requestor : Test</Text>
            <Text fontSize="xs">Narasi : test api</Text>
            <Text fontSize="xs">Cabang Makassar</Text>
          </VStack>
          <VStack alignItems="flex-start">
            <Text fontSize="xs" fontWeight="bold">
              Total
            </Text>
            <Text fontSize="xl" fontWeight="800">
              4.000
            </Text>
            <HStack space={2} mt="3">
              <IconButton
                variant="outline"
                rounded="full"
                p="1"
                _icon={{as: Ion, name: 'checkmark-sharp', size: 'md'}}
              />

              <IconButton
                onPress={() => alert('reject')}
                variant="outline"
                colorScheme="danger"
                rounded="full"
                p="1"
                _icon={{as: Ion, name: 'close', size: 'md'}}
              />
            </HStack>
          </VStack>
        </HStack>
      </VStack>
    </View>
  );
};

export default ApprovalCard;
