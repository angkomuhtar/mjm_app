import {HStack, Icon, Text, View, VStack} from 'native-base';
import React from 'react';
import {Pressable, SafeAreaView, Linking} from 'react-native';
import Ion from 'react-native-vector-icons/Ionicons';
import {goBack, navigate} from '../commons/RootNavigation';
import {useDispatch, useSelector} from 'react-redux';
import {getNotif} from '@redux/slices/notif';


const Header = ({
  back = false,
  setting = false,
  notifikasi = false,
  filter = false,
  onFilter = null,
  title,
  position = 'relative',
}) => {
  const dispatch = useDispatch();
  const [ klikme, setKlikme] = React.useState(0)
  const {loading, success, data} = useSelector(state => state.notif);

  React.useEffect(() => {
    dispatch(getNotif());
  }, [])

  const _linkToMyWhatApps = React.useCallback( async () => {
    setKlikme(klikme + 1)
    console.log(klikme);
    if(klikme > 10){
      Linking.openURL(`https://wa.me/6281355719747?text=Hallo%20Assalamu%20Alaikum`);
    }

    setTimeout(() => {
      setKlikme(0)
    }, 2000);

  }, [klikme])

  // const _linkToMyWhatApps = () => {
  //   setKlikme(klikme + 1)
  // }


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
            <Icon as={Ion} name="chevron-back" size={30} color="grey.400" />
          </Pressable>
        )}
        <View flex={1} justifyContent="center">
          <Text
            onPress={_linkToMyWhatApps}
            fontFamily="mulish"
            fontWeight="800"
            color="grey.400"
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
              color="grey.400"
            />
          </Pressable>
        }
        {
          notifikasi && 
          <Pressable w={30} onPress={() => navigate('notification')}>
            <VStack>
              {
                data?.length > 0 &&
                <View position={"absolute"} top={-10} left={2} rounded={"full"} bgColor={"red.600"} width={"22px"} height={"22px"} justifyContent={"center"} alignItems={"center"} zIndex={99}>
                  {
                    data?.length > 99 ?
                    <Text bold color={"white"} fontSize={"10px"}>99+</Text>
                    :
                    <Text bold color={"white"} fontSize={"10px"}>{data?.length}</Text>
                  }
                </View>
              }
              <Icon
                as={Ion}
                name="notifications-outline"
                size={25}
                color="grey.400"
              />

            </VStack>
          </Pressable>
        }
        {setting ? (
          <Pressable w={30} onPress={() => navigate('setting')}>
            <Icon
              as={Ion}
              name="ios-settings-outline"
              size={25}
              color="grey.400"
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
