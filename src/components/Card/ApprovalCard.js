import {
  Badge,
  Button,
  Divider,
  HStack,
  IconButton,
  Pressable,
  Skeleton,
  Text,
  View,
  VStack,
} from 'native-base';
import React from 'react';
import {navigate} from '@commons/RootNavigation';
import Ion from 'react-native-vector-icons/Ionicons';

const ApprovalCard = ({loading = false, no, priority}) => {
  return (
    <View
      background="white"
      p={4}
      borderRadius="md"
      shadow="1"
      borderColor="gray.50"
      borderWidth={1}>
      <VStack space={2}>
        {loading ? (
          <HStack space={4} py="3">
            <Skeleton h="3" flex="1" rounded="full" />
            <Skeleton h="3" w={90} rounded="full" startColor="indigo.300" />
          </HStack>
        ) : (
          <HStack justifyContent="space-between" alignItems="flex-start">
            <VStack flex={1} space={2}>
              <Text fontWeight="800" fontSize={12}>
                {no || 'PR Number -'}
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
                  {priority || 'Medium'}
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
        )}
        <Divider />
        <HStack justifyContent="space-between">
          {loading ? (
            <VStack flex={1} space="3" mr={8}>
              <Skeleton h="2" flex="1" rounded="full" />
              <Skeleton flex="1" rounded="full" />
              <Skeleton flex="1" rounded="full" />
            </VStack>
          ) : (
            <VStack flex={1}>
              <Text fontSize="xs">Requestor : Test</Text>
              <Text fontSize="xs">Narasi : test api</Text>
              <Text fontSize="xs">Cabang Makassar</Text>
            </VStack>
          )}
          <VStack alignItems="flex-start">
            {loading ? (
              <>
                <Skeleton h={2} rounded="full" mb={2} />
                <Skeleton h={3} rounded="full" />
              </>
            ) : (
              <>
                <Text fontSize="xs" fontWeight="bold">
                  Total
                </Text>
                <Text fontSize="xl" fontWeight="800">
                  4.000
                </Text>
              </>
            )}
            <HStack space={2} mt="3">
              {loading ? (
                <>
                  <Skeleton rounded="full" size={8} />
                  <Skeleton rounded="full" size={8} />
                </>
              ) : (
                <>
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
                </>
              )}
            </HStack>
          </VStack>
        </HStack>
      </VStack>
    </View>
  );
};

export default ApprovalCard;
