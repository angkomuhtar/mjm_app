import {View, Text} from 'react-native';
import React from 'react';
import {Center, Skeleton, VStack} from 'native-base';

const ButtonSkeleton = () => {
  return (
    <Center w="100%">
      <VStack
        p={4}
        w="90%"
        borderWidth="1"
        space={8}
        overflow="hidden"
        rounded="md"
        background="white"
        borderColor="gray.50">
        <Skeleton.Text px="4" />
        <Skeleton px="4" my="4" rounded="md" startColor="primary.100" />
      </VStack>
    </Center>
  );
};

export default ButtonSkeleton;
