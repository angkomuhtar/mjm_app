import {Text, VStack} from 'native-base';
import React from 'react';

const DetailsCard = ({children, title}) => {
  return (
    <VStack space={2}>
      <Text
        fontSize="md"
        color="gray.300"
        fontWeight="bold"
        textTransform="uppercase">
        {title}
      </Text>
      <VStack h="48" background="white" borderRadius="md" p={4}>
        {children}
      </VStack>
    </VStack>
  );
};

export default DetailsCard;
