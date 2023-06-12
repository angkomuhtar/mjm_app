import axios from 'axios';
import {API_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiClient = axios.create({
  baseURL: 'http://makassarjayamarine.id/api-v1/',
  // responseType: 'json',
  headers: {
    'Content-type': 'application/json',
    'Cache-Control': 'no-cache',
  },
});

apiClient.interceptors.request.use(async function (config, data) {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    // eslint-disable-next-line dot-notation
    config.headers['Authorization'] = 'Bearer ' + JSON.parse(token).token;
  }
  return config;
});

export default apiClient;
