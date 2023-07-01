import React, {useEffect, useState} from 'react';
import Header from '@components/Header';
import {SafeAreaView, Dimensions, RefreshControl, TouchableOpacity} from 'react-native';
import {
  PieChart,
  LineChart
} from 'react-native-chart-kit';
import {HStack, ScrollView, Text, View, VStack, Icon, Input} from 'native-base';
import Ant from "react-native-vector-icons/AntDesign";
import DatePicker from 'react-native-date-picker'
import apiClient from '../commons/ApiCall';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {getNotif} from '@redux/slices/notif';
import InputDateRange from '../components/InputDateRange';


const lineConfig = {
    backgroundGradientFrom: "#bdc8f6",
    backgroundGradientFromOpacity: 0.2,
    backgroundGradientTo: "#ddd",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 0.5) => `rgba(5, 142, 63, ${opacity}))`,
    strokeWidth: 5,
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
};
const lineColor = ['rgba(10, 178, 122, 1)', 'rgba(238, 176, 53, 1)']

const pieColor = [
  '#2596be',
  '#3ba1c5',
  '#51abcb',
  '#66b6d2',
  '#7cc0d8',
  '#92cbdf',
  '#a8d5e5',
  '#bee0ec',
  '#d3eaf2',
  '#e9f5f9',
];

const ChartHeader = ({text}) => (
  <Text fontWeight="semibold" fontSize="md" my={2}>
    {text}
  </Text>
);

const Home = () => {
  const dispatch = useDispatch();
  const [ sales, setSales ] = useState(null)
  const [ pnl, setPnl ] = useState(null)
  const [ refresh, setRefresh ] = useState(false)
  const [ showFilterSales, setShowFilterSales ] = useState(false)
  const [ showFilterPnl, setShowFilterPnl ] = useState(false)
  const [ filterSalesDate, setFilterSalesDate ] = useState({
    startDate: moment().startOf('year').format('YYYY-MM-DD'),
    endDate: moment().endOf('year').format('YYYY-MM-DD')
  })
  const [ filterPnlDate, setFilterPnlDate ] = useState({
    startDate: moment().startOf('year').format('YYYY-MM-DD'),
    endDate: moment().endOf('year').format('YYYY-MM-DD')
  })

  useEffect(() => {
    dispatch(getNotif())
    _handleFetchDataChart()
    _handleFetchDataProfitLose()
  }, []);

  const _handleFetchDataChart = async () => {
    setRefresh(true)
    try {
      const resp = await apiClient.get(`chart-sales?startDate=${filterSalesDate.startDate}&endDate=${filterSalesDate.endDate}`)
      if(!resp.data.diagnostic.error){
          setSales(resp.data?.data)
          setRefresh(false)
      }
    } catch (e) {
      setRefresh(false)
      console.log(e);
      alert(e.response.data.diagnostic.message)
    }
  }

  const _handleFetchDataProfitLose = async () => {
    setRefresh(true)
    try {
      const resp = await apiClient.get(`income-outcome?startDate=${filterPnlDate.startDate}&endDate=${filterPnlDate.endDate}`)
      console.log(resp);
      if(!resp.data.diagnostic.error){
        let { data } = resp.data
        setPnl(data)
      }
    } catch (e) {
      setRefresh(false)
      console.log(e);
      alert(e.response.data.diagnostic.message)
    }
  }

  const _handleApplyFilterSales = () => {
    setRefresh(true)
    setShowFilterSales(!showFilterSales)
    _handleFetchDataChart()
    setRefresh(false)
  }

  const _handleApplyFilterPnl = () => {
    setRefresh(true)
    setShowFilterPnl(!showFilterPnl)
    _handleFetchDataProfitLose()
    setRefresh(false)
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header setting={true} title="Home" notifikasi={true}/>
      
      <ScrollView 
        refreshControl={<RefreshControl refreshing={refresh} onRefresh={_handleFetchDataChart} />} 
        showsVerticalScrollIndicator={false} bgColor={"white"}>
        <VStack p={4}>
          <HStack justifyContent={"space-between"} alignItems={"center"}>
            <ChartHeader text="Sales" />
            <TouchableOpacity onPress={_handleApplyFilterSales}>
              <Icon as={Ant} name="filter" size={"25px"} color="grey.500" width={"5%"} />
            </TouchableOpacity>
          </HStack>
          {
            showFilterSales &&
            <InputDateRange name={'sales'} initDate={filterSalesDate} setFilterDate={setFilterSalesDate}/>
          }
          {
            sales &&
            <LineChart
              segments={10}
              formatYLabel={(val) => (val / 1000000)?.toFixed(1) + 'M'}
              onDataPointClick={({index, value}) => {
                alert(sales?.labels[index] + ": Rp." + value.toLocaleString('id'))
              }}
              renderDotContent={({x, y, indexData}) => {
                return <View key={x+y}
                  style={{
                    position: 'absolute',
                    top: y + 10,
                    left: x - 3}}>
                <Text style={{fontSize: 10}}>
                  {(indexData)?.toLocaleString("id")}
                </Text>
              </View>
              }}
              data={{
                labels: sales?.labels,
                legend: ['Sales/Month'],
                datasets: [
                  {
                    data: sales?.datasets?.data,
                    color: ''
                  },
                ],
              }}
              width={Dimensions.get('window').width - 32} // from react-native
              height={220}
              chartConfig={lineConfig}
              bezier
              style={{borderRadius: 12}}
            />
          }
        </VStack>

        <VStack p={4}>
          <HStack justifyContent={"space-between"} alignItems={"center"}>
            <ChartHeader text="Income / Outcome" />
            <TouchableOpacity onPress={_handleApplyFilterPnl}>
              <Icon as={Ant} name="filter" size={"25px"} color="grey.500" width={"5%"} />
            </TouchableOpacity>
          </HStack>
          {
            showFilterPnl &&
            <InputDateRange initDate={filterPnlDate} setFilterDate={setFilterPnlDate}/>
          }
          {
            pnl &&
            <LineChart
              segments={10}
              formatYLabel={(val) => (val / 1000000)?.toFixed(1) + 'M'}
              onDataPointClick={({index, value}) => {
                alert(pnl?.labels[index] + ": Rp." + value.toLocaleString('id'))
              }}
              renderDotContent={({x, y, indexData}) => {
                return <View key={Math.random() * 100}
                  style={{
                    position: 'absolute',
                    top: y + 10,
                    left: x - 3}}>
                <Text style={{fontSize: 10}}>
                  {(indexData)?.toLocaleString("id")}
                </Text>
              </View>
              }}
              data={{
                labels: pnl?.labels,
                legend: pnl?.legend,
                datasets: pnl.datasets.map( (v, i) => {
                  return {
                    ...v,
                    color: () => lineColor[i]
                  }
                })
              }}
              width={Dimensions.get('window').width - 32} // from react-native
              height={220}
              yAxisLabel=""
              yAxisSuffix="k"
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={lineConfig}
              style={{borderRadius: 12}}
              bezier
            />
          }
        </VStack>

        {/* <VStack p="4">
          <ChartHeader text={`Best Seller ${userdata.username}`} />
          <PieChart
            data={[
              {
                name: 'Seoul',
                population: 100,
                color: pieColor[4],
                legendFontColor: '#000',
              },
              {
                name: 'Toronto',
                population: 234,
                color: pieColor[9],
                legendFontColor: '#000',
              },
              {
                name: 'Beijing',
                population: 125,
                color: pieColor[3],
                legendFontColor: '#000',
              },
              {
                name: 'New York',
                population: 12,
                color: pieColor[8],
                legendFontColor: '#000',
              },
              {
                name: 'Moscow',
                population: 10,
                color: pieColor[2],
                legendFontColor: '#000',
              },
            ]}
            width={screenWidth - 32}
            height={220}
            chartConfig={lineConfig}
            accessor={'population'}
            backgroundColor={'#fff'}
            style={{borderRadius: 12}}
            paddingLeft={'15'}
            center={[10, 10]}
            absolute
          />
        </VStack> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
