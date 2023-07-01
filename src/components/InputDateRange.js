import React, { useState } from 'react'
import {TouchableOpacity} from 'react-native';
import {HStack, Text, VStack, Icon, Input} from 'native-base';
import Ant from "react-native-vector-icons/AntDesign";
import DatePicker from 'react-native-date-picker'
import moment from 'moment';

const InputDateRange = (props) => {
    const { initDate, setFilterDate } = props
    const [ dpStartOpen, setDpStartOpen ] = useState(false)
    const [ dpEndOpen, setDpEndOpen ] = useState(false)

    return (
        <HStack space={8}>
            <VStack pb={"5px"} flex={1}>
                <Text fontSize={"12px"}>Mulai Tanggal</Text>
                <HStack alignItems="center" flex={1} justifyContent={"space-between"}>
                    <Input isDisabled value={initDate?.startDate} size="sm" width={"85%"} placeholder="format: YYYY-MM-DD" />
                    <TouchableOpacity onPress={() => setDpStartOpen(true)}>
                        <Icon as={Ant} name="calendar" size={"20px"} color="grey.500" width={"5%"} />
                    </TouchableOpacity>
                </HStack>
                <DatePicker
                    modal
                    mode='date'
                    locale="ID"
                    open={dpStartOpen}
                    date={new Date(initDate?.startDate)}
                    onConfirm={date => {
                        setFilterDate({...initDate, startDate: moment(date).format("YYYY-MM-DD")})
                        setDpStartOpen(false)
                    }}
                    onCancel={() => setDpStartOpen(false)}
                />
            </VStack>
            <VStack pb={"5px"} flex={1}>
                <Text fontSize={"12px"}>Mulai Tanggal</Text>
                <HStack alignItems="center" flex={1} justifyContent={"space-between"}>
                    <Input isDisabled value={`${initDate?.endDate}`} size="sm" width={"85%"} placeholder="format: YYYY-MM-DD" />
                    <TouchableOpacity onPress={() => setDpEndOpen(true)}>
                        <Icon as={Ant} name="calendar" size={"20px"} color="grey.500" width={"5%"} />
                    </TouchableOpacity>
                </HStack>
                <DatePicker
                    modal
                    mode='date'
                    locale="ID"
                    open={dpEndOpen}
                    date={new Date(initDate?.endDate)}
                    onConfirm={date => {
                        setFilterDate({...initDate, endDate: moment(date).format("YYYY-MM-DD")})
                        setDpEndOpen(false)
                    }}
                    onCancel={() => {
                        setDpEndOpen(false)
                    }}
                />
            </VStack>
        </HStack>
    )
}

export default InputDateRange