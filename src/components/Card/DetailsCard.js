import {Text, VStack} from 'native-base';
import React from 'react';

const DetailsCard = ({children, title, p = 4, background = 'white'}) => {
  return (
    <VStack space={2}>
      <Text
        fontSize="md"
        color="gray.300"
        fontWeight="bold"
        textTransform="uppercase">
        {title}
      </Text>
      <VStack background={background} borderRadius="md" p={p}>
        {children}
      </VStack>
    </VStack>
  );
};

export default DetailsCard;
