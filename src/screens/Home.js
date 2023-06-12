import React, {useEffect} from 'react';
import Header from '@components/Header';
import {SafeAreaView, Dimensions} from 'react-native';
import {
  PieChart,
  LineChart,
  BarChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import {ScrollView, Text, View, VStack} from 'native-base';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth = Dimensions.get('window').width;
const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
    },
  ],
};

const lineConfig = {
  backgroundColor: '#ffffff',
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  decimalPlaces: 1, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
};

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
  const {userdata, token} = useSelector(state => state.auth);
  useEffect(() => {
    // const setAsync = async () => {
    //   AsyncStorage.setItem('token', token);
    // };
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header setting={true} title="Home" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack p={4}>
          <ChartHeader text="Sales" />
          <LineChart
            data={{
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
              legend: ['Sales/Month'],
              datasets: [
                {
                  data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                  ],
                },
              ],
            }}
            width={Dimensions.get('window').width - 32} // from react-native
            height={220}
            chartConfig={lineConfig}
            // bezier
            style={{borderRadius: 12}}
          />
        </VStack>

        <VStack p="4">
          <ChartHeader text="Income / Outcome" />
          <LineChart
            data={{
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
              legend: ['IN', 'OUT'],
              datasets: [
                {
                  data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                  ],
                  color: () => `rgba(200, 242, 10, 1)`,
                },
                {
                  data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                  ],
                  color: () => 'rgba(101, 122, 5, 1)',
                },
              ],
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
        </VStack>

        <VStack p="4">
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
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
