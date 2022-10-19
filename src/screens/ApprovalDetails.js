import React, {useEffect} from 'react';
import {Header, CardSkeleton} from '@components';
import {
  Button,
  HStack,
  Icon,
  ScrollView,
  Text,
  View,
  VStack,
} from 'native-base';
import Octi from 'react-native-vector-icons/Octicons';
import {useDispatch, useSelector} from 'react-redux';
import {show} from '../redux/slices/purchase';
import {DetailsCard} from '../components';

const ApprovalDetails = () => {
  const dispatch = useDispatch();
  const {details} = useSelector(state => state.purchase);
  useEffect(() => {
    // setTimeout(() => {
    dispatch(show(1));
    // }, 5000);
  }, []);

  console.log(details);
  return (
    <>
      <Header back={true} title="Request Details" />
      <ScrollView flex={1} p={4}>
        {details.sts == 'loading' && (
          <VStack space={8}>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </VStack>
        )}
        <VStack space={3}>
          <DetailsCard title="Order">
            <Text>test</Text>
          </DetailsCard>
          <DetailsCard title="Branch & storehouse" />
          <DetailsCard title="Items" />
        </VStack>

        <VStack h={8} />
      </ScrollView>
      <VStack space={4} shadow="5" background="white" py={6} px={4}>
        <Button
          background="primary.300"
          isDisabled={details.sts == 'success' ? false : true}>
          <HStack justifyContent="center" space={3} alignItems="center">
            <Icon as={Octi} name="shield-check" size={6} color="white" />
            <Text fontSize={16} fontWeight={600} color="white">
              Approve
            </Text>
          </HStack>
        </Button>
        <Button
          background="secondary.300"
          isDisabled={details.sts == 'success' ? false : true}>
          <HStack justifyContent="center" space={3} alignItems="center">
            <Icon as={Octi} name="shield-x" size={6} color="black" />
            <Text fontSize={16} fontWeight={600} color="black">
              Reject
            </Text>
          </HStack>
        </Button>
      </VStack>
    </>
  );
};

export default ApprovalDetails;
