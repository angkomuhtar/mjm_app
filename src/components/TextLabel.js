import {HStack, Text} from 'native-base';
import React from 'react';

const TextLabel = ({text, title}) => {
  return (
    <HStack space={2}>
      <Text fontWeight="semibold">{title}</Text>
      <Text fontWeight="semibold">:</Text>
      <Text>{text}</Text>
    </HStack>
  );
};

export default TextLabel;
