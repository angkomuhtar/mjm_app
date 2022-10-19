import React, {useRef} from 'react';
import {View, Text, Pressable, HStack, Icon} from 'native-base';

import RBSheet from 'react-native-raw-bottom-sheet';
import InputField from '@components/InputField';
import {useForm} from 'react-hook-form';

const Stocktabs = () => {
  const refRBSheet = useRef();
  const {
    control,
    // handleSubmit,
    formState: {errors},
  } = useForm();
  const handleSubmit = () => {
    refRBSheet.current.open();
  };
  return (
    <View p={4}>
      {/* <TouchableOpacity
        onPress={() => {
          refRBSheet.current.open();
        }}>
        <Text>{APP_TOKEN}</Text>
      </TouchableOpacity> */}
      <View p={4} background="white" shadow="2" borderRadius="md">
        <InputField
          name="items"
          label="Items ID"
          control={control}
          placeholder="Username"
          iconName="search"
        />
        <Pressable mt={4} onPress={() => handleSubmit()}>
          {/* <Pressable mt={4} onPress={handleSubmit(onPressLogin)}> */}
          {({isPressed}) => (
            <HStack
              py={2}
              px={4}
              borderRadius={6}
              bg={isPressed ? 'primary.200' : 'primary.300'}
              justifyContent="center"
              alignItems="center"
              space={2}>
              <Text
                fontFamily="mulish"
                fontWeight="600"
                fontSize="lg"
                color="white">
                FIND
              </Text>
            </HStack>
          )}
        </Pressable>
      </View>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0,0,0,0.1)',
          },
          container: {
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          },
          draggableIcon: {
            backgroundColor: '#1264D1',
            marginTop: 15,
            width: 120,
          },
        }}>
        {/* <YourOwnComponent /> */}
      </RBSheet>
    </View>
  );
};

export default Stocktabs;
