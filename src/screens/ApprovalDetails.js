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
import Ion from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {show} from '../redux/slices/approval';
import {DetailsCard} from '../components';
import moment from 'moment';

const ApprovalDetails = ({route}) => {
  const dispatch = useDispatch();
  const {id} = route.params;
  const {details, isSuccess, isLoading} = useSelector(state => state.approval);
  useEffect(() => {
    dispatch(show(id));
  }, []);

  return (
    <>
      <Header back={true} title="Request Details" />
      <ScrollView flex={1} p={4}>
        {isLoading ? (
          <VStack space={8}>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </VStack>
        ) : (
          <VStack space={3}>
            <DetailsCard title="Order">
              <VStack space={2}>
                <HStack justifyContent="space-between" alignItems="center">
                  <Text fontWeight="bold">{details.kode}</Text>
                  <HStack
                    px={2}
                    py={1}
                    borderRadius={4}
                    background="green.400"
                    space={1}
                    alignItems="center">
                    <Icon
                      as={Ion}
                      name={
                        details.status == 'finish'
                          ? 'checkmark-done-circle'
                          : details.status == 'approved'
                          ? 'checkmark-circle'
                          : 'alert-circle'
                      }
                      color="white"
                      size={6}
                    />
                    <Text fontWeight="bold" fontSize="xs" color="white">
                      {details.status}
                    </Text>
                  </HStack>
                </HStack>
                <HStack space={3}>
                  <Text fontWeight="semibold">Narasi :</Text>
                  <Text>{details.narasi}</Text>
                </HStack>
                <HStack space={3}>
                  <Text fontWeight="semibold">Tanggal :</Text>
                  <Text>{moment(details.date).format('DD MMM YYYY')}</Text>
                </HStack>
              </VStack>
            </DetailsCard>
            <DetailsCard title="Branch & storehouse">
              <VStack space={2}>
                <HStack space={3}>
                  <Text fontWeight="semibold">Cabang :</Text>
                  <Text>
                    {details?.cabang?.nama} ({details?.cabang?.kode})
                  </Text>
                </HStack>
                <HStack space={3}>
                  <Text fontWeight="semibold">Gudang :</Text>
                  <Text>
                    {details?.gudang?.nama} ({details?.gudang?.kode})
                  </Text>
                </HStack>
              </VStack>
            </DetailsCard>
            <DetailsCard title="Items" background="transparent" p={0}>
              {details?.items?.length == 0 ? (
                <HStack background="white" p={3} justifyContent="center">
                  <Text>No Items Founds</Text>
                </HStack>
              ) : (
                details?.items?.map((data, key) => (
                  <VStack p={3} background="white" borderRadius="md" key={key}>
                    <HStack justifyContent="space-between">
                      <Text fontWeight="bold" w="3/4">
                        {data.barang.nama}
                      </Text>
                      <Text fontWeight="bold">
                        @ {data.qty} {data.stn}
                      </Text>
                    </HStack>
                    <Text>
                      {data.metode} from {data.pemasok.nama}
                    </Text>
                  </VStack>
                ))
              )}
            </DetailsCard>
          </VStack>
        )}

        <VStack h={8} />
      </ScrollView>
      {details.status == 'created' && (
        <VStack space={4} shadow="5" background="white" py={6} px={4}>
          <Button
            background="primary.300"
            isDisabled={details.sts === 'success' ? false : true}>
            <HStack justifyContent="center" space={3} alignItems="center">
              <Icon as={Octi} name="shield-check" size={6} color="white" />
              <Text fontSize={16} fontWeight={600} color="white">
                Approve
              </Text>
            </HStack>
          </Button>
          <Button
            background="secondary.300"
            isDisabled={details.sts === 'success' ? false : true}>
            <HStack justifyContent="center" space={3} alignItems="center">
              <Icon as={Octi} name="shield-x" size={6} color="black" />
              <Text fontSize={16} fontWeight={600} color="black">
                Reject
              </Text>
            </HStack>
          </Button>
        </VStack>
      )}
    </>
  );
};

export default ApprovalDetails;
